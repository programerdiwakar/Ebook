...existing code...
# BookNest (Ebook) — Fullstack MERN App

Live demo: https://ebook-frontend-nkdp.onrender.com

A simple e-book store (frontend + backend) built with React + Vite and Express + MongoDB.  
This repo contains a React frontend (Vite) in `frontend/` and an Express/MongoDB backend in `backend/`.

---

## Quick links
- Frontend: `frontend/`
- Backend: `backend/`

## Repo layout (key files)
- Frontend
  - `frontend/package.json`
  - `frontend/src/main.jsx`
  - `frontend/src/App.jsx`
  - Redux slice: `frontend/src/store/auth.js`
  - Pages/components: `frontend/src/pages/SignIn.jsx`, `frontend/src/pages/SignUp.jsx`, `frontend/src/pages/AllBooks.jsx`, `frontend/src/pages/UpdateBook.jsx`
  - Book UI: `frontend/src/components/BookCard/BookCard.jsx`
  - Book details: `frontend/src/components/ViewBookDetails/ViewBookDetails.jsx`
  - Profile settings: `frontend/src/components/Profile/Settings.jsx`

- Backend
  - `backend/package.json`
  - Server entry: `backend/app.js`
  - Auth middleware: `backend/routes/userAuth.js`
  - Routes: `backend/routes/user.js`, `backend/routes/book.js`, `backend/routes/cart.js`, `backend/routes/favourite.js`, `backend/routes/order.js`
  - Models: `backend/models/user.js`, `backend/models/book.js`, `backend/models/order.js`
  - Env: `backend/.env` (store MongoDB URI)

---

## Quick start

Prereqs:
- Node.js (v16+)
- MongoDB URI (cloud or local)

1. Backend
   - cd backend
   - npm install
   - create `.env` with your MongoDB connection string (see example below)
   - npm start (server listens on port 3000 by default)

2. Frontend
   - cd frontend
   - npm install
   - npm run dev (Vite)

.env example (backend)
```
MongoDB_URI=your_mongodb_connection_string
```

---

## API (overview)
Base: /api/v1

- Users
  - POST /api/v1/users/signup
  - POST /api/v1/users/signin
  - GET /api/v1/users/get-user-info (auth)
  - PUT /api/v1/users/update-address (auth)

- Books
  - POST /api/v1/books/add-book (admin)
  - PUT /api/v1/books/update-book (auth)
  - DELETE /api/v1/books/delete-book (auth)
  - GET /api/v1/books/get-all-books
  - GET /api/v1/books/get-recent-books
  - GET /api/v1/books/get-book-by-id/:id

- Cart / Favourites / Orders
  - Cart: `backend/routes/cart.js`
  - Favourites: `backend/routes/favourite.js`
  - Orders: `backend/routes/order.js`

Auth middleware: `backend/routes/userAuth.js`

---

## Admin (development) credentials

Use these credentials for testing admin-only routes in development:

- Username: `jonty`  
- Password: `12345678`

Do not use these credentials in production. Create a secure admin account or seed admin via environment-safe scripts.

---

## Notable implementation details & known issues
- Frontend form typo: `titel` -> should be `title` in AddBook/UpdateBook forms.
- Settings state binding: `Settings.jsx` uses inconsistent state keys; bind textarea to the correct property (e.g. `Value.address`) and set state accordingly.
- Order status casing mismatch: standardize strings between backend and frontend (e.g. "Order Placed" vs "Order placed").
- localStorage usage: replace `localStorage.clear("id")` with `localStorage.removeItem("id")`.

---

## Tips
- Auth token is stored in localStorage. Ensure token + id + role are set after sign-in.
- If you change backend secrets or token format, update `jwt.verify` usage in `backend/routes/userAuth.js`.
- For development, consider seeding an admin user instead of committing credentials.

---

If you want, I can:
- open a PR patching the AddBook/UpdateBook typo and the Settings binding,
- or generate a sample `.env` and a quick PowerShell script to run both servers.
...existing code...