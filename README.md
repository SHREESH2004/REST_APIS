# 🎬 CineTrack API

A premium **TypeScript** backend designed for cinema lovers to curate and manage their personal movie collections. This API leverages **Node.js**, **Express**, and **Prisma** to provide a high-performance, type-safe experience.

---

## 💎 Core Architecture

* **Secure Auth:** JWT-based sessions with password hashing.
* **Validation:** Strict schema enforcement using **Zod**.
* **Database:** Relational data management via **PostgreSQL** & **Prisma**.
* **Reliability:** Centralized error handling and ownership verification.

---

## 📽️ Featured Library (Pre-Seeded)

The database comes pre-loaded with iconic titles from the **Quentin Tarantino** collection. These are ready for immediate use in your watchlist.

| Title | Genre | ⭐ Rating | 🕒 Runtime |
| --- | --- | --- | --- |
| **Pulp Fiction** | Crime, Drama | `8.9` | 154m |
| **Reservoir Dogs** | Crime, Thriller | `8.3` | 99m |
| **Inglourious Basterds** | War, Drama | `8.3` | 153m |
| **Django Unchained** | Western, Drama | `8.4` | 165m |
| **Kill Bill: Vol. 1** | Action, Crime | `8.2` | 111m |
| **Kill Bill: Vol. 2** | Action, Crime | `8.0` | 137m |
| **The Hateful Eight** | Western, Mystery | `7.8` | 168m |
| **Jackie Brown** | Crime, Thriller | `7.5` | 154m |
| **Death Proof** | Thriller | `7.0` | 113m |

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Runtime** | Node.js |
| **Language** | TypeScript |
| **Framework** | Express.js |
| **ORM** | Prisma |
| **Validation** | Zod |
| **Security** | JWT / Bcrypt |

---

## 📂 API Reference

### 🔑 Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/register` | Create a new user account |
| `POST` | `/auth/login` | Authenticate and receive JWT |

### 📋 Watchlist

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/watchlist/getlist` | Fetch your saved movies |
| `POST` | `/watchlist/addlist` | Add a new movie to list |
| `PATCH` | `/watchlist/update/:id` | Update rating or status |
| `DELETE` | `/watchlist/delete/:id` | Remove movie from list |

---

## ⚡ Quick Start

### 1. Setup Environment

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/cinetrack"
JWT_SECRET="your_secret_key"

```

### 2. Initialize Database

```bash
npm install
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts

```

### 3. Launch

```bash
npm run dev

```
