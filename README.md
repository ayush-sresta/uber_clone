# Uber Clone Backend API Documentation

## Authentication Endpoints

### Register User
Create a new user account.

**URL**: `/user/register`

**Method**: `POST`

**Request Body**:
```json
{
  "fullname": {
    "firstname": "string", // minimum 3 characters
    "lastname": "string"   // optional, minimum 3 characters if provided
  },
  "email": "string",      // valid email format
  "password": "string"    // minimum 6 characters
}
```

**Success Response**:
- **Code**: 201 Created
- **Content**:
```json
{
  "token": "jwt_token_string",
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string",
    // other user fields
  }
}
```

**Error Responses**:

- **Code**: 400 Bad Request
  - **Content**: Validation errors for invalid input
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "path": "email"
    }
  ]
}
```

- **Code**: 500 Internal Server Error
  - **Content**: Server error message
```json
{
  "message": "Something went wrong",
  "error": "error message"
}
```

**Required Fields**:
- firstname (minimum 3 characters)
- email (valid email format)
- password (minimum 6 characters)

**Optional Fields**:
- lastname (minimum 3 characters if provided)
### Login User

Authenticate an existing user.

**URL**: `/user/login`

**Method**: `POST`

**Request Body**:

```json
{
  "email": "string", // valid email format
  "password": "string" // minimum 6 characters
}
```

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "token": "jwt_token_string",
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"
    // other user fields
  }
}
```

**Error Responses**:

- **Code**: 400 Bad Request
  - **Content**: Validation errors for invalid input

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "path": "email"
    }
  ]
}
```

- **Code**: 401 Unauthorized
  - **Content**: Invalid credentials

```json
{
  "message": "Invalid email or password"
}
```

- **Code**: 500 Internal Server Error
  - **Content**: Server error message

```json
{
  "message": "Something went wrong",
  "error": "error message"
}
```

**Required Fields**:

- email (valid email format)
- password (minimum 6 characters)
### Get User Profile
Get the authenticated user's profile information.

**URL**: `/user/profile`

**Method**: `GET`

**Headers**:
```json
{
  "Authorization": "Bearer jwt_token_string"
}
```

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "_id": "string"
  // other user fields
}
```

**Error Responses**:
- **Code**: 401 Unauthorized
  - **Content**: Authentication error
```json
{
  "message": "Access denied. No token provided"
}
```

- **Code**: 500 Internal Server Error
  - **Content**: Server error message
```json
{
  "message": "Something went wrong",
  "error": "error message"
}
```

### Logout User
Logout the currently authenticated user and invalidate their token.

**URL**: `/user/logout`

**Method**: `GET`

**Headers**:
```json
{
  "Authorization": "Bearer jwt_token_string"
}
```

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
{
  "message": "Logout successfully"
}
```

**Error Responses**:
- **Code**: 401 Unauthorized
  - **Content**: Authentication error
```json
{
  "message": "Access denied. No token provided"
}
```

- **Code**: 500 Internal Server Error
  - **Content**: Server error message
```json
{
  "message": "Something went wrong",
  "error": "error message"
}
```

**Notes**:
- Both endpoints require authentication
- The token will be blacklisted after logout and cannot be reused
- The token can be provided either through cookies or Authorization header
### Register Captain
Create a new captain account.

**URL**: `/captain/register`

**Method**: `POST`

**Request Body**:
```json
{
  "fullname": {
    "firstname": "string",  // minimum 3 characters
    "lastname": "string"    // optional, minimum 3 characters if provided
  },
  "email": "string",        // valid email format
  "password": "string",     // minimum 6 characters
  "vehicle": {
    "color": "string",      // minimum 3 characters
    "plate": "string",      // minimum 3 characters
    "capacity": "number",   // minimum 1
    "vehicleType": "string" // must be "car", "motorcycle", or "auto"
  },
  "location": {             // optional
    "lat": "number",
    "lng": "number"
  }
}
```

**Success Response**:
- **Code**: 201 Created
- **Content**:
```json
{
  "token": "jwt_token_string",
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "status": "inactive",
    "_id": "string"
  }
}
```

**Error Responses**:

- **Code**: 400 Bad Request
  - **Content**: Validation errors for invalid input
```json
{
  "errors": [
    {
      "msg": "First name must be greater than 3 characters",
      "path": "fullname.firstname"
    }
  ]
}
```

- **Code**: 401 Unauthorized
  - **Content**: Email already exists
```json
{
  "message": "Captain already exists with this email"
}
```

- **Code**: 500 Internal Server Error
  - **Content**: Server error message
```json
{
  "message": "Something went wrong",
  "error": "error message"
}
```

**Required Fields**:
- firstname (minimum 3 characters)
- email (valid email format)
- password (minimum 6 characters)
- vehicle.color (minimum 3 characters)
- vehicle.plate (minimum 3 characters)
- vehicle.capacity (minimum 1)
- vehicle.vehicleType (must be "car", "motorcycle", or "auto")

**Optional Fields**:
- lastname (minimum 3 characters if provided)
- location (must include both lat and lng if provided)
