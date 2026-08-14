import os
from datetime import datetime, timezone

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy import Boolean, DateTime, Integer, String, create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker


# Read DATABASE_URL from the .env file.
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is missing. Add it to your .env file.")

# Neon commonly gives a postgresql:// URL.
# SQLAlchemy needs to know that we are using the psycopg driver.
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace(
        "postgresql://",
        "postgresql+psycopg://",
        1,
    )

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


class Base(DeclarativeBase):
    pass


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=150)


class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=150)
    completed: bool | None = None


app = FastAPI(title="To-Do List API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create the tasks table if it does not already exist.
Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "To-Do List API is running"}


@app.get("/tasks")
def get_tasks():
    with SessionLocal() as db:
        statement = select(Task).order_by(Task.created_at.desc())
        tasks = db.scalars(statement).all()

        return [
            {
                "id": task.id,
                "title": task.title,
                "completed": task.completed,
                "created_at": task.created_at,
            }
            for task in tasks
        ]


@app.post("/tasks", status_code=201)
def create_task(task: TaskCreate):
    clean_title = task.title.strip()

    if not clean_title:
        raise HTTPException(status_code=422, detail="Task title cannot be empty")

    with SessionLocal() as db:
        new_task = Task(title=clean_title)

        db.add(new_task)
        db.commit()
        db.refresh(new_task)

        return {
            "id": new_task.id,
            "title": new_task.title,
            "completed": new_task.completed,
            "created_at": new_task.created_at,
        }


@app.patch("/tasks/{task_id}")
def update_task(task_id: int, task: TaskUpdate):
    with SessionLocal() as db:
        saved_task = db.get(Task, task_id)

        if not saved_task:
            raise HTTPException(status_code=404, detail="Task not found")

        if task.title is not None:
            saved_task.title = task.title.strip()

        if task.completed is not None:
            saved_task.completed = task.completed

        db.commit()
        db.refresh(saved_task)

        return {
            "id": saved_task.id,
            "title": saved_task.title,
            "completed": saved_task.completed,
            "created_at": saved_task.created_at,
        }


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    with SessionLocal() as db:
        saved_task = db.get(Task, task_id)

        if not saved_task:
            raise HTTPException(status_code=404, detail="Task not found")

        db.delete(saved_task)
        db.commit()

        return {"message": "Task deleted"}