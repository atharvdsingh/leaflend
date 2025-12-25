# Error Handling Documentation

This project uses a standardized error handling strategy across the backend and frontend to ensure consistency, type safety, and a better user experience.

## Backend Error Handling

### `AppError` Class
Located in `src/util/AppError.ts`.
Use this class to throw operational errors that should be handled explicitly.

```typescript
import { AppError } from "@/util/AppError";

// Throwing an error
throw new AppError("Error message", 400, "ERROR_CODE");
```

- **message**: Human-readable error message.
- **status**: HTTP status code (e.g., 400, 401, 404, 500).
- **code**: (Optional) Machine-readable error code for frontend logic.

### `handleApiError` Utility
Located in `src/util/HandleError.ts`.
Use this in `catch` blocks of API routes to return a standardized JSON response.

```typescript
import { handleApiError } from "@/util/HandleError";

try {
  // ... logic
} catch (error) {
  return handleApiError(error);
}
```

### Standard Error Response Format
The API returns errors in the following JSON format:

```json
{
  "success": false,
  "message": "User is not logged in",
  "code": "UNAUTHORIZED"
}
```

### Common Error Codes

| Code | Status | Description |
| :--- | :--- | :--- |
| `UNAUTHORIZED` | 401 | User is not logged in or token is invalid. |
| `FORBIDDEN` | 403 | User does not have permission to perform the action. |
| `INVALID_INPUT` | 400 | Missing or invalid fields in the request body. |
| `BOOK_NOT_FOUND` | 404 | The requested book does not exist. |
| `BOOK_UNAVAILABLE` | 409 | The book is already rented or not available. |
| `DUPLICATE_REQUEST` | 409 | User has already requested this book. |
| `INVALID_OPERATION` | 400 | Invalid logic (e.g., renting own book). |
| `INTERNAL_ERROR` | 500 | Unexpected server-side error. |

## Frontend Error Handling

### `handleClientError` Utility
Located in `src/util/clientError.ts`.
Use this in React components to handle API errors and display toast notifications.

```typescript
import { handleClientError } from "@/util/clientError";

try {
  await axios.post("/api/some-route", data);
} catch (error) {
  handleClientError(error);
}
```

This utility:
1.  Checks if the error is an Axios error.
2.  Extracts the error message from the backend response.
3.  Displays a toast notification using `sonner`.
4.  Returns the error message string if further handling is needed.

## Best Practices

1.  **Always use `AppError`** for known logic errors in the backend.
2.  **Always use `handleApiError`** in the `catch` block of every API route.
3.  **Always use `handleClientError`** in the `catch` block of frontend API calls.
4.  **Define specific error codes** when the frontend needs to react differently to specific errors (e.g., redirecting on `UNAUTHORIZED`).
