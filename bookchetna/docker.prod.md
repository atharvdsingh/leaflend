# Docker Production Optimization Guide



## 1. Multi-Stage Builds (The "Factory" Concept)
Instead of doing everything in one room, we use three distinct phases:
- **Phase 1: Deps (Supplies)**: Only installs the raw ingredients (Node modules).
- **Phase 2: Builder (The Factory)**: Takes the supplies and your code to "manufacture" the app.
- **Phase 3: Runner (The Showroom)**: Discards the factory (the raw code, the cache, the tools) and only keeps the final product.

## 2. Next.js Standalone Mode
By adding `output: "standalone"` in `next.config.ts`, Next.js creates a special folder that:
- Automatically crawls your code to find only the files being used.
- Excludes thousands of unused files from `node_modules`.
- **Why it matters:** This is the #1 reason the image size drops so drastically.

## 3. `npm ci` vs `npm install`
- **npm install**: Can be inconsistent and downloads "Everything" including development tools.
- **npm ci (Clean Install)**: Strictly follows your `package-lock.json`. It's faster, more secure, and ensures the version of libraries on your server is **exactly** the same as on your computer.

## 4. Least Privilege Security
By default, Docker containers run as the **Root** user (like an Administrator).
- **The Risk:** if your website is hacked, the hacker has root access to the whole container.
- **The Solution:** We create a weak user (`nextjs`) who can only run the app and nothing else.

## 5. Using Alpine Linux
- **Traditional OS images**: Can be 500MB+ just for the "Windows" or "Ubuntu" layer.
- **Alpine Linux**: A tiny, secure version of Linux that is only about **5MB**.

---

### How to use these files:

**For Daily Development (Original `Dockerfile`):**
```bash
# Good for fast changes, uses dev mode
docker build -t app-dev .
```

**For Production Deployment (`DockerFile.prod`):**
```bash
# Good for speed, size, and security
docker build -f DockerFile.prod -t app-prod .
```
