# Frontend Home Assignment: Title Management Application

## Objective

Develop a frontend application that interacts with an Express backend to manage user authentication and create and read (display) titles suggested by users. Additionally, integrate MetaMask for wallet functionality.

## Prerequisites

- To complete assignment we provide express backend for user authentication and title management.
- Confirm you already installed VSCode, NodeJS(v20), MySQL
- Run provided backend to interact with frontend

   1. Install dependencies

      ```bash
      cd task
      npx yarn
      ```

   2. Run server

      ```bash
      npx yarn dev
      ```

   3. You can access our backend via <http://localhost:8000>

## Requirements

1. **User Authentication**:
   - Implement a login and registration page.
   - Use JWT (JSON Web Tokens) for managing user sessions.
   - Ensure proper error handling for authentication processes.

2. **Title Management**:
   - Create a dashboard that allows authenticated users to:
     - View a list of titles.
     - Add new titles.
     - Delete existing titles.
   - Each title should have a subject and any other relevant details.

3. **MetaMask Integration**:
   - Integrate MetaMask to allow users to connect their cryptocurrency wallet.
   - Display the connected wallet address on the dashboard.
   - Ensure that users can only add or delete titles when their wallet is connected.

4. **Testing**:
   - Write unit tests for all components and functions.
   - Use a testing framework such as Jest or React Testing Library.
   - Ensure that all tests are passing before submission.

5. **Documentation**:
   - Provide clear documentation on how to set up and run the frontend application.
   - Include details on how to connect to the backend and any configurations needed.
   - Document the API endpoints used and their expected responses.

## Tech Stack

- **Frontend Framework**: React (or any other modern framework of your choice)
- **State Management**: Redux or Context API (optional)
- **Styling**: CSS Modules, Styled Components, or any CSS framework (Bootstrap, Tailwind, etc.)
- **Testing**: Jest, React Testing Library, or similar
- **MetaMask**: Web3.js or Ethers.js for wallet integration

## Submission Guidelines

- Submit your code in a public GitHub repository.
- Include a README.md file with setup instructions, usage, and any additional notes.
- Ensure your code is clean, well-structured, and follows best practices.

## Evaluation Criteria

- Functionality: The application should meet all the specified requirements.
- Code Quality: Clean, maintainable, and well-organized code.
- Testing: Comprehensive tests covering key functionalities.
- Documentation: Clarity and completeness of the documentation provided.
- User Experience: A clean and intuitive UI/UX design.
