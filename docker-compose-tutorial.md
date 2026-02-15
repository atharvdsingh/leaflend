# Docker Compose Tutorial: Services, Networks, and Volumes

This guide explains how Docker Compose works using your current project (`leaflend`) as a real-world example.

## 1. The Big Picture

Docker Compose allows you to define and run multi-container applications. Instead of running three separate `docker run` commands for your database, frontend, and websocket server, you define them all in one file: `docker-compose.yml`.

### Your Architecture
```mermaid
graph TD
    Client[Client (Next.js)] -- app-network --> DB[(Database)]
    WS[WebSocket Server] -- app-network --> DB
    Client -- app-network --> WS
```

## 2. Services (The Building Blocks)

In your `docker-compose.yml`, you have three **services**:

1.  **`db`**: The PostgreSQL database.
2.  **`client`**: Your Next.js application (`bookchetna`).
3.  **`ws`**: Your WebSocket server (`ws`).

### Key Concepts for Services:
- **`build`**: Tells Docker where to find the code to build usage image.
    - `client` uses `context: ./bookchetna` because the Dockerfile is inside that folder.
    - `ws` uses `build: ./ws` which is a shorthand.
- **`ports`**: Maps ports from the container to your host machine (localhost).
    - `"3000:3000"` means `localhost:3000` -> `Container:3000`.
- **`depends_on`**: Ensures services start in the correct order. `client` waits for `db` to be ready.
- **`environment`**: Sets variables (like DB passwords) inside the container.

## 3. Networks (How Containers Talk)

Containers are isolated by default. **Networks** execute them to communicate.

### In your file:
```yaml
networks:
  app-network:
    driver: bridge
```

### How it works:
- All services (`db`, `client`, `ws`) are attached to `app-network`.
- **Magic DNS**: Docker provides internal DNS. Your `client` can talk to your database using the service name or container name as the hostname.
    - Instead of `localhost`, your app connects to `postgres-db` (the container name).
    - **Example**: In your `.env`, `DATABASE_URL=postgresql://...@postgres-db:5432/...`

## 4. Volumes (Persisting Data)

Containers are ephemeral. If you delete a container, its file system is gone. **Volumes** solve this for databases.

### In your file:
```yaml
volumes:
  postgres_data:
```

### How it works:
- **Named Volume**: `postgres_data` is a persistent storage area managed by Docker.
- **Mapping**: The `db` service maps this volume to `/var/lib/postgresql/data` (where Postgres stores data).
```yaml
    volumes:
      - postgres_data:/var/lib/postgresql/data
```
- **Result**: Even if you run `docker-compose down` and destroy the containers, your actual database data stays safe in `postgres_data`. When you start it up again, your users and books are still there.

## 5. Cheatsheet Commands

| Command | Description |
| :--- | :--- |
| `docker-compose up` | Builds (if needed) and starts all services. |
| `docker-compose up -d` | Starts services in the **background** (detached mode). |
| `docker-compose down` | Stops and removes containers and networks. Data in volumes is SAFE. |
| `docker-compose down -v` | Stops everything AND **deletes volumes**. (Data is LOST). |
| `docker-compose build` | Rebuilds images (run this if you change `package.json` or code). |
| `docker-compose logs -f` | Follows the logs of all services. |
