# 🚀 Backend API Endpoints - localhost:5000

## Base URL
```
http://localhost:5000/api
```

---

## 📦 Product Endpoints
**Base:** `/api/products`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| **GET** | `/` | ❌ | Get all products with filters (category, search, pagination) |
| **GET** | `/:id` | ❌ | Get single product by ID |
| **POST** | `/` | ✅ Admin | Create new product |
| **PUT** | `/:id` | ✅ Admin | Update product |
| **DELETE** | `/:id` | ✅ Admin | Delete product |

### Example Requests
```bash
# Get all products
GET http://localhost:5000/api/products

# Get products by category
GET http://localhost:5000/api/products?category=Electronics&page=1&limit=12

# Search products
GET http://localhost:5000/api/products?search=laptop

# Get single product
GET http://localhost:5000/api/products/65f8a1b2c3d4e5f6g7h8i9j0
```

---

## 👤 User Authentication
**Base:** `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| **POST** | `/register` | ❌ | Register new user |
| **POST** | `/login` | ❌ | User login |
| **GET** | `/profile` | ✅ | Get user profile |
| **PUT** | `/profile` | ✅ | Update user profile |
| **POST** | `/logout` | ✅ | Logout user |

### Example Requests
```bash
# Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}

# Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "securepass123"
}

# Get Profile (requires token in headers)
GET http://localhost:5000/api/auth/profile
Authorization: Bearer <jwt_token>
```

---

## 🛒 Shopping Cart
**Base:** `/api/cart`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| **GET** | `/` | ✅ | Get user's cart |
| **POST** | `/add` | ✅ | Add product to cart |
| **PUT** | `/update/:itemId` | ✅ | Update cart item quantity |
| **DELETE** | `/remove/:itemId` | ✅ | Remove item from cart |
| **DELETE** | `/clear` | ✅ | Clear entire cart |

### Example Requests
```bash
# Get cart
GET http://localhost:5000/api/cart
Authorization: Bearer <jwt_token>

# Add to cart
POST http://localhost:5000/api/cart/add
Authorization: Bearer <jwt_token>
Content-Type: application/json
{
  "productId": "65f8a1b2c3d4e5f6g7h8i9j0",
  "quantity": 2
}

# Update cart item
PUT http://localhost:5000/api/cart/update/65f8a1b2c3d4e5f6g7h8i9j0
Authorization: Bearer <jwt_token>
Content-Type: application/json
{
  "quantity": 5
}

# Remove from cart
DELETE http://localhost:5000/api/cart/remove/65f8a1b2c3d4e5f6g7h8i9j0
Authorization: Bearer <jwt_token>
```

---

## 📋 Orders
**Base:** `/api/orders`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| **POST** | `/` | ✅ | Create new order |
| **GET** | `/` | ✅ | Get user's orders |
| **GET** | `/:id` | ✅ | Get order details |
| **PUT** | `/:id` | ✅ | Update order status |

### Example Requests
```bash
# Create order
POST http://localhost:5000/api/orders
Authorization: Bearer <jwt_token>
Content-Type: application/json
{
  "shippingAddress": "123 Main St, New York, NY 10001",
  "paymentMethod": "card",
  "notes": "Please deliver between 9-5"
}

# Get user's orders
GET http://localhost:5000/api/orders
Authorization: Bearer <jwt_token>

# Get order details
GET http://localhost:5000/api/orders/65f8a1b2c3d4e5f6g7h8i9j0
Authorization: Bearer <jwt_token>
```

---

## 👨‍💼 Admin Panel
**Base:** `/api/admin`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| **POST** | `/auth/login` | ❌ | Admin login |
| **GET** | `/dashboard` | ✅ Admin | Get dashboard stats |
| **GET** | `/products` | ✅ Admin | Get all products |
| **POST** | `/products` | ✅ Admin | Create product |
| **PUT** | `/products/:id` | ✅ Admin | Update product |
| **DELETE** | `/products/:id` | ✅ Admin | Delete product |
| **GET** | `/orders` | ✅ Admin | Get all orders |
| **PUT** | `/orders/:id/status` | ✅ Admin | Update order status |

### Example Requests
```bash
# Admin Login
POST http://localhost:5000/api/admin/auth/login
Content-Type: application/json
{
  "email": "admin@premierproducts.com",
  "password": "adminpassword"
}

# Get Dashboard Stats
GET http://localhost:5000/api/admin/dashboard
Authorization: Bearer <admin_jwt_token>

# Get All Products (Admin view)
GET http://localhost:5000/api/admin/products
Authorization: Bearer <admin_jwt_token>

# Create Product
POST http://localhost:5000/api/admin/products
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "image": "https://example.com/image.jpg",
  "stockQuantity": 50,
  "inStock": true
}
```

---

## 📧 Contact Form
**Base:** `/api/contact`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| **POST** | `/` | ❌ | Send contact form email |

### Example Request
```bash
POST http://localhost:5000/api/contact
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about products",
  "message": "I have a question about your products..."
}
```

---

## 🔐 Authentication
### Token Header
All authenticated endpoints require:
```
Authorization: Bearer <jwt_token>
```

### Response Format
```json
{
  "success": true,
  "message": "Success message",
  "data": { }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 🧪 Testing with cURL

### Get all products
```bash
curl -X GET "http://localhost:5000/api/products"
```

### Register user
```bash
curl -X POST "http://localhost:5000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST "http://localhost:5000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get cart (requires token)
```bash
curl -X GET "http://localhost:5000/api/cart" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Contact form
```bash
curl -X POST "http://localhost:5000/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Support needed",
    "message": "I need help with my order"
  }'
```

---

## 📊 Environment Variables
Located in `server/.env`:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
```

---

## ✅ Running the Backend

### Development
```bash
cd server
npm install
npm start
# Server runs on http://localhost:5000
```

### Frontend will connect to
```
http://localhost:5000/api
```
(Configured in frontend/.env via `VITE_API_URL`)

---

**Last Updated:** 2024
**Status:** ✅ Running on Port 5000
