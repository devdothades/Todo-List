# To-Do List Application

A simple backend to-do list application built with Express.js and MongoDB. Users can register, log in, and manage their tasks, with each user's tasks being private.

## Features

- User authentication (sign up and log in)
- CRUD operations for tasks (Create, Read, Update, Delete)
- Private tasks for each user

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 18 or higher)
- [Docker](https://docs.docker.com/get-docker/)
- [PostgreSQL](https://www.postgresql.org/download/) or [MongoDB](https://www.mongodb.com/try/download/community) (if running locally without Docker)
- [Git](https://git-scm.com/)

## Installation

### Clone the Repository

First, clone the repository from GitHub:

```bash
git clone https://github.com/your-username/todo-list-app.git
cd todo-list-app
npm install
```

## Environment variables
```bash
nano .env 
PORT=YOUR DESIRED PORT
DATABASE_URL=YOUT MONGO URI
JWT_SECRET=your-secret-key
```

## Usage
```bash
npm run dev
```

## LICENSE 
[MIT](https://github.com/devdothades/Todo-List?tab=MIT-1-ov-file)

