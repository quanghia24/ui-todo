This folder contains your API endpoints using Next.js App Router. Each subfolder represents a resource (e.g., users, posts), and each route.ts file defines the HTTP methods (GET, POST, etc.) for that resource.

- Structure:
    - /app/api/[resource]/route.ts: Handles operations for the resource (e.g., list all users, create a user).
    - /app/api/[resource]/[id]/route.ts: Handles operations for a specific resource by ID (e.g., get, update, or delete a user).

- What to Write:
    - Call service layer functions (from /src/services) to handle business logic.
    - Handle HTTP requests, parse inputs (e.g., query params, body), and return responses using NextResponse.
    - Include error handling to return appropriate status codes.