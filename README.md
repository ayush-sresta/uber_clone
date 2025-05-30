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
