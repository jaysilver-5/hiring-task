# Project Overview

This project is a full-stack web application that integrates a Next.js frontend and a TypeORM backend (running with MySQL). The two parts of the application run concurrently in a modular structure, ensuring clean separation between the frontend and backend. It implements authentication, post title management, and various other features through a well-defined architecture. Additionally, the frontend uses Redux for state management and handles loading states in key areas such as authentication and the dashboard.

## Project Structure

- **backend/** - The backend is an Express server running on Node.js with TypeORM for database management.
- **frontend/** - The frontend is a Next.js application, following a modular approach with custom hooks for clean code.
- **frontend/hooks/** - Located in the frontend root, this folder contains reusable hooks like `useAuth.ts` and `usePostTitle.js` that provide centralized logic for the authentication system and post management.

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14.x or higher)
- Yarn (for package management)
- MySQL (v8.x or higher)

### Setup Environment Variables

#### Backend (`backend/.env`)

```plaintext
DB_TYPE = "mysql"
DB_HOST = "localhost"
DB_USERNAME = "root"
DB_PASSWORD = xxnull.5
DB_PORT = 3306
DB_NAME = "express"
PORT = 8000
SECRET_KEY = "express"
EXPIRE_TIME = 3600
SERVER_ADDRESS = "localhost"
RESET_URL = "/reset_password"
```


# Frontend (.env)
```plaintext
NEXT_PUBLIC_API_URL='http://localhost:8000/api/v1'
```

## Installation & Setup
### Clone the repository:
```bash
git clone <repository-url>
cd <repository-folder>
```

### Install dependencies for both backend and frontend:
```bash
yarn install
```

### Start the application:
Use the following command to run both the frontend and backend concurrently:
```bash
yarn dev:all
```

This will start the backend on `http://localhost:8000` and the frontend on the default Next.js port (usually `http://localhost:3000`).

## How the Application is Modular
The application follows a modular structure:
- The backend is separated from the frontend, allowing for independent development and testing.
- In the frontend, logic for authentication and post title management is abstracted into custom hooks like `useAuth.ts` and `usePostTitle.js`. This ensures clean, reusable code and better maintainability.
- Redux is used for managing global state, especially for token-based authentication, which integrates seamlessly with the backend. The token is stored and used in API calls, ensuring secure communication between the frontend and backend.

## Loading States
Loading states are handled within the frontend, especially in key areas such as:
- **Login/Register** - Loading indicators are shown while authentication is processed.
- **Dashboard** - The dashboard displays a loading state while fetching user-specific data.

The `useAuth.ts` and `usePostTitle.js` hooks include logic for managing these states efficiently, enhancing the user experience.

## Short Turnaround Time
This project was developed in a short period, thanks to:
- **Concurrency in development** - Running the frontend and backend concurrently accelerated development and testing.
- **Modular approach** - By separating the logic into reusable hooks and components, the development was streamlined, reducing time spent on refactoring or duplication.
- **Redux integration** - The integration of Redux allowed for quick and efficient state management, ensuring smooth handling of authentication tokens and user data.

## Future Improvements
- Add more comprehensive tests to both frontend and backend.
- Enhance error handling and extend the current loading state logic to other parts of the application.
- Add more security features, such as input validation and rate-limiting in the backend.
