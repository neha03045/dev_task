# User Management Backend API

This is a NestJS backend API for user management, built with TypeScript, TypeORM, and MySQL. It provides RESTful endpoints for user CRUD operations and authentication with JWT tokens.

## Features

- User registration and authentication with JWT
- Complete user CRUD operations (Create, Read, Update, Delete)
- Soft delete functionality for users
- Role-based access control with guards
- Swagger API documentation
- MySQL database integration with TypeORM
- Input validation with class-validator
- Password hashing with bcrypt

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Installation

```bash
npm install
```

### Database Setup
1. Create a MySQL database
2. Update the database configuration in your environment variables or config files
3. Run database migrations (if any) or let TypeORM auto-create tables

### Environment Variables
Create a `.env` file with:
```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database_name
JWT_SECRET=your_jwt_secret
```

### Running the Application

```bash
# development
npm run start:dev

# production
npm run start:prod
```

The API will be available at `http://localhost:3000`

### API Documentation
Once running, visit `http://localhost:3000/api` for Swagger documentation.

## Project Structure

- `src/`: Source code
  - `app/`: Main application module
  - `auth/`: Authentication module with login and JWT handling
  - `users/`: Users module with CRUD operations
  - `common/`: Shared utilities and guards
- `test/`: Unit and e2e tests
- `dist/`: Compiled JavaScript (after build)

## API Endpoints

### Authentication
- `POST /auth/login` - User login (returns JWT token)
- `GET /auth/me` - Get current user info (requires authentication)

### Users
- `GET /users` - Get all users (requires authentication)
- `POST /users` - Create a new user
- `PATCH /users/:id` - Update a user (requires authentication)
- `DELETE /users/soft/:id` - Soft delete a user (requires authentication)
- `DELETE /users/hard/:id` - Hard delete a user (requires authentication)

### Authentication Flow
1. **Registration**: Users can be created via `POST /users` without authentication
2. **Login**: Send email and password to `POST /auth/login` to receive a JWT token
3. **Authenticated Requests**: Include the JWT token in the Authorization header as `Bearer <token>`
4. **Protected Endpoints**: Most user operations require a valid JWT token

### User Management Flow
- **Create**: Register new users without authentication
- **Read**: Authenticated users can view all users
- **Update**: Authenticated users can modify user details
- **Delete**: Two delete options:
  - Soft delete: Marks user as deleted but keeps data
  - Hard delete: Permanently removes user from database

## Technologies Used

- NestJS 11.0.1
- TypeScript 5.x
- TypeORM 0.3.28
- MySQL 8.x
- JWT (jose) 6.2.2
- bcrypt 6.0.0
- class-validator 0.14.4
- Swagger UI 5.0.1

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Deployment

For production deployment, ensure your environment variables are properly configured and the database is accessible. Use `npm run build` to compile the application.
