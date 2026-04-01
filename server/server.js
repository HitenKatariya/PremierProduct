require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add request logging
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});


// Build MongoDB connection URI
// Priority:
// 1. Use full MONGODB_URI if provided (e.g. copy-pasted from Atlas)
// 2. Otherwise, construct SRV URI from individual parts
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME || "PremierProducts";
const DB_CLUSTER = process.env.DB_CLUSTER || "premierproducts.sz7r7g5";
const DB_APPNAME = process.env.DB_APPNAME || "PremierProducts";

const mongoURI = process.env.MONGODB_URI ||
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=${DB_APPNAME}`;

async function connectDB() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DB_NAME,
    });
    console.log("✅ MongoDB Atlas connected");
  } catch (err) {
    console.error("❌ MongoDB Atlas connection error:", err);
    process.exit(1);
  }
}

connectDB();

// API Routes
app.use("/api/users", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// Root endpoint - API Documentation
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Premier Products Backend API',
    version: '1.0.0',
    status: 'Running',
    port: PORT,
    endpoints: {
      products: {
        getAll: 'GET /api/products',
        getById: 'GET /api/products/:id',
        create: 'POST /api/products (admin)',
        update: 'PUT /api/products/:id (admin)',
        delete: 'DELETE /api/products/:id (admin)'
      },
      auth: {
        register: 'POST /api/users/register',
        login: 'POST /api/users/login',
        profile: 'GET /api/users/profile (auth)',
        updateProfile: 'PUT /api/users/profile (auth)'
      },
      cart: {
        getCart: 'GET /api/cart (auth)',
        addItem: 'POST /api/cart/add (auth)',
        updateItem: 'PUT /api/cart/update/:itemId (auth)',
        removeItem: 'DELETE /api/cart/remove/:itemId (auth)',
        clearCart: 'DELETE /api/cart/clear (auth)'
      },
      orders: {
        create: 'POST /api/orders (auth)',
        getOrders: 'GET /api/orders (auth)',
        getOrder: 'GET /api/orders/:id (auth)',
        updateStatus: 'PUT /api/orders/:id/status (auth)'
      },
      admin: {
        login: 'POST /api/admin/auth/login',
        dashboard: 'GET /api/admin/dashboard (admin)',
        getProducts: 'GET /api/admin/products (admin)',
        createProduct: 'POST /api/admin/products (admin)',
        updateProduct: 'PUT /api/admin/products/:id (admin)',
        deleteProduct: 'DELETE /api/admin/products/:id (admin)',
        getOrders: 'GET /api/admin/orders (admin)',
        updateOrderStatus: 'PUT /api/admin/orders/:id/status (admin)'
      },
      contact: {
        sendMessage: 'POST /api/contact'
      }
    },
    documentation: 'See API_ENDPOINTS.md for detailed documentation',
    frontend: 'http://localhost:5173',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: '✅ API is running',
    apiVersion: '1.0.0',
    availableRoutes: [
      '/api/users - Authentication',
      '/api/products - Product Catalog',
      '/api/cart - Shopping Cart',
      '/api/orders - Order Management',
      '/api/admin - Admin Panel',
      '/api/contact - Contact Form'
    ]
  });
});

const PORT = process.env.PORT || 5000;

// Global error handlers
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
