# Contacts rest api

## Description

This project is a REST API for managing a contacts collection. It is built with Node.js, uses Express for routing, Joi for validation, and stores data in a `contacts.json` file.

---

## Main Features

- **GET /api/contacts** — Retrieve all contacts
- **GET /api/contacts/:id** — Retrieve a contact by ID
- **POST /api/contacts** — Create a new contact (with Joi validation)
- **DELETE /api/contacts/:id** — Delete a contact by ID
- **PUT /api/contacts/:id** — Update a contact (with Joi validation)

---

## How to Run

1. Install dependencies:

   ```
   npm install
   ```

2. Start the server:

   ```
   npm start
   ```

   or for development with auto-restart:

   ```
   npm run dev
   ```

3. The server will be available at:  
   [http://localhost:3000/api/contacts](http://localhost:3000/api/contacts)

---

## Project Structure

- `/controllers` — Request handlers (controllers)
- `/routes` — API routes
- `/services` — Logic for working with files/data
- `/schemas` — Joi validation schemas
- `/helpers` — Utility functions (HttpError, validateBody, etc.)
- `/decorators` — Controller wrappers (e.g., controllerWrapper)

---

## Validation

- Joi is used for validating data when creating and updating contacts.
- If the data is invalid, the API returns status 400 and an error description.

---

## Example Request Body for Creating a Contact

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+380991234567"
}
```
