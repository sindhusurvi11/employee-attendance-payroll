# Employee Attendance & Payroll API

A backend REST API for managing employees, attendance, leaves, payroll, and reports.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- Render (Deployment)

## Live Base URL
https://employee-attendance-payroll.onrender.com

## Features
- Admin & Employee authentication
- Employee management (CRUD)
- Attendance punch-in / punch-out
- Leave application & approval
- Payroll generation
- Monthly & summary reports

## API Documentation
Postman collection is available in the `postman/` folder.

## How to Test
1. Import the Postman collection
2. Use the live base URL
3. Add JWT token in Authorization header


## API Endpoints

### Auth – Admin
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/profile

### Auth – Employee
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/profile

### Employees (Admin)
- POST /api/employees
- GET  /api/employees
- GET  /api/employees/:id
- PUT  /api/employees/:id
- DELETE /api/employees/:id

### Attendance (Employee)
- POST /api/attendance/punch-in
- POST /api/attendance/punch-out
- GET  /api/attendance/my

### Attendance (Admin)
- GET  /api/attendance/:employeeId

### Leaves
- POST /api/leaves/apply
- PUT  /api/leaves/approve/:id
- GET  /api/leaves/my

### Payroll
- GET /api/payroll/:employeeId?month=&year=

### Reports
- GET /api/reports/monthly
- GET /api/reports/summary

