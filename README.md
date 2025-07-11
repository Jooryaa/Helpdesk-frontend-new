# Helpdesk Frontend

A React.js frontend for the Helpdesk Ticketing System.

## Features

- User authentication with JWT
- Role-based access (Admin/Staff)
- Ticket management (view, create, reply)
- Real-time ticket status updates
- Responsive design
- Modern UI with smooth animations

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure the backend server is running on `http://localhost:5000`

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## Project Structure

```
src/
├── components/
│   ├── Login.js - Login page with authentication
│   ├── Dashboard.js - Main dashboard with ticket list
│   ├── CreateTicket.js - Form to create new tickets
│   ├── TicketDetail.js - Detailed ticket view with replies
│   └── *.css - Component-specific styles
├── contexts/
│   └── AuthContext.js - Authentication context provider
└── App.js - Main app component with routing
```

## Test Credentials

- **Admin**: admin@fakeeh.edu.sa / admin123
- **User1**: user1@fakeeh.edu.sa / pass123
- **User2**: user2@fakeeh.edu.sa / pass123
- **User3**: user3@fakeeh.edu.sa / pass123
- **User4**: user4@fakeeh.edu.sa / pass123
- **User5**: user5@fakeeh.edu.sa / pass123

## Technologies Used

- React.js
- React Router for navigation
- Axios for API calls
- CSS3 with modern styling
- JWT for authentication
