const assert = require('node:assert/strict');
const { test } = require('node:test');

const BASE = 'http://localhost:3000/api';

test('POST /api/deals requires all fields', async () => {
  const res = await fetch(`${BASE}/deals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seller: 'G123' }),
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(body.error);
});

test('GET /api/deals requires userId', async () => {
  const res = await fetch(`${BASE}/deals`);
  assert.equal(res.status, 400);
});

test('GET /api/deals/:id returns 404 for unknown id', async () => {
  const res = await fetch(`${BASE}/deals/nonexistent-id-00000`);
  assert.equal(res.status, 404);
});
