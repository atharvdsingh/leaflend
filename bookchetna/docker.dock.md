# Docker Management Guide: BookChetna

This guide explains how to manage your Next.js application and PostgreSQL database using Docker, ranging from manual commands to simple orchestration with Docker Compose and concepts for Kubernetes (K8s).

---

## 1. Manual Docker Management (Without Compose)

If you don't want to use orchestration tools, you have to manage networks and containers manually.

### Step A: Create a Network
Containers need to be on the same "inner" network to talk to each other using names like `postgres-db` instead of IP addresses.
```bash
docker network create bookchetna-network
```

### Step B: Run the Database
Run a PostgreSQL container attached to that network.
```bash
docker run -d \
  --name postgres-db \
  --network bookchetna-network \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -p 5432:5432 \
  postgres:15-alpine
```

### Step C: Build and Run the App
Point the `DATABASE_URL` to the container name `postgres-db`.
```bash
# Build
docker build -t bookchetna-app .

# Run
docker run -d \
  --name bookchetna-app \
  --network bookchetna-network \
  -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres-db:5432/postgres \
  -p 3000:3000 \
  bookchetna-app
```

---

## 2. Docker Compose: The Professional Way (Recommended)

Docker Compose is a tool that reads a `docker-compose.yml` file and manages all those manual steps above with a single command.

### How it Works
Think of it as a "Recipe File" for your entire infrastructure. It defines:
- **Services**: Your App and your Database.
- **Networks**: Automatic connection between them.
- **Volumes**: Persistent storage (so your database isn't wiped when the container stops).

### Common Commands
| Action | Command | Description |
| :--- | :--- | :--- |
| **Start Everything** | `docker-compose up -d` | Starts the DB and App in the background. |
| **Stop Everything** | `docker-compose down` | Stops and removes containers. |
| **Check Logs** | `docker-compose logs -f` | See what's happening in real-time. |
| **Apply Changes** | `docker-compose up -d --build` | Rebuilds the app and restarts the service. |

---

## 3. Applying Changes & Rebuilding

When you change your code (e.g., in `src/`), you need to tell Docker to "refresh" the application.

1.  **Stop and Rebuild**: 
    ```bash
    docker-compose up -d --build
    ```
    *The `--build` flag tells Docker to ignore its cache and look for code changes.*

2.  **Changing Dependencies**: 
    If you add a new library via `npm install`, you **must** run the `--build` command above to update the image.

---

## 4. Database Connection & Migrations

### The Connection
In `.env`, your `DATABASE_URL` looks like this:
`postgresql://postgres:mysecretpassword@postgres-db:5432/postgres`

- **postgres-db**: This is the host name. In Docker Compose, service names act as host names.
- **5432**: The internal port for PostgreSQL.

### Applying Migrations (Prisma)
Since the database and Prisma "live" inside Docker, you should run migrations using the `docker exec` command to talk to the running container.

**To sync your database with your schema:**
```bash
docker exec -it leaflend-app npx prisma migrate dev
```

**To generate the Prisma client:**
```bash
docker exec -it leaflend-app npx prisma generate
```

---

## 5. Kubernetes (K8s) Overview

If your app grows and needs to stay alive across multiple servers, you use **Kubernetes**. 

### Key Differences:
- **Docker Compose**: Great for a single server (like your laptop or a small VPS).
- **Kubernetes**: Orchestrates thousands of containers across a "cluster" of many servers.

### K8s Concepts for your setup:
1.  **Pod**: The smallest unit. You'd have a Pod for the App and a "StatefulSet" for the DB.
2.  **Service**: A stable entry point. Instead of just a network name, you create a "Service" so the App can always find the DB even if the DB Pod moves to another server.
3.  **Deployment**: Manages your App Pods. If one crashes, K8s automatically starts a new one.

---

### Verification Checklist
- [ ] Run `docker-compose up -d` to start.
- [ ] Open `localhost:3000` to see the app.
- [ ] Run `docker exec -it leaflend-app npx prisma migrate dev` to test the DB connection.
