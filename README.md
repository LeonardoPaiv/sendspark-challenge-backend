# sendspark-challenge-backend

This is the backend API for the sendspark challenge. It is built using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## Technologies Used

- **NestJS**: A framework for building efficient and scalable Node.js server-side applications.
- **TypeORM**: An ORM for TypeScript and JavaScript.
- **PostgreSQL**: A powerful, open source object-relational database system.
- **JWT**: JSON Web Tokens for authentication.
- **Bcrypt**: Library to help you hash passwords.

## Installation

To install the application, you need to have `yarn` installed on your machine. Then, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/LeonardoPaiv/sendspark-challenge-backend.git
    cd sendspark-challenge-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. add the .env file to the root folder
```sql
sendspark-challenge-backend/
├── src/                # Source files
├── .env                # Provide security values
├── .eslintrc.js        # ESLint configuration
├── .prettierrc         # Prettier configuration
├── nest-cli.json       # Nest CLI configuration
├── package.json        # Project dependencies and scripts
├── tsconfig.build.json # TypeScript build configuration
├── tsconfig.json       # TypeScript configuration
└── yarn.lock   
```

## Running the Application

To run the application in development mode, use the following command:
```sh
npm run start
```

The application will be available at: http://localhost:3000