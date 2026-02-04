# Orb - Setup Guide

## Local Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up your local database:**
```bash
# Create a local PostgreSQL database
createdb orb_dev

# Update .env.local with your database URL
DATABASE_URL="postgresql://user:password@localhost:5432/orb_dev"
```

3. **Set up Prisma:**
```bash
# Push schema to database
npm run db:push

# Optional: Open Prisma Studio to view/manage data
npm run db:studio
```

4. **Start development:**
```bash
# Terminal 1: Next.js frontend
npm run dev

# Terminal 2: Express backend (optional - for API)
npm run server:dev
```

## Railway Deployment

### Prerequisites
- Railway account (https://railway.app)
- GitHub repository linked to Railway

### Setup Steps

1. **Create PostgreSQL Plugin on Railway:**
   - Go to your Railway project
   - Click "Add Service" → Select "PostgreSQL"
   - Railway will automatically set `DATABASE_URL` environment variable

2. **Deploy:**
   - Push your code to GitHub
   - Railway will auto-detect `package.json` and deploy

3. **Set Environment Variables:**
   In Railway dashboard, set:
   ```
   RETELL_API_KEY=your_key
   RETELL_AGENT_ID=your_id
   NODE_ENV=production
   ```

4. **Run Migrations:**
   In Railway, open a shell and run:
   ```bash
   npx prisma db push
   ```

## API Routes

### Students

- **GET** `/api/students` - List all students
- **GET** `/api/students/:id` - Get a student by ID
- **POST** `/api/students` - Create a new student
  ```json
  {
    "email": "student@example.com",
    "name": "John Doe",
    "archetypes": { "Academic Scholar": 85, "Leader": 92 }
  }
  ```
- **PUT** `/api/students/:id` - Update a student
- **DELETE** `/api/students/:id` - Delete a student

## Database Schema

### Student Model
```
- id: String (unique, auto-generated)
- email: String (unique)
- name: String
- archetypes: Json (nullable, stores archetype scores)
- createdAt: DateTime (auto)
- updatedAt: DateTime (auto)
```
