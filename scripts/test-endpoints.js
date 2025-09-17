#!/usr/bin/env node

/**
 * Script untuk testing tRPC endpoints
 * Jalankan dengan: node scripts/test-endpoints.js
 */

const BASE_URL = 'http://localhost:3000/api/trpc';

// Helper function untuk hit tRPC endpoint
async function callTRPC(procedure, input = null, type = 'query') {
  const url = new URL(BASE_URL);

  if (type === 'query') {
    // Query menggunakan GET dengan query params
    const params = new URLSearchParams();
    params.append('batch', '1');
    params.append('input', JSON.stringify({ 0: input }));
    url.pathname += `/${procedure}`;
    url.search = params.toString();

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  } else {
    // Mutation menggunakan POST
    const response = await fetch(`${BASE_URL}/${procedure}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    return response.json();
  }
}

// Test functions
async function testGreeting() {
  console.log('🧪 Testing greeting endpoint...');
  try {
    const result = await callTRPC('general.greeting');
    console.log('✅ Greeting result:', result);
  } catch (error) {
    console.log('❌ Greeting error:', error.message);
  }
  console.log('');
}

async function testHealth() {
  console.log('🧪 Testing health endpoint...');
  try {
    const result = await callTRPC('general.health');
    console.log('✅ Health result:', result);
  } catch (error) {
    console.log('❌ Health error:', error.message);
  }
  console.log('');
}

async function testUsersWithoutAuth() {
  console.log('🧪 Testing users endpoint (without auth - should fail)...');
  try {
    const result = await callTRPC('users.list');
    console.log('✅ Users result:', result);
  } catch (error) {
    console.log('❌ Users error (expected):', error.message);
  }
  console.log('');
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting tRPC Endpoint Tests');
  console.log('================================\n');

  await testGreeting();
  await testHealth();
  await testUsersWithoutAuth();

  console.log('================================');
  console.log('✨ Tests completed!');
}

// Run tests if script is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { callTRPC, runTests };
