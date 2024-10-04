# Bloghaven

Bloghaven is a modern web blogging application built with a robust tech stack and security.Where user can read, create and explore blogs.

## Tech Stack

- **Frontend:** React
- **Backend:** Cloudflare Workers
- **Validation:** zod library (with a custom npm package for shared type checking)
- **Language:** TypeScript
- **ORM:** Prisma with connection pooling
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)

## Features

- **User Authentication:** Secure login and signup functionality using JWT.
- **Dynamic Content:** Interactive UI powered by React.
- **Cloud-based Backend:** Serverless architecture with Cloudflare Workers for handling backend logic.
- **Schema Validation:** zod library, using a custom npm package for consistent type checking across frontend and backend.
- **Database Management:** Prisma ORM for managing database interactions with efficient connection pooling for scalability.
- **PostgreSQL Database:** A reliable and scalable relational database.

## Folder Structure

- **Frontend (React):** Contains the client-side application logic.
- **Backend (Cloudflare Workers):** Server-side logic deployed on Cloudflare's serverless platform.
- **Common:** Contains a custom npm package that is used for shared type checking with zod between the frontend and backend, ensuring consistent validation throughout the application.

## Setup and Installation

To run the application locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Vivek-1102/Bloghaven
    cd Bloghaven
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Install the common package:**
    The `common` folder contains a custom npm package for zod type checking. To install it, run:
    ```bash
    cd common
    npm install
    ```

4. **Configure environment variables:**
   Create a `.env` file in the root of the project and add the following variables:
    ```bash
    DATABASE_URL=your_postgres_database_url
    JWT_SECRET=your_jwt_secret
    ```

5. **Prisma setup:**
   If you are using Prisma, generate the Prisma client:
    ```bash
    npx prisma generate
    ```

   If this is your first time running the project, also migrate the database:
    ```bash
    npx prisma migrate dev
    ```

6. **Start the development server:**
    ```bash
    npm run dev
    ```

7. **Deploy (Optional):**
   Deployment can be handled using Cloudflare Workers. Ensure your Cloudflare Worker setup is configured before deploying.

## Authentication

The app uses JWT for authentication. On successful login, a JWT is issued and must be included in the Authorization header of subsequent requests to access protected routes.

## Shared Validation

We use the **zod** library for schema validation, with a custom npm package located in the `common` folder. This package ensures that the same validation logic is used consistently between the frontend and backend, reducing redundancy and ensuring type safety across the entire application.

## Database

PostgreSQL is used as the primary database, and we manage our schema and migrations using Prisma ORM. Prisma provides seamless type safety and interaction with the Postgres database through a powerful query engine.

## Contributions

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.
