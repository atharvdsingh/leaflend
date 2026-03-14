# 📚 Bookchetna (Leaflend)

**Connect. Share. Read.**  
A modern peer-to-peer book sharing platform that turns every bookshelf into a community library. 

![Leaflend Banner](./bookchetna/public/readme/image.png)

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6+-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

---

## 🚀 Overview

Bookchetna (internally known as Leaflend) is a social platform designed to facilitate the sharing and renting of physical books within trusted communities. Whether you're a bibliophile looking to declutter or a reader seeking your next favorite title, Bookchetna bridges the gap between ownership and access.

### ✨ Key Features

- **📖 Personal Digital Library**: Catalog your physical books and track their availability.
- **🤝 Peer-to-Peer Rentals**: Send and manage requests to borrow books from other users. Keep track of active borrows, return dates, and histories.
- **🏠 Community Rooms**: Join or create dedicated "Rooms" to share books within specific groups, organizations, or book clubs with role-based access limits.
- **⚡ Real-time Tracking**: Monitor the status of your borrowed and lent books in one centralized dashboard.
- **🔐 Secure Authentication**: Built-in, secure authentication using NextAuth.js.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4, Radix UI Primitives.
- **State Management**: Redux Toolkit & React-Redux.
- **Backend**: Next.js API Routes & Server Actions.
- **Database**: PostgreSQL with Prisma ORM.
- **Media Storage**: Cloudinary for book cover management.
- **Authentication**: NextAuth.js with Prisma Adapter.
- **Containerization**: Docker & Docker Compose.

---

## 🐳 Docker Compose Setup (Recommended)

The easiest way to run the entire Bookchetna application (including the database and the Next.js client) locally is using Docker Compose.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Desktop](https://docs.docker.com/desktop/) / [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Environment Variables Setup

Create a `.env` file in the `./bookchetna` directory (the inner folder containing the source files) with your cloud credentials for Cloudinary, NextAuth, and the database connection:

```env
# ./bookchetna/.env

# Database connection (Matches the Docker Compose 'db' service)
DATABASE_URL="postgresql://postgres:mysecretpassword@db:5432/postgres"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary Configuration for Image Uploads
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 2. Building & Running the Application

Start the containers from the root repository directory (where the `docker-compose.yml` is located):

```bash
docker compose up --build
```
This command starts both the Next.js app on `localhost:3000` and the PostgreSQL database on `localhost:5432`.

### 3. Database Initialization (Migrating & Pushing)

Once the containers are running, you need to sync the database schema. In a **new terminal window**, execute Prisma commands inside the running `client` container:

```bash
docker exec -it leaflend-app npx prisma db push
```
*(Alternatively, you can open an interactive shell in the container via `docker exec -it leaflend-app sh` and run your standard Prisma commands)*.

### 4. Access the App

Open [http://localhost:3000](http://localhost:3000) in your browser. 

> **Note on hot-reloading:** The application uses Webpack/Chokidar polling strategies defined in the Docker environment. Live changes to the `./bookchetna` source code will auto-reflect within the Docker container!

### 🛑 Stopping the Containers
To gracefully stop the Docker services without losing database volumes:
```bash
docker compose down
```
To bring down the containers **and** wipe the local database volume entirely:
```bash
docker compose down -v
```

---

## 💻 Manual Local Setup (Without Docker)

If you prefer to run the application natively on your system:

### Installation
1. Navigate to the inner project directory:
   ```bash
   cd bookchetna
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup
Create the `.env` file in the `bookchetna` directory:
```env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres" # Your local Postgres URL
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Database Sync & Running the Server
```bash
npx prisma generate
npx prisma db push
npm run dev
```

---

## 📁 Project Structure

```text
.
├── docker-compose.yml       # Global Docker wrapper configurations
└── bookchetna/              # Core Application Source Working Directory
    ├── src/
    │   ├── app/             # Next.js App Router root (Pages, Routing & API Endpoints)
    │   ├── components/      # Global & Reusable UI React configurations
    │   ├── lib/             # Shared Utilities & Prisma Client
    │   ├── store/           # Redux state, actions & slice logic 
    │   └── types/           # TypeScript generic Type Interfaces
    ├── prisma/              # Prisma DB schemas (*.prisma) & migration logs
    ├── Dockerfile           # App Dockerfile configuration mapping for client
    ├── package.json         # NPM deps and scripts registry
    └── tailwind.config.ts   # PostCSS/Tailwind UI definitions
```

---

## 📄 License

This project is private and proprietary. All rights reserved.
