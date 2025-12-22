---
id: user-api
title: User API
sidebar_label: User API
---

# 👤 User API

This document describes the REST endpoints for **User management** in the system.

Base URL: `/api/users`

---

## Endpoints

### 1. Register User

`POST /api/users/register`

**Description:** Register a new user account.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| first_name | `string` | ✅ | User first name |
| last_name | `string` | ✅ | User last name |
| email | `string` | ✅ | User email address |
| password | `string` | ✅ | Password |

**Response (Success 201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user_id": "uuid",
    "email": "example@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```
**Response (Error 400/409):**
```json
{
  "success": false,
  "message": "User validation failed / Email already exists"
}
```
### 2. Get All Users

`GET /api/users`

**Description:** Retrieve a list of all users.

**Response (Success 200):**
```json
{
  "success": true,
  "data": [
    {
      "user_id": "uuid",
      "email": "example@example.com",
      "first_name": "John",
      "last_name": "Doe"
    }
  ]
}

```
### 3. Verify User

`GET /api/users/verify?token=<verification_token>`

**Description:** Verify a user account via email token.

**Query Parameters:**
| Name  | Type     | Required | Description                       |
| ----- | -------- | -------- | --------------------------------- |
| token | `string` | ✅        | Verification token sent via email |

**Response (Success 200):**
```json
{
  "success": true,
  "message": "User verified successfully"
}

```

### 4. Get User by ID

`GET /api/users/:id`

**Description:** Retrieve details of a single user by their ID.

**URL Parameters:**
| Name | Type     | Required | Description      |
| ---- | -------- | -------- | ---------------- |
| id   | `string` | ✅        | UUID of the user |

**Response (Success 200):**
```json
{
  "success": true,
  "data": {
    "user_id": "uuid",
    "email": "example@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}

```
**Response (Error 404):**

```json
{
  "success": false,
  "message": "User not found"
}

```

### 5. Delete User

`DELETE /api/users/:id`

**Description:** Delete a user by their ID.

**URL Parameters:**

| Name | Type     | Required | Description                |
| ---- | -------- | -------- | -------------------------- |
| id   | `string` | ✅        | UUID of the user to delete |

**Response (Success 200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}

```
**Response (Error 404):**
```json
{
  "success": false,
  "message": "User not found"
}

```