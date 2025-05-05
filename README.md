# Employee Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing employee information and attendance.

## Features

- 🔐 User Authentication (Login/Register)
- 👥 Employee Management (CRUD operations)
- 📊 Employee Dashboard
- 📝 Employee Details Management
- 📅 Attendance Tracking
- 🔍 Search and Filter Functionality
- 📱 Responsive Design

## Tech Stack

### Frontend
- React.js
- Redux Toolkit for state management
- React Router for navigation
- Axios for API calls
- Material-UI for UI components
- React Icons
- Chart.js for data visualization

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Cors for cross-origin requests
- Dotenv for environment variables

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd employee-management-system
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
employee-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   │   
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   └── attendanceController.js
│   │   
│   ├── middleware/
│   │   └── authMiddleware.js
│   │   
│   ├── models/
│   │   ├── User.js
│   │   ├── Employee.js
│   │   └── Attendance.js
│   │   
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   └── attendanceRoutes.js
│   │   
│   ├── .env
│   │   
│   ├── package.json
│   └── server.js
│   
└── frontend/
    ├── public/
    │   
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   ├── dashboard/
    │   │   ├── employees/
    │   │   └── layout/
    │   │   
    │   ├── features/
    │   │   ├── auth/
    │   │   ├── employee/
    │   │   └── attendance/
    │   │   
    │   ├── pages/
    │   │   
    │   ├── services/
    │   │   
    │   ├── utils/
    │   │   
    │   ├── App.js
    │   │   
    │   └── index.js
    │   
    ├── package.json
    └── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance` - Get attendance records
- `GET /api/attendance/:employeeId` - Get employee attendance

## Features in Detail

### Authentication
- Secure user registration and login
- JWT-based authentication
- Protected routes
- Password hashing

### Employee Management
- Add new employees with detailed information
- View employee list with search and filter
- Edit employee details
- Delete employees
- View individual employee profiles

### Dashboard
- Overview of total employees
- Attendance statistics
- Recent activities
- Quick actions

### Attendance Tracking
- Mark daily attendance
- View attendance history
- Generate attendance reports
- Filter attendance by date range

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@example.com or create an issue in the repository.

## Acknowledgments

- Material-UI for the component library
- React Icons for the icon set
- Chart.js for data visualization 