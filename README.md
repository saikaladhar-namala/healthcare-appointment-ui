# 🏥 MyKare - Healthcare Appointment Management System (Frontend)

A responsive React.js frontend for the **MyKare Healthcare Appointment Management System**, providing an intuitive interface for patients to register, log in, book doctor appointments, manage appointments, and view available slots.

This application communicates with the Spring Boot backend through REST APIs secured using JWT Authentication.

---

# 🚀 Project Overview

The MyKare Frontend provides a modern and user-friendly interface for managing healthcare appointments. It integrates seamlessly with the backend to deliver a secure and responsive booking experience.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Token Authentication
- Protected Routes
- Logout
<img width="1478" height="769" alt="Screenshot 2026-07-09 184837" src="https://github.com/user-attachments/assets/6625cafc-dfbc-47ab-b96e-dbdddf220f48" />

<img width="1554" height="731" alt="image" src="https://github.com/user-attachments/assets/ad1d4670-bf06-4b6f-9f9a-3e5f1d3101ff" />

---

## 👨‍⚕️ Doctor Management

- View Doctors
- View Specializations
- Doctor Availability

---

## 📅 Appointment Management

- Book Appointment
- Cancel Appointment
- View My Appointments
- Appointment History
- View Appointment Status

- <img width="1510" height="743" alt="image" src="https://github.com/user-attachments/assets/de754a4b-2f3e-40dc-a217-fc0d405dcb7f" />


---

## ⏰ Slot Management

- Fetch Available Slots
- Real-Time Slot Selection
- Prevent Double Booking

<img width="1563" height="704" alt="image" src="https://github.com/user-attachments/assets/9e997dab-e90a-487e-8e85-b4c06a583c08" />
<img width="1541" height="751" alt="image" src="https://github.com/user-attachments/assets/086037d4-485f-4177-9dc8-567d15f1239d" />
<img width="1495" height="788" alt="image" src="https://github.com/user-attachments/assets/ef28ef4e-3c8d-42da-b0c5-4c32ccdc03ed" />


---

## 📱 Responsive UI

- Mobile Friendly
- Clean Dashboard
- Responsive Layout
- Easy Navigation

---

# 🖥 Application Flow

```text
User Login
      │
      ▼
Dashboard
      │
      ├─────────────► Doctors
      │                  │
      │                  ▼
      │           Available Slots
      │                  │
      │                  ▼
      │          Book Appointment
      │
      ▼
My Appointments
      │
      ▼
Cancel Appointment
```

---

# 💻 Technology Stack

- React.js
- React Router DOM
- Axios
- Bootstrap
- HTML5
- CSS3
- JavaScript (ES6)

---

# 📂 Project Structure

```
src
│
├── components
│   ├── Login
│   ├── Register
│   ├── Dashboard
│   ├── DoctorList
│   ├── AppointmentBooking
│   ├── AppointmentHistory
│   ├── Navbar
│   └── Common
│
├── services
│
├── utils
│
├── App.js
│
└── index.js
```

---

# 🔗 Backend Integration

The frontend consumes REST APIs exposed by the Spring Boot backend.

Example APIs:

```
POST /api/auth/login

POST /api/auth/register

GET /api/doctors

GET /api/appointments

POST /api/appointments

PUT /api/appointments/cancel/{id}
```

---

# 🔐 Authentication Flow

```text
Login
   │
   ▼
Backend Authentication
   │
   ▼
JWT Token
   │
   ▼
Stored in Browser
   │
   ▼
Used for Authorized API Requests
```

---

# ▶ Running the Application

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm start
```

Runs on

```
http://localhost:3000
```

---

## Create Production Build

```bash
npm run build
```

---

# 🌐 Backend Configuration

Update the backend API URL if required.

Example

```javascript
const BASE_URL = "http://localhost:8999";
```

---

# 📸 Application Screens

- Login
- Register
- Dashboard
- Doctor List
- Available Slots
- Book Appointment
- My Appointments
- Cancel Appointment

> Screenshots can be added inside the `/docs` folder.

---

# 🚀 Highlights

- JWT Authentication
- Responsive React UI
- Protected Routes
- REST API Integration
- Axios HTTP Client
- Bootstrap Components
- Reusable React Components
- Clean Folder Structure

---

# 🔮 Future Enhancements

- Dark Mode
- Profile Management
- Notification Center
- Appointment Reminder UI
- Real-Time Updates
- Pagination & Search
- Admin Dashboard

---

# 👨‍💻 Developed By

**Sai Kaladhar Namala**

Java Full Stack Developer

### Skills

Java • Spring Boot • React.js • PostgreSQL • Apache Kafka • Python • REST APIs • JWT • Hibernate

GitHub

https://github.com/saikaladhar-namala

LinkedIn

https://www.linkedin.com/in/sai-kaladhar-namala-1415771a6/

---

⭐ If you found this project useful, consider giving it a Star.
