# Todo Application Documentation

This document provides an overview and documentation for the Todo application codebase. The application is built using React and Ant Design components.

## Table of Contents
- [Overview](#overview)
- [Components](#components)
  - [TodoInput](#todoinput-component)
- [Functionality](#functionality)
- [API Integration](#api-integration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview
The Todo application allows users to manage their tasks by creating, updating, and deleting todos. It provides a user interface for adding new todos with details such as title, creator, status, due date, and description. Users can also edit and delete existing todos.

## Components  

### TodoInput Component
- **Description**: This component renders the main interface of the Todo application.
- **Dependencies**: React, Ant Design icons and components, axios
- **Structure**:
  - **State Variables**:
    - `todos`: Array of todo objects fetched from the server.
    - `open`: Boolean state to control the visibility of the drawer for adding new todos.
    - `loading`: Boolean state to indicate whether todos are being loaded.
    - `userInput`: Partial todo object representing the input fields for creating a new todo.
  - **Hooks**:
    - `useEffect`: Fetches todos from the server upon component mount.
    - `useState`: Manages component state variables.
  - **Methods**:
    - `fetchTodos`: Fetches todos from the server using axios.
    - `updateTodo`: Updates a todo item on the server.
    - `deleteTodo`: Deletes a todo item from the server.
    - `handleChange`: Handles input changes and updates `userInput` state accordingly.
    - `showDrawer`: Opens the drawer for creating a new todo.
    - `onClose`: Closes the drawer for creating a new todo.
    - `createTodo`: Creates a new todo item on the server.
  - **Render**:
    - Renders a list of todos fetched from the server.
    - Provides a button to add a new todo.
    - Renders a drawer with form fields to create a new todo.

## Functionality
- Users can view a list of existing todos.
- Users can add a new todo by filling out the form in the drawer.
- Users can edit existing todos by updating their status.
- Users can delete existing todos.

## API Integration
- The application communicates with a backend API to perform CRUD operations on todos.
- API endpoints:
  - `GET /todos`: Fetches all todos.
  - `POST /todos`: Creates a new todo.
  - `PUT /todos/:id`: Updates a todo.
  - `DELETE /todos/:id`: Deletes a todo.

## Usage
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm start`.

## Contributing
Contributions are welcome. Please follow the contribution guidelines outlined in the repository.

## License
This project is licensed under the [MIT License](LICENSE).
