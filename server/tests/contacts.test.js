import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';
import User from '../models/User.model.js';
import Contact from '../models/Contact.model.js';

let token;
let userId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || process.env.MONGO_URI);
  await User.deleteMany({ email: 'test@jest.com' });
  const res = await request(app).post('/api/auth/register')
    .send({ name: 'Test User', email: 'test@jest.com', password: 'test1234' });
  token = res.body.token;
  userId = res.body.user.id;
});

afterAll(async () => {
  await Contact.deleteMany({ user: userId });
  await User.deleteMany({ email: 'test@jest.com' });
  await mongoose.disconnect();
});

test('POST /api/contacts — creates a contact', async () => {
  const res = await request(app)
    .post('/api/contacts')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'John Doe', email: 'john@doe.com', tag: 'work' });
  expect(res.status).toBe(201);
  expect(res.body.contact.name).toBe('John Doe');
});

test('GET /api/contacts — returns contact list', async () => {
  const res = await request(app)
    .get('/api/contacts')
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body.contacts)).toBe(true);
});

test('DELETE /api/contacts/:id — soft deletes', async () => {
  const create = await request(app)
    .post('/api/contacts')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'To Delete', email: 'del@test.com' });
  const id = create.body.contact._id;
  const res = await request(app)
    .delete(`/api/contacts/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Moved to trash');
});
