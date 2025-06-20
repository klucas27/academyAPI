# Academy Backend

## Overview

The Academy Backend is a Node.js application that serves as the backend for the Academy platform. It provides RESTful APIs for user management and integrates with the OpenAI API to generate questions based on user prompts.

## Features

- User registration and authentication
- User data management (update stats, retrieve user information)
- Feedback submission via email
- Integration with OpenAI API for question generation
- JWT-based authentication for secure routes

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 12 or higher)
- npm (Node package manager)
- MySQL database server

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/klucas27/academyAPI.git
   cd academyAPI
   ```

2. **Install dependencies:**

   Run the following command to install the required packages:

   ```bash
   npm install
   ```

3. **Set up the environment variables:**

   Create a `.env` file in the root directory of the project and add the following variables:

   ```
   HOST_BD='your_database_host'
   USER_BD='your_database_user'
   PASSWORD_BD='your_database_password'
   DATABASE_BD='your_database_name'
   OPENAI_API_KEY='your_openai_api_key'
   PORT=3006
   JWT_SECRET='your_jwt_secret'
   EMAIL_USER='your_email'
   EMAIL_PASS='your_email_password'
   ```

4. **Create the database:**

   Ensure that your MySQL server is running and create a database with the name specified in the `DATABASE_BD` variable.

5. **Run the application:**

   Start the server using the following command:

   ```bash
   npm run dev
   ```

   The application will be running at `http://localhost:3006`.

## Maintenance

For detailed maintenance instructions, including how to update dependencies and manage the database, refer to the [MAINTENANCE.md](docs/MAINTENANCE.md) file.

## Documentation

For installation instructions, refer to the [INSTALLATION.md](docs/INSTALLATION.md) file.

## License

This project is licensed under the MIT License.