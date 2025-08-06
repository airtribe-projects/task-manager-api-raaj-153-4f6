# Task Manager API

A simple Node.js and Express-based REST API for managing tasks. This project is designed for learning backend engineering concepts and includes CRUD operations, filtering, and sorting for tasks stored in a JSON file.

## Features
- Add, update, delete, and retrieve tasks
- Filter tasks by completion status and priority
- Sort tasks by creation date (tasks without a creation date appear last)
- All data is persisted in `task.json`

## Endpoints

### Get all tasks
```
GET /tasks
```
- Returns all tasks, sorted by creation date (oldest first)
- Query param: `completed=true|false` to filter by completion status

### Get a task by ID
```
GET /tasks/:id
```
- Returns a single task by its ID

### Get tasks by priority
```
GET /tasks/priority/:level
```
- Returns tasks with the specified priority (`high`, `medium`, `low`)

### Create a new task
```
POST /tasks
```
- Body: `{ "title": string, "description": string, "completed": boolean, "priority"?: string }`
- Returns the created task with a new ID and creation date

### Update a task
```
PUT /tasks/:id
```
- Body: `{ "title": string, "description": string, "completed": boolean, "priority"?: string }`
- Returns the updated task

### Delete a task
```
DELETE /tasks/:id
```
- Deletes the task with the given ID

### Bulk update priorities
```
PUT /updateTasks
```
- Updates all tasks' priorities based on their ID (modulo 3)

## Getting Started

1. Clone the repository
2. Run `npm install` to install dependencies
3. Start the server:
   - For development: `npm run dev`
   - For production: `npm start`
4. The server runs on [http://localhost:3000](http://localhost:3000)

## Project Structure
- `app.js` - Main application file
- `task.json` - Data storage for tasks
- `response.js` - Standardized response object

## Example Task Object
```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true,
  "priority": "medium",
  "creationDate": "2025-08-06T17:33:36.350Z"
}
```

