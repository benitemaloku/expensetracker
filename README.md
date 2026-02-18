# MERN Expense Tracker Application

A **Full Stack Expense Tracking Application** built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
This app helps users manage their income and expenses with secure authentication, interactive charts, and exportable reports.

🔗 **Live Demo:** [Expense Tracker App](https://expensetracker-tnaw.onrender.com/login)

---

## Features

- **User Authentication** – Secure login and registration using JWT.  
- **Password Reset & Forgot Password** – Email-based password recovery with **resend email functionality**.
- **Profile Editing** – Update name and profile photo. 
- **Dashboard Summary** – Overview of total balance, income, and expenses.  
- **Income Management** – Add, view, delete, and export income sources.  
- **Expense Management** – Add, view, delete, and export expenses with category tracking.   
- **Interactive Charts** – Bar, pie, and line charts for income/expense visualization.  
- **Recent Transactions** – Quick access to latest income and expense entries.  
- **Reports** – Export all data in Excel format.  
- **Responsive UI** – Works seamlessly on desktop, tablet, and mobile.  
- **Intuitive Navigation** – Side menu for Dashboard, Income, Expense, and Checkout.  
- **Delete Functionality** – Hover over cards to reveal delete button.  

---

##  Tech Stack
- Frontend: React.js (Vite), React Router, Context API, Axios, Tailwind CSS v4, Recharts
- Backend: Node.js, Express.js, MongoDB (Mongoose)
- Authentication: JWT (JSON Web Token), bcryptjs
- Email Service: Resend.com
- File Uploads: Multer
- Reports: XLSX (export në Excel)
- Deployment: Render (backend + fortend)

---

## Installation & Setup

Clone the repository:

```bash
https://github.com/benitemaloku/ExpenseTracker.git
```
Backend Setup

```bash
cd backend
npm install
npm run dev
```
Frontend Setup
```bash
cd frontend/expense-tracker
npm install
npm run dev
```
