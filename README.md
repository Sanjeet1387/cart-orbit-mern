<h1 align="center">🛒 CartOrbit – MERN Stack E-Commerce Platform</h1>

<p align="center">
A full-featured E-commerce web application built using the <b>MERN Stack</b> (MongoDB, Express.js, React.js, Node.js).
</p>
<p align="center">
It provides a complete online shopping experience with secure authentication, role-based access control, product filtering, PayPal payment integration, and an admin dashboard for managing products, users, and orders.
</p>

<hr/>

<h2>🚀 Features</h2>

<h3>👤 User Features</h3>
<ul>
  <li>User Registration & Login (JWT Authentication)</li>
  <li>Browse Products by Category (Men, Women, Kids, Accessories)</li>
  <li>Search Products by Name</li>
  <li>Filter Products by Price, Brand, Category</li>
  <li>Product Details Page</li>
  <li>Add to Cart / Remove from Cart</li>
  <li>Cart Management</li>
  <li>Checkout System</li>
  <li>PayPal Payment Integration</li>
  <li>Order History</li>
  <li>Review & Rating System</li>
  <li>Responsive UI</li>
</ul>

<h3>🛠️ Admin Features</h3>
<ul>
  <li>Admin Dashboard</li>
  <li>Add / Edit / Delete Products</li>
  <li>Upload Product Images (Cloudinary)</li>
  <li>Manage Orders</li>
  <li>Manage Users</li>
  <li>Role-Based Access Control (Admin/User)</li>
  <li>Banner Management</li>
</ul>

<hr/>

<h2>🧰 Tech Stack</h2>

<table>
<tr>
<th>Frontend</th>
<th>Backend</th>
<th>Database</th>
<th>Payment</th>
<th>Cloud</th>
</tr>
<tr>
<td>React.js (Vite)</td>
<td>Node.js</td>
<td>MongoDB</td>
<td>PayPal</td>
<td>Cloudinary</td>
</tr>
<tr>
<td>Redux Toolkit</td>
<td>Express.js</td>
<td>Mongoose</td>
<td>PayPal SDK</td>
<td>Image Storage</td>
</tr>
<tr>
<td>Tailwind CSS</td>
<td>JWT Auth</td>
<td>-</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>React Router</td>
<td>Bcrypt</td>
<td>-</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>Axios</td>
<td>Multer</td>
<td>-</td>
<td>-</td>
<td>-</td>
</tr>
</table>

<hr/>

<h2>📂 Project Structure</h2>

<pre>
CartOrbit-MERN/
│
├── client/                     # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── config/
│   │   ├── pages/
│   │   ├── store/ (Redux)
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server/                     # Backend (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── helpers/
│   └── server.js
│
└── README.md
</pre>

<hr/>

<h2>🔐 Authentication & Authorization</h2>
<ul>
  <li>JWT-based Authentication</li>
  <li>Role-Based Access Control</li>
  <li>Protected Admin Routes</li>
  <li>Password Hashing using Bcrypt</li>
  <li>HTTP-only Cookies for Security</li>
</ul>

<hr/>

<h2>💳 Payment Integration</h2>
<ul>
  <li>PayPal Checkout Integration</li>
  <li>Order Creation & Payment Capture</li>
  <li>Payment Status Stored in MongoDB</li>
  <li>Secure Payment Flow</li>
</ul>

<hr/>

<h2>🗄️ Database Models</h2>
<ul>
  <li>User Model</li>
  <li>Product Model</li>
  <li>Order Model</li>
  <li>Review Model</li>
  <li>Cart Model</li>
</ul>

<p><b>MongoDB</b> is used as the primary database with <b>Mongoose ODM</b>.</p>

<hr/>

<h2>⚙️ Installation & Setup</h2>

<h3>1️⃣ Clone Repository</h3>

<pre>
git clone https://github.com/Sanjeet1387/cart-orbit-mern
cd cart-orbit-mern
</pre>

<h3>2️⃣ Setup Server</h3>

<pre>
cd server
npm install
npm run dev
</pre>

<h3>3️⃣ Setup Client</h3>

<pre>
cd client
npm install
npm run dev
</pre>

<hr/>

<h2>🌐 Environment Variables</h2>

<p>Create a <b>.env</b> file in the server folder and add:</p>

<pre>
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret

PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
</pre>

<hr/>

<h2>🔄 Application Flow</h2>

<pre>
User → Browse Products → Add to Cart → Checkout → PayPal Payment → Order Stored → Admin Manages Orders
</pre>

<hr/>

<h2>🎯 Future Improvements</h2>
<ul>
  <li>Wishlist Feature</li>
  <li>Email Notifications</li>
  <li>Coupon / Discount System</li>
  <li>Order Tracking System</li>
  <li>AI Product Recommendation</li>
  <li>Razorpay / Stripe Integration</li>
  <li>Progressive Web App (PWA)</li>
</ul>

<hr/>

<h2>👨‍💻 Author</h2>

<p>
<b>Sanjeet Kumar</b><br>
Full Stack MERN Developer<br>
GitHub: https://github.com/Sanjeet1387
</p>

<hr/>

<h2>⭐ Support</h2>
<p>If you like this project, please give it a star on GitHub!</p>
