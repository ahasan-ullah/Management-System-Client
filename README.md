# Employee Management System  

A comprehensive web-based solution to streamline the management of employee workflows, salaries, and organizational data. This application caters to distinct user roles: **Admins**, **HRs**, and **Employees**, providing them tailored functionality to ensure a smooth workflow.

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

- **Frontend Live Site:** [View Here](https://example.com)  

---

## 📜 Instructions to Run Locally  

### Prerequisites  
1. Install **Node.js** 
2. Clone the repositories.  

   ```bash
   git clone <client_repo_url>
   git clone <server_repo_url>


### Admin Credentials 
1. Email: admin@admin.com
2. Password: Admin@0