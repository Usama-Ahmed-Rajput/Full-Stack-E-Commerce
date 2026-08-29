# USAMA MOBILES — Full-Stack E-Commerce Web Application

> **Usama Mobiles** is an authentic mobile electronics e-commerce web application built for Pakistan. This project serves as a comprehensive academic assignment demonstration covering all 9 required computer science / web development assignment topics using modern production technologies: **React 18**, **Vite**, **Redux Toolkit**, **Context API**, **Node.js**, **Express.js**, **MongoDB (Mongoose)**, **Passport.js JWT**, and **bcryptjs**.

---

## 📋 Table of Contents
- [Usama Mobiles Project Overview](#usama-mobiles-project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Directory Architecture](#project-directory-architecture)
- [Installation & Local Setup](#installation--local-setup)
- [Database Seeding](#database-seeding)
- [Academic Concept Explanations](#academic-concept-explanations)
  - [Topic 2: ReactJS Introduction & Why React/Vite](#topic-2-reactjs-introduction--why-reactvite)
  - [Topic 4: State vs Props & Event Architecture](#topic-4-state-vs-props--event-architecture)
  - [Topic 5: Effects & Data Fetching (useEffect)](#topic-5-effects--data-fetching-useeffect)
  - [Topic 6: Redux Toolkit vs Context API](#topic-6-redux-toolkit-vs-context-api)
- [Explicit Mapping of the 9 Assignment Topics](#explicit-mapping-of-the-9-assignment-topics)
- [Express REST API Documentation](#express-rest-api-documentation)
- [Frontend Deployment through Vercel](#frontend-deployment-through-vercel)
- [Viva & Presentation Quick Reference](#viva--presentation-quick-reference)

---

## 📱 Usama Mobiles Project Overview

**Usama Mobiles** is a full-stack e-commerce portal tailored for mobile phone enthusiasts and shoppers in Pakistan. Products are listed in Pakistani Rupees (**PKR / Rs.**), featuring top categories:
- 📱 **Smartphones** (iPhone 15 Pro Max, Galaxy S24 Ultra, Redmi Note 13 Pro+, Infinix Note 40 Pro)
- 💻 **Tablets & iPads** (iPad Air M2, Galaxy Tab S9 FE)
- ⌚ **Smart Watches** (Apple Watch Series 9, Galaxy Watch 6 Classic)
- 🎧 **Wireless Earbuds** (AirPods Pro 2, Audionic Airbud 550)
- ⚡ **Fast Chargers** (Anker 20W PowerPort, Baseus 65W GaN5)
- 🔋 **Power Banks** (Anker 20,000mAh 20W, Joyroom MagSafe 10K)
- 🛡️ **Cases & Accessories** (Spigen Tough Armor, Nillkin Shield, Anker PowerLine III)

---

## ✨ Key Features

1. **Authentic E-Commerce Catalog & Search**:
   - Live regex keyword search, multi-category selection, min/max price range filtering, sort by price (low/high), rating, and newest.
   - Dynamic pagination with customizable items per page.
2. **Redux Toolkit Shopping Cart**:
   - Persistent cart synchronized with `localStorage`.
   - Add item, remove item, increase quantity, decrease quantity, clear cart.
   - Live calculation of subtotal, flat shipping fee, and free delivery thresholds in **PKR**.
3. **User Authentication & Protected Checkout**:
   - User registration & login with password security (bcrypt).
   - JWT stored in `httpOnly` cookie with fallback strategy handled via **Passport.js**.
   - Auth state restoration on application start (`GET /api/auth/me`).
   - Protected routes (`ProtectedRoute`) preventing unauthenticated checkout access.
4. **Order Placement & History Tracking**:
   - Cash on Delivery (COD) checkout process with shipping address validation.
   - Real-time stock deduction on successful order placement.
   - My Orders dashboard with status badges (*Pending*, *Processing*, *Shipped*, *Delivered*, *Cancelled*).
5. **Comprehensive Admin Management Dashboard**:
   - Restricted access via `AdminRoute` and backend authorization middleware (`requireAdmin`).
   - Live revenue metrics, total orders, pending orders, product count, and user count.
   - Full CRUD operations for store products (Create, Read, Update, Delete).
   - Real-time order status updates via Admin dropdown.
6. **Dark & Light Mode (Context API)**:
   - Dedicated `ThemeContext` using React `createContext` and `useContext`.
   - Theme toggle persisted in `localStorage` without mutating Redux state.
7. **Production-Ready & Vercel Deployable**:
   - Configured with `VITE_API_URL` environment variables and `vercel.json` SPA rewrite rules.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite |
| **Routing** | React Router v6 |
| **Global App State** | Redux Toolkit (`@reduxjs/toolkit`, `react-redux`, `createAsyncThunk`) |
| **UI Global State** | Context API (`ThemeContext`, `ToastContext`) |
| **Design System** | Custom Vanilla CSS with CSS Custom Variables (Light/Dark mode) |
| **Backend Framework** | Node.js, Express.js (RESTful Architecture) |
| **Database & ODM** | MongoDB, Mongoose |
| **Authentication** | Passport.js (JWT Strategy), `jsonwebtoken`, `bcryptjs` |
| **Security** | Helmet HTTP Headers, `cookie-parser`, CORS, `httpOnly` cookies |

---

## 📁 Project Directory Architecture

```text
Full Stack Assignment/
├── client/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/         # Navbar, Footer, Button, Input, Modal, Toast, Loader, Skeleton, EmptyState, Pagination
│   │   │   ├── product/        # ProductCard, ProductGrid, CategoryCard
│   │   │   └── routing/        # ProtectedRoute, AdminRoute
│   │   ├── context/            # ThemeContext.jsx, ToastContext.jsx
│   │   ├── pages/              # Home, Products, ProductDetail, Cart, Checkout, Login, Register, Orders, OrderDetail, AdminDashboard, AdminProducts, AdminProductForm, AdminOrders, AdminUsers
│   │   ├── redux/
│   │   │   ├── slices/         # authSlice.js, productSlice.js, cartSlice.js, orderSlice.js
│   │   │   └── store.js
│   │   ├── utils/              # api.js, formatters.js
│   │   ├── App.jsx
│   │   ├── index.css           # Global design system & theme variables
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
├── server/
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── passport.js         # Passport JWT strategy configuration
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js   # Passport authenticate & requireAdmin
│   │   └── errorMiddleware.js  # Centralized error handler & 404
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   ├── generateToken.js   # JWT cookie utility
│   │   └── seedData.js        # Seed database script
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── package.json
└── README.md
```

---

## 🚀 Installation & Local Setup

### Step 1: Clone or Navigate to Directory
Ensure you are inside `Full Stack Assignment`.

### Step 2: Install Server & Client Dependencies
Run from workspace root:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 3: Configure Environment Variables
1. **Server Environment**: `server/.env`
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/usama_mobiles
   JWT_SECRET=usamamobiles_jwt_secret_key_change_in_production
   JWT_EXPIRE=30d
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```
2. **Client Environment**: `client/.env`
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

---

## 🗄️ Database Seeding

Populate the database with **18 realistic Usama Mobiles products** (smartphones, tablets, earbuds, power banks, chargers) and pre-configured test users:

Run the seed command:
```bash
cd server
npm run seed
```

### Pre-Configured Test Credentials for Viva/Demo:
- **Admin Account**:
  - Email: `admin@usamamobiles.pk`
  - Password: `admin123`
  - Access: Full access to `/admin` dashboard, product CRUD, order status management.
- **Customer Account**:
  - Email: `customer@usamamobiles.pk`
  - Password: `customer123`
  - Access: Shopping, checkout, placing orders, viewing order history.

---

## 💻 Running Development Servers

1. **Start Backend Server**:
   ```bash
   cd server
   npm run dev
   # Runs on http://localhost:5000
   ```

2. **Start Frontend Vite Server**:
   ```bash
   cd client
   npm run dev
   # Runs on http://localhost:5173
   ```

---

## 🎓 Academic Concept Explanations

### Topic 2: ReactJS Introduction & Why React/Vite
- **What is React?**: React is an open-source JavaScript library developed by Meta for building dynamic, interactive user interfaces using reusable component architecture.
- **React vs Plain JavaScript**: Plain JavaScript requires manual DOM manipulation (`document.createElement`, `innerHTML`), which becomes tedious and error-prone in large applications. React introduces a **Virtual DOM** that efficiently recalculates and updates only changed elements.
- **Library vs Framework**: A framework (like Angular or ASP.NET) enforces a rigid application architecture, routing, and HTTP modules. A library (like React) focuses specifically on rendering views and allows developers to pick optimal tools for state (Redux) and routing (React Router).
- **Why React is used in Usama Mobiles**: It provides modular components (`ProductCard`, `ProductGrid`, `Navbar`), efficient state management, and seamless single-page navigation without full page refreshes.
- **Why Vite is used**: Vite is a next-generation frontend build tool that leverages native ES modules in development, offering instant server start, extremely fast Hot Module Replacement (HMR), and optimized Rollup production builds.

### Topic 4: State vs Props & Event Architecture
- **State**: Data that is owned and managed internally by a component. It is dynamic and can change over time in response to user events (e.g., `quantity` inside `ProductDetail.jsx`, `formData` inside `Login.jsx`). Changing state triggers a re-render of the component.
- **Props**: Short for properties, props are read-only data passed from a parent component down to a child component (e.g., `ProductGrid` passing `product` prop to `ProductCard`). Child components cannot mutate props directly.
- **Event Architecture**: React uses synthetic events (`onClick`, `onChange`, `onSubmit`, `onKeyDown`) that wrap native browser events for cross-browser consistency. Controlled inputs bind `value={state}` and handle modifications via `onChange={(e) => setState(e.target.value)}`.

### Topic 5: Effects & Data Fetching (`useEffect`)
- **What is `useEffect`?**: `useEffect` is a React hook that allows components to perform side effects (data fetching, subscribing to events, DOM mutations, local storage updates) after rendering.
- **Dependency Array**:
  - `useEffect(() => {}, [])`: Runs **once** when component mounts (used for initial product fetch or auth restoration).
  - `useEffect(() => {}, [category, page])`: Runs on mount AND whenever `category` or `page` state changes.
  - Omitted array: Runs after **every** render.
- **Cleanup Function**: Returning a function inside `useEffect` (e.g., `window.removeEventListener('keydown', handleKeyDown)`) cleans up event listeners or timers when the component unmounts to prevent memory leaks.

### Topic 6: Redux Toolkit vs Context API
- **Redux Toolkit**: Ideal for **complex application state** (Cart items, authentication session, product catalog, order transactions) that involves asynchronous server operations, state slices (`createSlice`), async thunks (`createAsyncThunk`), and strict state mutation rules via Immer.
- **Context API (`ThemeContext`)**: Ideal for **simple, global UI-level state** (such as Light/Dark mode preference) that does not require heavy middleware or complex reducer logic. Context API passes data directly down the component tree without prop drilling.

---

## 🎯 Explicit Mapping of the 9 Assignment Topics

| Topic Requirement | Implementation Location in Project | Description |
| :--- | :--- | :--- |
| **TOPIC 1 — Redux & Redux Toolkit with Thunk** | `client/src/redux/store.js`, `slices/` (`authSlice.js`, `productSlice.js`, `cartSlice.js`, `orderSlice.js`) | Store created with `configureStore`. Slices created with `createSlice` & `createAsyncThunk` (`fetchProducts`, `loginUser`, `createOrder`). Cart actions: add, remove, increase, decrease, clear, and selectors for PKR totals. |
| **TOPIC 2 — ReactJS Introduction & React Project** | `client/src/main.jsx`, `App.jsx`, `vite.config.js` | Created with Vite + React 18, functional components, `React.StrictMode`, React Router v6. Comprehensive theoretical section included in README. |
| **TOPIC 3 — Components, Props and JSX** | `client/src/components/common/`, `components/product/` | Reusable modular components (`ProductCard`, `ProductGrid`, `Button`, `Input`, `Modal`, `Skeleton`, `EmptyState`, `Pagination`). Props destructuring, parent-to-child flow, callback props, list `.map()`, unique keys, conditional rendering. |
| **TOPIC 4 — State, Events and Forms** | `pages/Login.jsx`, `Register.jsx`, `Checkout.jsx`, `AdminProductForm.jsx` | `useState` for local state (mobile drawer, search query, quantity selector). Controlled input forms with validation (`onClick`, `onChange`, `onSubmit`). Clear error messages. |
| **TOPIC 5 — Effects and Data Fetching** | `pages/Home.jsx`, `Products.jsx`, `ProductDetail.jsx`, `App.jsx` | `useEffect` used for initial catalog loading, product details by ID, auth state restoration (`fetchCurrentUser`), and event listener cleanup in `Modal.jsx`. |
| **TOPIC 6 — State Management — Context API** | `client/src/context/ThemeContext.jsx` | Created `ThemeContext` with `createContext` and `useContext`. Manages Light & Dark theme persisted in `localStorage`. Wrapped at app root. |
| **TOPIC 7 — Frontend Deployment through Vercel** | `client/vercel.json`, `client/.env.example`, `vite.config.js` | Configured `VITE_API_URL`, production Vite build (`npm run build`), SPA rewrite rules in `vercel.json`, and step-by-step Vercel deployment guide. |
| **TOPIC 8 — ExpressJS** | `server/server.js`, `routes/`, `controllers/`, `models/` | Node.js + Express REST API using MVC pattern (`authController`, `productController`, `orderController`, `adminController`). Centralized error handler, proper HTTP status codes (200, 201, 400, 401, 403, 404, 409, 500), MongoDB CRUD. |
| **TOPIC 9 — Security and Authentication** | `server/middleware/authMiddleware.js`, `config/passport.js`, `models/User.js` | Password hashing with `bcryptjs`, JWT token stored in `httpOnly` cookie, **Passport.js JWT Strategy** authentication, Helmet security headers, Role-based authorization (`user` vs `admin`). |

---

## 📡 Express REST API Documentation

### Auth Endpoints (`/api/auth`)
- `POST /api/auth/register` — Register new user (hashing password via bcrypt)
- `POST /api/auth/login` — Authenticate user & issue httpOnly JWT cookie
- `POST /api/auth/logout` — Clear auth cookie
- `GET /api/auth/me` — Return current authenticated user profile

### Product Endpoints (`/api/products`)
- `GET /api/products` — Fetch products with search regex, category, min/max price, sort, pagination
- `GET /api/products/:id` — Fetch single product details
- `POST /api/products` — Admin create product
- `PUT /api/products/:id` — Admin update product
- `DELETE /api/products/:id` — Admin delete product

### Order Endpoints (`/api/orders`)
- `POST /api/orders` — Create new order (deducts product stock)
- `GET /api/orders/my-orders` — Get current user's order history
- `GET /api/orders/:id` — Get single order details (user or admin)

### Admin Endpoints (`/api/admin`)
- `GET /api/admin/stats` — Store dashboard statistics (revenue, total orders, pending, users)
- `GET /api/admin/users` — List all registered users
- `GET /api/admin/orders` — List all customer orders
- `PUT /api/admin/orders/:id/status` — Update order status (*Pending*, *Processing*, *Shipped*, *Delivered*, *Cancelled*)

---

## 🌐 Frontend Deployment through Vercel

The frontend of **Usama Mobiles** is completely optimized for seamless Vercel deployment:

### Deployment Steps:
1. **Push Repository to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial Usama Mobiles Full-Stack Commit"
   git push origin main
   ```
2. **Import into Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com).
   - Click **Add New** → **Project**.
   - Select your GitHub repository.
3. **Configure Project Settings**:
   - **Root Directory**: Select `client`.
   - **Framework Preset**: `Vite`.
   - **Build Command**: `npm run build` (or `vite build`).
   - **Output Directory**: `dist`.
4. **Environment Variables**:
   - Add variable: `VITE_API_URL`
   - Value: `https://your-deployed-backend.onrender.com/api` (or production API endpoint).
5. **Deploy**:
   - Click **Deploy**. Vercel will build the SPA and output a production URL.

---

## 💡 Viva & Presentation Quick Reference

When presenting **Usama Mobiles** during your viva examination, demonstrate the following flows:

1. **Demonstrate Redux Toolkit (Topic 1)**:
   - Open browser developer tools → Redux DevTools.
   - Click **Add to Cart** on a product. Show `cart/addToCart` dispatch updating state and recalculating subtotal in PKR.
2. **Demonstrate Theme Context API (Topic 6)**:
   - Click the Sun/Moon icon in the Navbar. Show `data-theme` changing on `<html>` and persisting in `localStorage` independent of Redux.
3. **Demonstrate Data Fetching & Search (Topics 3, 4, 5)**:
   - Type "iPhone" or select category "Earbuds". Show how `useEffect` triggers `fetchProducts` with query parameters.
4. **Demonstrate Security & Roles (Topic 9)**:
   - Login with `customer@usamamobiles.pk`. Show that navigating to `/admin` automatically redirects away.
   - Logout and login with `admin@usamamobiles.pk`. Navigate to `/admin` to show the Admin Control Center, product creation form, and order status updater.
