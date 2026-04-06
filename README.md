🛒 CartOrbit – MERN Stack E-Commerce Platform

CartOrbit is a full-featured E-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). 
It provides a complete online shopping experience with secure authentication, role-based access, product filtering, PayPal payment integration, 
and an admin dashboard for managing products, users, and orders.

🚀 Features:
👤 User Features
User Registration & Login (JWT Authentication)
Browse Products by Category (Men, Women, Kids, Accessories)
Search Products by Name
Filter Products by Price, Brand, Category
Product Details Page
Add to Cart / Remove from Cart
Checkout System
PayPal Payment Integration
Order History
Review & Rating System
Responsive UI

🛠️ Admin Features
Admin Dashboard
Add / Edit / Delete Products
Upload Product Images (Cloudinary)
Manage Orders
Manage Users
Role-Based Access Control (Admin/User)
Banner Management for Homepage


🧰 Tech Stack
Frontend:
React.js (Vite)
Redux Toolkit (State Management)
Tailwind CSS (Styling)
React Router DOM (Routing)
Axios (API Calls)
Radix UI + Lucide Icons (UI Components)
Sonner (Toast Notifications)

Backend:
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
Bcrypt.js (Password Hashing)
Multer (File Upload)
Cloudinary (Image Storage)
PayPal Payment Gateway


📂 Project Structure
CartOrbit-MERN/
│
├── client/
|       ├── src                # Frontend (React)
│            ├── components/
|            ├── assests/
|            ├── config/
│            ├── pages/
│            ├── store(redux)/
│            └── utils/
|            └── app.jsx/
|            └── main.jsx/
│
├── server/                 # Backend (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── helpers/
│   └── server.js
│
└── README.md

🔐 Authentication & Authorization
JWT-based Authentication
Role-Based Access Control
Protected Routes for Admin
Secure Password Hashing using Bcrypt
HTTP-only Cookies for Token Storage

💳 Payment Integration
PayPal Checkout Integration
Order Creation & Payment Capture
Payment Status Stored in MongoDB
Secure Payment Flow

🗄️ Database Models
User Model
Product Model
Order Model
Review Model
Cart Model

=> MongoDB is used as the primary database with Mongoose ODM.

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/Sanjeet1387/cart-orbit-mern
cd cart-orbit-mern

2️⃣ Setup Server
cd server
npm install
npm run dev

3️⃣ Setup Client
cd client
npm install
npm run dev

🌐 Environment Variables

Create a .env file in the server folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret

PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

🔄 Application Flow
User → Browse Products → Add to Cart → Checkout → PayPal Payment → Order Stored → Admin Manages Orders

🎯 Future Improvements
Wishlist Feature
Email Notifications
Coupon / Discount System
Order Tracking System
AI Product Recommendation System
Razorpay / Stripe Integration
PWA (Progressive Web App)

👨‍💻 Author
Sanjeet Kumar
Full Stack MERN Developer
