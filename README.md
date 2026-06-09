# Vitto Loan Application Portal

A Full Stack Loan Application Portal built as part of the Vitto Full Stack Engineer Internship Assessment.

## Live Demo

Frontend: [[Frontend](https://vitto-loan-portal-lilac.vercel.app/)]

Backend API: [[Backend](https://vitto-loan-portal-b66u.onrender.com)]

---

## Overview

This application allows borrowers to submit loan applications and enables agents to review and update application statuses.

### Features

* Submit loan applications
* View all applications
* Filter applications by status
* Search by applicant name or mobile number
* Update application status (Approve / Reject)
* Dashboard summary statistics
* Mobile responsive design
* PostgreSQL database integration

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* PostgreSQL
* pg

### Database

* Supabase PostgreSQL

### Deployment

* Frontend: Vercel
* Backend: Render

---

## API Endpoints

### Create Application

```http
POST /api/applications
```

### Get All Applications

```http
GET /api/applications
```

Optional Query:

```http
GET /api/applications?status=pending
```

### Update Application Status

```http
PATCH /api/applications/:id/status
```

### Dashboard Summary

```http
GET /api/summary
```

---

## Database Schema

Table: applications

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| name       | VARCHAR   |
| mobile     | VARCHAR   |
| amount     | NUMERIC   |
| purpose    | TEXT      |
| language   | VARCHAR   |
| status     | VARCHAR   |
| created_at | TIMESTAMP |

---

## Project Structure

```text
vitto-loan-portal
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── db
│   ├── migrations
│   └── server.js
│
├── frontend
│   ├── src
│   ├── pages
│   └── components
│
└── README.md
```

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/VaishnaviAsthaG/vitto-loan-portal.git
cd vitto-loan-portal
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
DATABASE_URL=your_database_url
```

Run Backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run Frontend

```bash
npm run dev
```

---

## Future Improvements

* Authentication and role-based access
* Loan approval workflow automation
* Document upload support
* Email and SMS notifications
* Advanced analytics dashboard

---

## Author

**Vaishnavi Astha Gupta**

B.Tech Information Technology

MERN Stack Developer | Backend Developer

GitHub: https://github.com/VaishnaviAsthaG

LinkedIn: https://www.linkedin.com/in/vaishnavi-astha-gupta-9b9631255/
