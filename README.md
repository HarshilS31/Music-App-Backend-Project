# 🎵 Music App Backend

A role-based backend for a music streaming platform, built with Node.js, Express, and MongoDB. Supports two distinct user roles — **Users** and **Artists** — with permissions enforced via JWT authentication and role-based middleware.

## Features

- 🔐 **JWT Authentication** — secure login with token-based sessions (stored in HTTP-only cookies)
- 🎭 **Role-Based Access Control** — Users can browse/stream; only Artists can upload music and create albums
- 🎧 **Music Upload** — upload music files with cloud storage integration
- 💿 **Album Management** — Artists can create and manage albums
- 🗄️ **MongoDB + Mongoose** — schema-based data modeling for Users, Artists, Music, and Albums

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JSON Web Tokens (jsonwebtoken)
- **File Handling:** Multer + cloud storage service

## Project Structure

```
src/
├── controllers/
│   └── music.controller.js    # Handles music/album creation logic
├── middlewares/
│   └── auth.middleware.js     # JWT verification + role-based access
├── models/
│   └── music.model.js         # Mongoose schema for music
├── services/
│   └── storage.js             # Cloud storage upload logic
└── routes/
    └── music.routes.js        # API route definitions
```

## Authentication & Authorization

- On login, a JWT is issued containing the user's `id` and `role`, and set as an HTTP-only cookie.
- Protected routes use the `authArtist` middleware, which:
  1. Verifies the JWT from `req.cookies.token`
  2. Confirms the decoded `role` is `"Artist"`
  3. Attaches the decoded user to `req.user` for downstream handlers
- Non-Artist users attempting restricted actions receive a `403 Forbidden`.

## API Endpoints

| Method | Endpoint                | Description                     | Access        |
|--------|--------------------------|----------------------------------|---------------|
| POST   | `/api/music/upload`      | Upload a new music track         | Artist only   |
| POST   | `/api/album`              | Create a new album                | Artist only   |

> More endpoints (streaming, browsing, user-facing routes) coming soon.

## Environment Variables

Create a `.env` file in the root directory:

```
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
PORT=3000
```
## Roadmap

- [ ] Streaming logic
- [ ] User-facing browse/search routes
- [ ] Improved validation & error handling
- [ ] Rate limiting

## Author

Built by Harshil as part of a self-directed full-stack learning journey.
