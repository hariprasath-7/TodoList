# Simple To-Do List — Today Task Reminder

A beginner-friendly web project to create, manage, and complete daily tasks.

## Project idea

This project is a simple To-Do List web app. A user can add tasks they need to finish today, mark them as complete, edit them, or delete them.

The main goal is to help users remember their daily work in one simple place.

## What problem does it solve?

People often forget small but important things, such as calling someone, finishing homework, buying groceries, or sending an email. This app gives them a quick list of tasks for the day.

## Main goal

Build a clean and easy web app where users can manage their daily tasks.

## Features for the first version

- Add a new task
- View all tasks
- Mark a task as completed
- Edit a task
- Delete a task
- Show completed and pending tasks differently
- Save tasks so they remain after the page refreshes
- Work on mobile and desktop screens

## Recommended beginner technology

| Part | Suggested tool | Why use it? |
| --- | --- | --- |
| Frontend | HTML, CSS, and JavaScript | These are the best basics for learning web development. |
| Styling | Plain CSS | Helps you understand layouts, colors, spacing, and responsive design. |
| Storage | Local Storage | Saves tasks in the browser without needing a database or server. |
| Optional next step | React | Useful after the basic JavaScript version is complete. |
| Optional backend | Node.js + Express + MongoDB | Add these only when you want accounts and tasks shared across devices. |

## Why start simple?

Starting with HTML, CSS, JavaScript, and Local Storage lets you learn the important parts first:

- How buttons and forms work
- How JavaScript changes the page
- How to save data in the browser
- How to organize a small project

Do not start with login, databases, email reminders, or complex APIs. They are useful later, but they can make a first project confusing.

## How the app should work

1. The user types a task into an input box.
2. The user clicks **Add Task**.
3. The task appears in the task list.
4. The user can click a checkbox to mark it complete.
5. The user can edit or delete the task.
6. The app saves the task list in Local Storage.
7. When the user refreshes the page, their tasks are still there.

## Suggested screen layout

```text
-----------------------------------
          My Tasks for Today
-----------------------------------
[ Write a new task...       ] [Add]

Pending Tasks
[ ] Finish homework      Edit Delete
[ ] Buy groceries        Edit Delete

Completed Tasks
[x] Reply to email       Edit Delete
-----------------------------------
```

Keep the design clean. Use one main color, readable text, clear buttons, and enough empty space between tasks.

## Project folder structure

```text
todo-list/
  index.html       # Page structure
  style.css        # Colors, layout, and mobile design
  script.js        # Add, edit, delete, and save tasks
  README.md        # Project notes
```

## Task data example

Each task can be stored in JavaScript like this:

```js
{
  id: 1,
  title: "Finish homework",
  completed: false
}
```

When using Local Storage, save all tasks as a JSON string. Read them back when the page opens.

## Basic functions to build

| Function | What it should do |
| --- | --- |
| `addTask()` | Gets the text from the input and adds a new task. |
| `displayTasks()` | Shows all tasks on the page. |
| `toggleTask()` | Changes a task between completed and pending. |
| `editTask()` | Lets the user change the task text. |
| `deleteTask()` | Removes a task from the list. |
| `saveTasks()` | Saves the task array to Local Storage. |
| `loadTasks()` | Loads saved tasks when the page opens. |

## Build plan

### Step 1: Create the page

Create `index.html` with:

- A title
- A text input
- An Add Task button
- An empty area where tasks will appear

### Step 2: Style the page

Use `style.css` to:

- Center the app on the page
- Add a card-like box for the task list
- Style buttons and inputs
- Add a line-through style for completed tasks
- Make the layout usable on a phone

### Step 3: Add tasks with JavaScript

In `script.js`:

- Listen for a click on the Add Task button
- Read the input value
- Do not add an empty task
- Add the task to an array
- Show the updated list

### Step 4: Complete and delete tasks

- Add a checkbox for each task
- Add a Delete button for each task
- Update the task array after each change

### Step 5: Save tasks

- Save the task array to Local Storage every time it changes
- Load saved tasks when the page starts

### Step 6: Add edit support

- Add an Edit button for each task
- Let the user change the task text
- Save and display the new value

## Beginner improvements to add later

After the basic version works, choose one feature at a time:

- Add a due date to each task
- Add task priority: Low, Medium, High
- Filter tasks: All, Pending, Completed
- Show the number of pending tasks
- Add dark mode
- Add categories such as Work, Personal, and Study
- Add a simple reminder message while the page is open
- Convert the project to React
- Add login and a database so tasks work on different devices

## Reminder note

A real phone or browser reminder is an advanced feature. It needs permission from the user and usually needs a server or notification service to work when the website is closed.

For this beginner project, start with a simple reminder inside the app, such as showing a message for a task with a due time while the page is open. Add real push notifications only after the main task list works well.

## Good coding habits

- Use clear names such as `tasks`, `addTaskButton`, and `taskInput`.
- Write small functions that do one job.
- Test after adding each feature.
- Do not copy code without understanding it.
- Keep HTML, CSS, and JavaScript in separate files.
- Comment difficult code in simple words.

## How to test the project

Check these items before calling the project complete:

- Can I add a task?
- Does the app stop empty tasks from being added?
- Can I mark a task as complete?
- Can I edit and delete a task?
- Do completed tasks look different?
- Do tasks remain after refreshing the page?
- Does the app look okay on a small phone screen?

## Success criteria

The first version is successful when a user can add their daily tasks, complete them, delete them, and still see them after refreshing the browser.

## Future version idea

When you are comfortable with this project, turn it into a full task reminder app with:

- User accounts
- Cloud database
- Due dates and recurring tasks
- Email or push reminders
- Shared task lists for families or small teams

## Final recommendation

Build the basic version first and make it work smoothly. A small, complete project is much better for learning than a large project with many unfinished features. Once the To-Do List works with Local Storage, you will have a strong base for building the advanced reminder app later.
