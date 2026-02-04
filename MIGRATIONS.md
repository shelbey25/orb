# Migration Guide for Railway

## Initial Setup (First Time Only)

1. **Create PostgreSQL Database on Railway:**
   - In Railway Dashboard: Add Service → PostgreSQL
   - Railway automatically sets `DATABASE_URL` environment variable

2. **Push Schema to Production:**
   ```bash
   # In Railway shell or locally with production DATABASE_URL
   npx prisma db push
   ```

## For Future Schema Changes

1. **Update `prisma/schema.prisma`**

2. **Create and review migration:**
   ```bash
   npx prisma migrate dev --name describe_change
   ```

3. **Push to production:**
   ```bash
   npx prisma migrate deploy
   ```

## Current Schema

### Student Table
```sql
CREATE TABLE "Student" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "archetypes" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
);
```

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# View current migrations
npx prisma migrate status
```

### Reset Database (⚠️ Destructive)
```bash
# Local only - do NOT run on production
npx prisma migrate reset
```
