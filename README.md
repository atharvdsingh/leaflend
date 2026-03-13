# 📚 Bookchetna

**Connect. Share. Read.**  
A modern peer-to-peer book sharing platform that turns every bookshelf into a community library.

![Leaflend Banner](./bookchetna/public/readme/image.png)

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6+-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

---

## 🚀 Overview

Leaflend is a social platform designed to facilitate the sharing and renting of physical books within trusted communities. Whether you're a bibliophile looking to declutter or a reader seeking your next favorite title, Leaflend bridges the gap between ownership and access.

### ✨ Key Features

- **📖 Personal Digital Library**: Catalog your physical books and track their availability.
- **🤝 Peer-to-Peer Rentals**: Send and manage requests to borrow books from other users.
- **🏠 Community Rooms**: Join or create "Rooms" to share books within specific groups or organizations.
- **⚡ Real-time Tracking**: Monitor the status of your borrowed and lent books in one place.
- **🔐 Secure Auth**: Built-in authentication using NextAuth.js.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS 4, Radix UI.
- **State Management**: Redux Toolkit & React-Redux.
- **Backend**: Next.js API Routes & Server Actions.
- **Database**: PostgreSQL with Prisma ORM.
- **Media**: Cloudinary for book cover management.
- **Auth**: NextAuth.js.

---

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL instance
- Cloudinary Account (for image uploads)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/atharvdsingh/bookchetna.git
   cd bookchetna
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/leaflend"
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Database Sync**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```text
src/
├── app/          # Next.js App Router (Pages & API)
├── actions/      # Type-safe Server Actions
├── components/   # Reusable UI components
├── lib/          # Utilities & Database Client
├── store/        # Redux store & slices
├── types/        # TypeScript interfaces
└── schema/       # Zod validation schemas
```

---

## 🗺️ Routes Overview

### Pages
- `/` - Landing page
- `/home` - Book discovery dashboard
- `/my-books` - Personal library management
- `/rentedbooks` - Rented & borrowed tracker
- `/room` - Community Management

### API Endpoints
- `/api/auth` - NextAuth handlers
- `/api/books` - Book CRUD operations
- `/api/room` - Room creation and joining
- `/api/user` - Profile management

---

## 📄 License

This project is private and proprietary. All rights reserved.

