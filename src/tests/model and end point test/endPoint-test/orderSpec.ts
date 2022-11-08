import supertest from 'supertest';
import app from '../../../index';

const request = supertest(app);

describe('orders endpoints', () => {
  describe('Test CRUD', () => {
    it('create a new order', async () => {
      const response = await request.post('/api/orders');
      expect(response.status).toBe(200);
    });
    it('show all orders', async () => {
      const response = await request.get('/api/orders');
      expect(response.status).toBe(200);
    });
    it('get one order', async () => {
      const response = await request.get('/api/orders/:id');
      expect(response.status).toBe(200);
    });
    it('create products in each order', async () => {
      const response = await request.post('/api/orders/:id/products');
      expect(response.status).toBe(200);
    });
  });
});
