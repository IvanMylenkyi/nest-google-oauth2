### Google Authentication with NestJS, Prisma, and PostgreSQL
This is a pet project that demonstrates Google authentication using NestJS, Passport, Prisma, and PostgreSQL. The project provides an API for authenticating users via Google, managing user sessions, and storing user data in a PostgreSQL database.

## Features
- ### Google Authentication:
- Login with Google using OAuth 2.0.
- If the user does not exist in the database, their account is created upon login.
- If the user exists, they are authenticated and granted access.
### Session Management:
- Status check for user authentication.
## Installation
### Prerequisites
- Node.js (>= 16.x)
- PostgreSQL
- A Google Developer Account for setting up OAuth 2.0 credentials.
## Steps
- Clone the repository:

`git clone https://github.com/your-username/your-repo.git`

` cd your-repo `

### Install dependencies:
``` npm install ```
### Set up the database:
- Create a PostgreSQL database.
### Configure Prisma:
- Update DATABASE_URL in the .env file with your database connection string.
- env:
   
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

### Deploy Prisma schema to your database:

``` npx prisma db push ```
### Configure Google OAuth:

- Create a new project on the Google Cloud Console.
### Set up OAuth 2.0 credentials:
- Redirect URI: http://localhost:3000/api/auth/google/redirect
- Update .env with the credentials:
env:


- GOOGLE_CLIENT_ID="your-google-client-id"
- GOOGLE_CLIENT_SECRET="your-google-client-secret"
### Run the project:

`npm run start:dev`
## Endpoints
- ### Authentication Endpoints

- ### Endpoint: GET /api/auth/google/login
- Description: Initiates Google authentication.
- Usage: Redirects the user to the Google login page.
- Google Authentication Callback

- ### Endpoint: GET /api/auth/google/redirect
- Description: Handles the Google callback after login.
- If the user does not exist in the database, a new account is created.
### Authentication Status

- ### Endpoint: GET /api/auth/status
- Description: Checks if the user is authenticated.
### Response:
- { msg: "Authenticated" } if logged in.
- { msg: "Not Authenticated" } if not logged in.
  
# How It Works?
### Login Flow:

User visits /api/auth/google/login.
The app redirects to Google OAuth.
After selecting an account, Google redirects the user back to /api/auth/google/redirect.
### The server:
Checks if the user exists in the database.
If the user exists, they are logged in.
If the user does not exist, their data is saved in the database, and they are logged in.
### User Data:

User information is fetched from Google and stored in the PostgreSQL database using Prisma.
### Authentication Status:

- /api/auth/status checks if the current session is authenticated.
### Project Structure
`src/
├── auth/
│   ├── auth.controller.ts      # Defines authentication-related endpoints
│   ├── auth.guard.ts           # Google authentication guard using Passport
│   ├── auth.service.ts         # Handles authentication logic
│   ├── google.strategy.ts      # Passport strategy for Google OAuth
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Optional: Script for seeding the database
├── main.ts                     # Entry point for the application`

## Technologies Used
### NestJS: Backend framework for building scalable server-side applications.
### Passport: Middleware for authentication.
### Prisma: ORM for database operations.
### PostgreSQL: Relational database for storing user data.

## Author
Created by Ivan Mylenkyi.
Feel free to fork and contribute! 😊

## License

Nest is [MIT licensed](LICENSE).
