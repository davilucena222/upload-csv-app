import request from 'supertest';
import express from 'express';
import { router } from '../api/users';

const app = express();
app.use(express.json());
app.use('/', router);

vitest.mock('@prisma/client', () => {
  return {
    PrismaClient: vitest.fn().mockImplementation(() => ({
      csvfile: {
        findMany: vitest.fn().mockResolvedValue([
          { name: 'John', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
          { name: 'Alice', city: 'Toronto', country: 'Canada', favorite_sport: 'Tennis' },
        ]),
      },
    })),
  };
});

describe('Search Endpoint', () => {
  it('should search for information in the database based on query param', async () => {
    const response = await request(app).get('/').query({ q: 'John' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { name: 'John', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
      { name: 'Alice', city: 'Toronto', country: 'Canada', favorite_sport: 'Tennis' },
    ]);
  });
});
