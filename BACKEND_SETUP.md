# Express + PostgreSQL + Prisma Setup Complete ✨

## What Was Added

### 1. **Dependencies Installed**
- `express` - Web framework
- `cors` - Cross-origin support
- `dotenv` - Environment variable management
- `@types/express` - TypeScript types
- `tsx` - Run TypeScript files directly

### 2. **Backend Server** (`server.ts`)
RESTful API with CRUD operations for students:

#### Endpoints:
- `GET /api/health` - Health check
- `POST /api/students` - Create student
- `GET /api/students` - List all students
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### 3. **Database Schema** (Prisma)
Changed from SQLite to PostgreSQL with Student model:
```prisma
model Student {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  archetypes Json?    // Stores archetype scores as JSON
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 4. **Configuration Files**
- `.env.local` - Local development environment variables
- `railway.toml` - Railway deployment configuration
- `SETUP.md` - Detailed setup guide
- `MIGRATIONS.md` - Database migration documentation

### 5. **Testing**
- `test-api.ts` - API endpoint test script

## Quick Start

### Local Development

1. **Set up PostgreSQL locally:**
```bash
# Install PostgreSQL if needed (macOS)
brew install postgresql

# Create database
createdb orb_dev

# Update .env.local with your local database URL
DATABASE_URL="postgresql://localhost/orb_dev"
```

2. **Initialize database:**
```bash
npm run db:push
```

3. **Run backend server:**
```bash
npm run server:dev
```

4. **Test the API:**
```bash
# In another terminal
npx ts-node test-api.ts
```

### Deploy to Railway

1. **Connect your GitHub repo to Railway** (https://railway.app)

2. **Add PostgreSQL plugin:**
   - Railway Dashboard → Add Service → PostgreSQL
   - This automatically sets `DATABASE_URL`

3. **Deploy:**
   - Push to GitHub
   - Railway auto-detects and deploys

4. **Run migrations on production:**
   ```bash
   # In Railway shell
   npx prisma db push
   ```

5. **Set environment variables in Railway:**
   - `RETELL_API_KEY`
   - `RETELL_AGENT_ID`
   - `NODE_ENV=production`

## Database Commands

```bash
# View/edit data in UI
npm run db:studio

# Push schema changes
npm run db:push

# Create a migration
npx prisma migrate dev --name add_field_name

# Deploy migrations to production
npx prisma migrate deploy

# View migration status
npx prisma migrate status
```

## Student API Examples

### Create Student
```bash
curl -X POST http://localhost:3001/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "name": "John Doe",
    "archetypes": {
      "Academic Scholar": 85,
      "Leader": 92
    }
  }'
```

### Get All Students
```bash
curl http://localhost:3001/api/students
```

### Get Single Student
```bash
curl http://localhost:3001/api/students/[STUDENT_ID]
```

### Update Student
```bash
curl -X PUT http://localhost:3001/api/students/[STUDENT_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "archetypes": {"Academic Scholar": 90}
  }'
```

### Delete Student
```bash
curl -X DELETE http://localhost:3001/api/students/[STUDENT_ID]
```

## Next Steps

1. **Connect frontend to API:**
   - Update your Next.js pages to call `/api/students` endpoints
   - Example: Save archetype results when interview completes

2. **Add more fields to Student model:**
   ```prisma
   model Student {
     // ... existing fields ...
     interviewScore Float?
     completedAt DateTime?
     // ... etc ...
   }
   ```

3. **Create related models:**
   ```prisma
   model Interview {
     id String @id @default(cuid())
     studentId String
     student Student @relation(fields: [studentId], references: [id])
     // ... interview data ...
   }
   ```

4. **Add authentication** (optional):
   - Use NextAuth.js for session management
   - Secure API routes with middleware

## Troubleshooting

### "Cannot find module 'express'"
```bash
npm install
```

### "DATABASE_URL not set"
- Ensure `.env.local` exists with `DATABASE_URL`
- Or set it in Railway dashboard

### Prisma schema out of sync
```bash
npx prisma db push --force-reset  # ⚠️ Deletes data!
npm run db:push  # Safe version
```

### Port already in use
Change `PORT` in `.env.local` or pass as env var:
```bash
PORT=3002 npm run server:dev
```

## Files Added/Modified

✅ **Modified:**
- `package.json` - Added Express dependencies and scripts
- `prisma/schema.prisma` - Changed to PostgreSQL + Student model
- `.env.local` - Created with development configuration

✅ **Created:**
- `server.ts` - Express API server
- `railway.toml` - Railway deployment config
- `SETUP.md` - Setup documentation
- `MIGRATIONS.md` - Migration guide
- `test-api.ts` - API test script

## Support

For questions about:
- **Prisma**: https://www.prisma.io/docs/
- **Express**: https://expressjs.com/
- **Railway**: https://docs.railway.app/
- **PostgreSQL**: https://www.postgresql.org/docs/
