# Installation Instructions for Academy Backend

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You need to have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **MySQL**: You should have MySQL installed and running. You can download it from [mysql.com](https://www.mysql.com/).
- **Git**: It's recommended to have Git installed for version control. You can download it from [git-scm.com](https://git-scm.com/).

## Installation Steps

1. **Clone the Repository**

   Open your terminal and run the following command to clone the repository:

   ```
   git clone https://github.com/klucas27/academyAPI.git
   ```

2. **Navigate to the Project Directory**

   Change your directory to the project folder:

   ```
   cd academyAPI
   ```

3. **Install Dependencies**

   Run the following command to install the required dependencies:

   ```
   npm install
   ```

4. **Set Up Environment Variables**

   Create a `.env` file in the root of the project directory. You can use the provided `.env` file as a template. Here’s an example of what to include:

   ```
   HOST_BD='your-database-host'
   USER_BD='your-database-username'
   PASSWORD_BD='your-database-password'
   DATABASE_BD='your-database-name'
   OPENAI_API_KEY='your-openai-api-key'
   PORT=3006
   JWT_SECRET='your-jwt-secret'
   EMAIL_USER='your-email'
   EMAIL_PASS='your-email-password'
   ```

   Make sure to replace the placeholder values with your actual database and API credentials.

5. **Create the Database**

   Ensure your MySQL server is running, and create the database specified in your `.env` file. You can do this using a MySQL client or command line.

6. **Run the Application**

   Start the application using the following command:

   ```
   npm run dev
   ```

   This will start the server in development mode. You should see a message indicating that the server is running.

## Accessing the API

Once the server is running, you can access the API at `http://localhost:3006/api` for OpenAI routes and `http://localhost:3006/users` for user management routes.

## Troubleshooting

If you encounter any issues during installation, ensure that:

- All dependencies are correctly installed.
- Your MySQL server is running and accessible.
- The environment variables are correctly set in the `.env` file.

For further assistance, refer to the [MAINTENANCE.md](MAINTENANCE.md) file for guidelines on maintaining the project.