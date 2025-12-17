# 🛍️ MERN E-Commerce Platform: `Try-mern`

## 🎯 Project Overview & Learning Goals

This project is a comprehensive, full-stack E-Commerce application built with the **MERN** (MongoDB, Express.js, React, Node.js) stack. It is designed not just as a functional marketplace, but as an advanced practice environment for mastering modern software engineering principles, including:

* **Microservices/Modular Architecture:** Structuring the backend for clear separation of concerns (e.g., authentication, product catalog, orders).
* **State Management Mastery:** Implementing scalable and predictable state logic using Redux Toolkit/Zustand.
* **Secure API Design:** Implementing robust authentication (JWT, OAuth), rate limiting, and input validation.
* **Deployment & DevOps:** Practicing containerization (Docker) and CI/CD pipelines.
* **Performance Optimization:** Focusing on fast loading times, efficient database indexing, and caching strategies.

## 🏗️ Architecture & Technology Stack

The platform is divided into three primary components: the **Frontend Client**, the **Backend API**, and the **Database**.

### **Frontend**

| Technology | Description |
| :--- | :--- |
| **React** | Core library for building the user interface. |
| **React Router v6** | Declarative routing for navigation. |
| **Redux Toolkit (RTK)** | **Advanced state management** including `createSlice` and **RTK Query** for efficient data fetching and caching. |
| **Tailwind CSS / Material-UI** | Component-based styling framework. |

### **Backend (API Server)**

| Technology | Description |
| :--- | :--- |
| **Node.js / Express.js** | The runtime environment and minimal web framework for the RESTful API. |
| **MongoDB** | NoSQL database for flexible and scalable data storage. |
| **Mongoose** | Elegant MongoDB object modeling for Node.js. |
| **JSON Web Tokens (JWT)** | Secure, state-less authentication mechanism. |
| **Bcrypt** | Hashing passwords for secure storage. |



[Image of a MERN Stack architecture diagram]


---

💡 Core Features Implemented

### Public/Guest Features
- Product listing and detailed product view.

- Product search, filtering, and pagination.

- Shopping cart functionality (saved in local storage/database).

- User (Authenticated) Features
- User registration and login.

- User profile management (update name, email, password).

- Placing orders and viewing order history.

- Integration with PayPal/Stripe for payment processing.

### Admin Features
- Product Management: CRUD operations on products (create, read, update, delete).

- User Management: View, edit, or delete users.

- Order Management: Mark orders as delivered/paid, view sales reports.

📝 License
Distributed under the MIT License.


# E-commerce Database Schema (BCNF Compliant)

This schema represents the core transactional tables for an e-commerce platform, normalized to Boyce-Codd Normal Form (BCNF) for data integrity and minimal redundancy.

## 1. User Table (Customer and Authentication Data)

| Column Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **user_id** | `INT` | **PK**, `AUTO_INCREMENT` | Unique customer identifier. |
| first_name | `VARCHAR(100)` | `NOT NULL` | User's first name. |
| last_name | `VARCHAR(100)` | `NOT NULL` | User's last name. |
| email | `VARCHAR(255)` | `NOT NULL`, **Unique** | Primary email (used for login). |
| phone_number | `VARCHAR(20)` | `Unique` | Contact phone number. |
| password_hash | `VARCHAR(255)` | `NOT NULL` | Securely stored password hash. |
| created_at | `DATETIME` | `NOT NULL` | Account creation timestamp. |
| is_active | `BOOLEAN` | `DEFAULT TRUE` | Account status. |

## 2. Category Table (Product Taxonomy)

| Column Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **category_id** | `INT` | **PK**, `AUTO_INCREMENT` | Unique category identifier. |
| name | `VARCHAR(100)` | `NOT NULL`, **Unique** | Category name. |
| slug | `VARCHAR(100)` | `NOT NULL`, **Unique** | URL-friendly identifier. |
| parent_category_id | `INT` | **FK** to `Category(category_id)` | Link for hierarchical structure (NULL for root). |

## 3. Product Table (Core Catalog)

| Column Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **product_id** | `INT` | **PK**, `AUTO_INCREMENT` | Unique product identifier. |
| name | `VARCHAR(255)` | `NOT NULL` | Full name of the product. |
| description | `TEXT` | | Detailed product description. |
| base_price | `DECIMAL(10, 2)` | `NOT NULL`, `>= 0` | The standard list price. |
| category_id | `INT` | **FK** to `Category(category_id)` | Primary category link. |
| sku | `VARCHAR(50)` | `NOT NULL`, **Unique** | Stock Keeping Unit (SKU). |
| is_available | `BOOLEAN` | `DEFAULT TRUE` | Indicates if the product is purchasable. |

## 4. Order Table (Header Data)

| Column Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **order_id** | `INT` | **PK**, `AUTO_INCREMENT` | Unique order transaction ID. |
| user_id | `INT` | **FK** to `User(user_id)`, `NOT NULL` | The customer who placed the order. |
| order_date | `DATETIME` | `NOT NULL` | Timestamp of order placement. |
| status | `VARCHAR(50)` | `NOT NULL` | Order lifecycle status. |
| total_amount | `DECIMAL(10, 2)` | `NOT NULL`, `>= 0` | Final computed cost of the entire order. |
| shipping_address_id | `INT` | **FK** to `Address(address_id)` | The specific address used for delivery. |
| payment_method | `VARCHAR(50)` | `NOT NULL` | Method of payment used. |

## 5. Order_Item Table (Line-Item Data)

| Column Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **order_item_id** | `INT` | **PK**, `AUTO_INCREMENT` | Unique line item identifier. |
| order_id | `INT` | **FK** to `Order(order_id)`, `NOT NULL` | Links the item to its parent order. |
| product_id | `INT` | **FK** to `Product(product_id)`, `NOT NULL` | The product purchased. |
| quantity | `INT` | `NOT NULL`, `>= 1` | Number of units purchased in this line item. |
| price_at_purchase | `DECIMAL(10, 2)` | `NOT NULL`, `>= 0` | The historical price when the order was placed. |
| discount_applied | `DECIMAL(10, 2)` | `DEFAULT 0.00` | Line-item discount value. |