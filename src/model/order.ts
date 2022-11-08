import db from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: string;
};
export type OrderProduct = {
  id: number;
  quantity: number;
  order_id: string;
  product_id: string;
};

export class OrderModel {
  async create(o: Order): Promise<Order> {
    try {
      //const status  = 'active';
      const connection = await db.connect();
      const sql = `INSERT INTO orders(status, user_id) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(sql, [o.status, parseInt(o.user_id)]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`can not create order. Error: ${error}`);
    }
  }
  async index(): Promise<Order[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM orders`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`can not get all the orders. Error:${error}`);
    }
  }
  async show(id: number): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM orders WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`can not get order id:${id}`);
    }
  }
  async addProduct(op: OrderProduct): Promise<OrderProduct> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO order_products(quantity, order_id, product_id) VALUES ($1, $2,$3) RETURNING *`;
      const result = await connection.query(sql, [op.quantity, op.order_id, op.product_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
/*
  async addProduct(quantity: number, orderId?: string, productId?: string): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *`;
      const result = await connection.query(sql, [quantity, orderId, productId]);
      connection.release;
      return result.rows[0];
    } catch (error) {
      throw new Error('error');
    }
  }
}
*/
