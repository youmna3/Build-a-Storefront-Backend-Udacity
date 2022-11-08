import supertest from 'supertest';
import app from '../../../index';
//import { Product, ProductModel } from "../../../model/product";
//import db from '../../../database';

//const productModel = new ProductModel();
const request = supertest(app);

describe('product endpoints', () => {
  describe('Test CRUD', () => {
    it('create a new product', async () => {
      const response = await request.post('/api/products');
      expect(response.status).toBe(200);
    });
    it('show all products', async () => {
      const response = await request.get('/api/products');
      expect(response.status).toBe(200);
    });
    it('get one product', async () => {
      const response = await request.get('/api/products/:id');
      expect(response.status).toBe(200);
    });
  });
});
