# CMS Backend

This is the backend for the CMS project, built with Node.js, Express, and Prisma. It provides APIs for user authentication, article management, and user management.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Article Routes](#article-routes)
- [Middleware](#middleware)
- [Database](#database)
- [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/CMS.git
   cd CMS
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the database:

   ```sh
   npx prisma migrate dev
   ```

4. Generate Prisma client:

   ```sh
   npx prisma generate
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
```

##

Scripts

- `npm run dev`: Start the development server with hot reloading.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm start`: Start the production server.
- `npm run lint`: Run ESLint to lint the code.
- `npm run format`: Run Prettier to format the code.
- [`npm run prisma:migrate`]: Run Prisma migrations.
- [`npm run prisma:generate`]: Generate Prisma client.

## API Endpoints

### User Routes

- `POST /register`: Register a new user.
- `POST /login`: Log in a user.
- `POST /promote`: Promote a user to admin (protected, admin only).
- `GET /me`: Get the current user's details (protected).

### Article Routes

- `POST /articles`: Create a new article (protected).
- `GET /articles`: Get all articles.
- `DELETE /articles/:id`: Delete an article by ID (protected).

## Middleware

- [`authMiddleware`]: Protect routes by requiring authentication.
- [`isAdminMiddleware`]: Protect routes by requiring admin role.

## Database

This project uses Prisma as the ORM. The database configuration is located in [`src/config/database.ts`]
