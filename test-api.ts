#!/usr/bin/env node

/**
 * Test script for API endpoints
 * Run with: npx ts-node test-api.ts
 */

const BASE_URL = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testing Orb API...\n');

  try {
    // Test health endpoint
    console.log('1️⃣  Testing health check...');
    let response = await fetch(`${BASE_URL}/api/health`);
    console.log(`✅ Health: ${response.status}`, await response.json());
    console.log();

    // Create a student
    console.log('2️⃣  Creating a student...');
    response = await fetch(`${BASE_URL}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `test-${Date.now()}@example.com`,
        name: 'Test Student',
        archetypes: {
          'Academic Scholar': 85,
          'Leader': 92,
          'Innovator': 78,
        },
      }),
    });
    const student = await response.json();
    console.log(`✅ Created: ${response.status}`, student);
    const studentId = student.id;
    console.log();

    // Get all students
    console.log('3️⃣  Fetching all students...');
    response = await fetch(`${BASE_URL}/api/students`);
    const students = await response.json();
    console.log(`✅ Found ${students.length} students`);
    console.log();

    // Get single student
    console.log('4️⃣  Fetching single student...');
    response = await fetch(`${BASE_URL}/api/students/${studentId}`);
    const fetchedStudent = await response.json();
    console.log(`✅ Retrieved: ${response.status}`, fetchedStudent);
    console.log();

    // Update student
    console.log('5️⃣  Updating student...');
    response = await fetch(`${BASE_URL}/api/students/${studentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Updated Student Name',
        archetypes: {
          'Academic Scholar': 90,
          'Leader': 95,
          'Innovator': 88,
        },
      }),
    });
    const updatedStudent = await response.json();
    console.log(`✅ Updated: ${response.status}`, updatedStudent);
    console.log();

    // Delete student
    console.log('6️⃣  Deleting student...');
    response = await fetch(`${BASE_URL}/api/students/${studentId}`, {
      method: 'DELETE',
    });
    const deleteResult = await response.json();
    console.log(`✅ Deleted: ${response.status}`, deleteResult);
    console.log();

    console.log('🎉 All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testAPI();
