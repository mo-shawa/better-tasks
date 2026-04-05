## Add Error Handling and Input Validation

The server controllers have no error handling. `createTask` in `server/src/controllers/api.ts` calls `Task.create(req.body)` without a try/catch block, meaning any database error (validation failure, connection issue, etc.) will result in an unhandled promise rejection and crash the server. There is also no input validation — the endpoint accepts arbitrary data and writes it directly to MongoDB without checking that required fields like `name` are present or that values are of the right type. A global Express error-handling middleware should be added, all async controllers should be wrapped in try/catch, and a validation library (e.g. `express-validator` or `zod`) should be used to sanitize and validate request bodies before they reach the database.

---

## Implement Complete CRUD Endpoints for Tasks

Only two routes exist: `GET /api/test` (a placeholder) and `POST /api/tasks`. A task management application requires the full set of CRUD operations. The following endpoints are missing: `GET /api/tasks` to list all tasks, `GET /api/tasks/:id` to fetch a single task, `PUT /api/tasks/:id` to update a task, and `DELETE /api/tasks/:id` to remove a task. Each of these should have a corresponding controller function with proper error handling and, once authentication is wired up, should be protected behind auth middleware.

---

## Complete the Authentication Implementation

Passport, `passport-jwt`, and `dotenv` are already installed on the server, but authentication is entirely unimplemented. `server/src/models/user.ts` is an empty file, `server/src/controllers/users.ts` is an empty file, and `server/src/routes/users.ts` exports only an empty router. The intention to support JWT-based auth is clear from the dependencies, but none of the pieces have been built. A `User` Mongoose model with hashed passwords (e.g. via `bcrypt`) should be created, registration and login controller functions should be implemented, JWT tokens should be issued on login and verified via the Passport JWT strategy, and all task routes should require a valid token so that users can only access their own tasks.

---

## Build a Functional Task Management UI on the Client

`client/src/App.tsx` contains only demo/scaffold code — a single button that fetches from a hardcoded `http://localhost:8080/api/test` URL and displays a random number. There is no UI for creating, viewing, editing, or deleting tasks. The client should be rebuilt with proper React components: a form to create a task (with fields for name, detail, priority, and why), a list component to display existing tasks, and controls to update or delete individual tasks. The hardcoded backend URL should be replaced with a Vite environment variable (`import.meta.env.VITE_API_URL`), and the Vite proxy target in `vite.config.ts` should be corrected from `https://localhost:8080` to `http://localhost:8080` to match the actual server protocol.

---

## Set Up a Testing Infrastructure

There are zero tests in the entire repository. The server `package.json` test script is the placeholder `echo "Error: no test specified" && exit 1`. A test framework should be added — for example, Vitest (which works well across both the Vite-based client and the TypeScript server) or Jest. Unit tests should cover the controller logic (with Mongoose mocked), and integration tests should cover the Express routes using a library like `supertest`. On the client, React Testing Library should be used to test component rendering and user interactions. A basic coverage threshold should be enforced so that new code cannot be merged without tests.

---
