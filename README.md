# ToDo API

A NestJS-based API for managing ToDo items.

## Description

This project is a RESTful API built with NestJS and Prisma, providing endpoints to create, read, update, and delete ToDo items.

## Prerequisites

- Node.js (>= 16.0.0)
- npm (>= 8.0.0)
- PostgreSQL database

## Environment Variables

Create a `.env` file in the root directory with the following content:

```
DATABASE_URL="your_database_connection_string"
```

Replace `your_database_connection_string` with your actual PostgreSQL connection string.

## Installation

```bash
$ npm install
```

## Database Setup

```bash
# Generate Prisma client
$ npx prisma generate

# Run database migrations
$ npx prisma migrate dev
```

## Running the API

```bash
# Development
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run build
$ npm run start:prod
```

## Test

```bash
# Unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## API Endpoints

- `GET /todos`: Fetch all ToDo items
- `GET /todos/:id`: Fetch a specific ToDo item
- `POST /todos`: Create a new ToDo item
- `PATCH /todos/:id`: Update a ToDo item
- `DELETE /todos/:id`: Delete a ToDo item

## Technologies

- [NestJS](https://nestjs.com/)
