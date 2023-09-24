import request from 'supertest';
import express from 'express';
import { router } from '../api/files'; 

const app = express();
app.use(express.json());
app.use('/', router);

describe('CSV File Upload Endpoint should work well', () => {
  it('should upload and parse a CSV file', async () => {
    const csvContent = 'John,Doe,USA,Basketball\nAlice,Smith,Canada,Tennis';
    const response = await request(app)
      .post('/')
      .attach('file', Buffer.from(csvContent), 'test.csv');

    expect(response.status).toBe(200);
    expect(response.body); 
  });
});
