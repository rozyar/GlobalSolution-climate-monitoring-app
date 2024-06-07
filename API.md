# API Documentation

## Auth Endpoints

#### Obs:

If you run the project on your machine, the server will be accessible on the default port. By default, the server listens on port 3890. You can access the endpoints via `http://localhost:3890`.

### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **Response Body**:

```json
{
  "access_token": "jwt_token",
  "name": "User Name",
  "email": "user@example.com"
}
```

### Check Token

- **URL**: `/auth/check-token`
- **Method**: `POST`
- **Description**: Verify if a JWT token is valid.
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response**

```json
{
  "status": "valid"
}
```

### User Endpoints

- **URL**: `/user/register`
- **Method**: `POST`
- **Description**: Register a new user
- **Request Body**:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

- **Response**:

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "User Name",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## Ocean Plastic Location Endpoints

### Get All Locations

- **URL**: `/ocean/location`
- **Method**: `GET`
- **Description**: Returns all locations of plastic trash in the oceans. This endpoint is protected and requires a valid JWT token.
- **Headers**:
  - `Authorization`: `Bearer jwt_token`
- **Response**:

```json
[
  {
    "id": 1,
    "latitude": 35.0,
    "longitude": -140.0,
    "name": "Grande Mancha de Lixo do Pacífico",
    "description": "A vast area in the North Pacific where large amounts of plastic trash accumulate due to ocean currents.",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
  // other locations...
]
```

### Create Location

- **URL**: `/ocean/location`
- **Method**: `POST`
- **Description**: Creates a new location of plastic trash in the ocean. This endpoint is protected and requires a valid JWT token.
- **Headers**:
  - `Authorization`: `Bearer jwt_token`
- **Request Body:**:

```json
[
  {
    "latitude": 35.0,
    "longitude": -140.0,
    "name": "Grande Mancha de Lixo do Pacífico",
    "description": "A vast area in the North Pacific where large amounts of plastic trash accumulate due to ocean currents."
  }
]
```

- **Response**:

```json
[
  {
    "id": 1,
    "latitude": 35.0,
    "longitude": -140.0,
    "name": "Grande Mancha de Lixo do Pacífico",
    "description": "A vast area in the North Pacific where large amounts of plastic trash accumulate due to ocean currents.",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }

  // other locations...
]
```

## Fire Location Endpoints

### Get All Locations

- **URL**: `/fire-locations`
- **Method**: `GET`
- **Description**: Returns all fire locations. This endpoint is protected and requires a valid JWT token.
- **Headers**:
  - `Authorization`: `Bearer jwt_token`
- **Response**:

```json
[
  {
    "id": 1,
    "latitude": 38.5266,
    "longitude": -78.4367,
    "name": "Fire in Shenandoah and Page Counties",
    "description": "A wildfire in Shenandoah and Page Counties, Virginia, that burned 6,399 acres.",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
  // other locations...
]
```

### Create Location

- **URL**: `/fire-locations`
- **Method**: `POST`
- **Description**: Creates a new location of plastic trash in the ocean. This endpoint is protected and requires a valid JWT token.
- **Headers**:
  - `Authorization`: `Bearer jwt_token`
- **Request Body:**:

```json
{
  "latitude": 38.5266,
  "longitude": -78.4367,
  "name": "Fire in Shenandoah and Page Counties",
  "description": "A wildfire in Shenandoah and Page Counties, Virginia, that burned 6,399 acres."
}
```

- **Response**:

```json
[
  {
    "id": 1,
    "latitude": 38.5266,
    "longitude": -78.4367,
    "name": "Fire in Shenandoah and Page Counties",
    "description": "A wildfire in Shenandoah and Page Counties, Virginia, that burned 6,399 acres.",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }

  // other locations...
]
```
