# Employee Management System  

A comprehensive web-based solution to streamline the management of employee workflows, salaries, and organizational data. This application caters to distinct user roles: **Admins**, **HRs**, and **Employees**, providing them tailored functionality to ensure a smooth workflow.

## 🎯 Project Features

1. **Role-specific Dashboards**  
   - Separate dashboards for Employees, HRs, and Admins with tailored features.  

2. **Advanced Authentication**  
   - Email/password-based registration with role-based options (Employee/HR).  
   - Conditional navigation based on authentication status and user roles.  

3. **Dynamic Task/Work Log Management**  
   - Employees can log tasks with CRUD operations (create, edit, delete).  

4. **Employee Verification & Salary Management**  
   - HR can verify employees, manage salary details, and process monthly/yearly payment history.  

5. **Responsive Design**  
   - Fully responsive layouts optimized for mobile, tablet, and desktop devices.  

6. **Professional UI with Material Tailwind**  
   - Clean and modern design using **Material Tailwind** for a user-friendly experience.  

7. **Real-Time Charts**  
   - Dynamic charts for visualizing employee salary trends (e.g., bar charts).  

8. **Secure Backend**  
   - JWT token-based API route protection with middleware for role verification.  

9. **Comprehensive Error Handling**  
   - Notifications for form validation errors, authentication events, and CRUD operations using SweetAlert.

10. **Optimized Data Fetching with TanStack Query**  
    - Fast and efficient data fetching and caching for a seamless user experience.


---

## 🔑 Key Features  

1. **Home Page**  
   - Responsive layout with an engaging banner, services, testimonials, and more.
   - Accessible **Contact Us** page with a feedback form and company information.  

2. **Authentication**  
   - **Email & Password-based registration** with Firebase and Firebase errors handled using custom toasts.  
   - Role-based dropdown for `Employee` and `HR`. Admins can only be added via the backend.  
   - **Social Login:** Google option available 
   - Password validations: minimum 6 characters, one capital letter, one special character.  

3. **Role-Specific Dashboards**
   - **Employee Dashboard**  
     - `/work-sheet`: Task log with an editable table for **task type**, **hours worked**, and **date**.  
     - `/payment-history`: Paginated salary transaction history sorted by default (most recent first).  

   - **HR Dashboard**  
     - `/employee-list`: Manage employees (verify users, pay salaries). Salary payments include duplicate check logic.
     - `/details/:slug`: Detailed employee profile with bar chart (Salary vs. Month).  
     - `/progress`: Track employee workflows by filtering tasks based on name/month.

   - **Admin Dashboard**  
     - `/all-employee-list`: Manage employee/HR roles, salaries (adjust upwards only), and employment status (e.g., firing employees).  
     - `/payroll`: Process salary payment requests with one-click transactions for verified employees

4. **Modern Data Handling**
   - **TanStack Query**: Efficient data caching for all GET requests.

5. **Responsive Design**  
   - Fully optimized for mobile, tablet, and desktop views, ensuring accessibility for all.  

---

## ⚙️ Tech Stack  

- **Frontend:** React, Tailwind, rechart, TanStack Query, React DatePicker  
- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Authentication:** Firebase Authentication  
- **File Storage:** Image Upload via **imgbb**  

---

## 🚀 Live Demo  

- **Frontend Live Site:** [View Here](https://management-system-5898a.web.app/)  

---

## 📜 Instructions to Run Locally  

### Prerequisites  
1. Install **Node.js** 
2. Clone the repositories.  

   ```bash
   git clone https://github.com/ahasan-ullah/Management-System-Client.git
   git clone https://github.com/ahasan-ullah/Management-System-Server.git


### Admin Credentials 
1. Email: admin@admin.com
2. Password: Admin@0