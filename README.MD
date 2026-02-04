# Shelbe Yousey's Base Full Stack Development Flow

Welcome to the foundational template for full-stack web development. This repository represents a standardized development workflow designed to streamline the creation of modern, scalable web applications.

## 🎯 Overview

This is a **production-ready full-stack template** built with industry-standard technologies, establishing a consistent development flow for rapid application development. It combines a powerful backend with a modern frontend framework.

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14+ (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Components**: React functional components with hooks
- **Authentication**: Clerk

### Backend
- **API Framework**: Next.js API Routes + tRPC
- **ORM**: Prisma
- **Database**: PostgreSQL (via Prisma migrations)
- **Type Safety**: tRPC for end-to-end type-safe API calls
- **Validation**: Zod for runtime validation

### Utilities & Libraries
- **HTTP Client**: @trpc/client with SuperJSON
- **Class Utilities**: clsx + tailwind-merge for dynamic styling
- **Environment**: @t3-oss/env-nextjs for type-safe env variables

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shelbey25/Shelbe-Yousey-s-Base-Full-Stack-Repo
   cd "Shelbe Yousey's Template Full Stack Repo"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure the following:
   - Database URL (PostgreSQL)
   - Clerk API keys (authentication)
   - Other service credentials

4. **Set up the database**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Key Features

### Built-in Templates
- **CSS Template** (`src/styles/Example.css`): Comprehensive styling structure with utilities, typography, forms, cards, and responsive design
- **API Endpoint** (`src/pages/api/example.ts`): Full CRUD REST API template with validation and error handling
- **React Component** (`src/components/Example.tsx`): Functional component with hooks, state management, list handling, and API integration examples

### Developer Experience
- **Type Safety**: Full TypeScript support with tRPC for end-to-end type safety
- **Validation**: Zod for runtime schema validation
- **Code Quality**: Prettier for formatting, ESLint for linting
- **Database**: Prisma ORM with migrations and type-safe queries
- **Authentication**: Clerk integration with middleware protection

## 🔧 Development Workflow

### Code Style
- **Formatter**: Prettier (configured in `prettier.config.mjs`)
- **Linting**: ESLint integration via Next.js
- **Type Checking**: TypeScript with strict mode

### Commands
```bash
# Development
npm run dev           # Start dev server

# Building
npm run build         # Build for production
npm start             # Start production server

# Database
npx prisma migrate   # Create/run migrations
npx prisma studio   # Open Prisma Studio

# Code Quality
npm run lint         # Run linter
npm run format       # Format with Prettier
```

## 🌐 Key Integrations

### Authentication
- **Clerk**: Modern authentication with email, OAuth, and multi-factor support

### API Architecture
- **tRPC**: End-to-end type-safe API layer with automatic client generation
- **Zod**: Runtime schema validation for request/response validation

## 🛠️ Technologies Used

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14+ |
| **Language** | TypeScript 5+ |
| **Frontend** | React 18, Tailwind CSS |
| **Backend** | tRPC, Node.js |
| **Database** | PostgreSQL, Prisma ORM |
| **API** | tRPC (end-to-end type-safe) |
| **Authentication** | Clerk |
| **Validation** | Zod |
| **Styling** | Tailwind CSS, PostCSS |
| **Deployment** | Vercel |
| **Package Manager** | npm/yarn |

## 🚢 Deployment

The project is configured for deployment on **Vercel** (see `vercel.json`).

### Deploy with Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📝 Environment Variables

Key environment variables (add to `.env.local`):
```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## 🤝 Contributing

This is a personal development template. Feel free to fork and customize it for your projects.

## 📄 License

This project is part of Shelbe Yousey's development workflow. Use according to your needs.

---

**Last Updated**: February 2026  
**Author**: Shelbe Yousey  
**Purpose**: Foundation for rapid full-stack web development
