import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all students
app.get('/api/students', async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Get a single student by ID
app.get('/api/students/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: { id },
    });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

// Create a new student
app.post('/api/students', async (req: Request, res: Response) => {
  try {
    const { email, name, archetypes } = req.body;

    // Validate input
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    // Check if student already exists
    const existingStudent = await prisma.student.findUnique({
      where: { email },
    });

    if (existingStudent) {
      return res.status(409).json({ error: 'Student with this email already exists' });
    }

    // Create new student
    const student = await prisma.student.create({
      data: {
        email,
        name,
        archetypes: archetypes || null,
      },
    });

    res.status(201).json(student);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
});

// Update a student
app.put('/api/students/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, name, archetypes } = req.body;

    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update student
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        ...(email && { email }),
        ...(name && { name }),
        ...(archetypes && { archetypes }),
      },
    });

    res.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// Delete a student
app.delete('/api/students/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Delete student
    await prisma.student.delete({
      where: { id },
    });

    res.json({ message: 'Student deleted successfully', id });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✨ Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
