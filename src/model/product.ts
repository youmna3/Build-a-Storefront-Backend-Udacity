import db from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductModel {
  //
  async create(p: Product): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(sql, [p.name, p.price]);
      connection.release;
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create product. Error: ${error}`);
    }
  }

  async index(): Promise<Product[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM products;`;
      const result = await connection.query(sql);
      connection.release;
      return result.rows;
    } catch (error) {
      throw new Error(`could not get products. Error:${error} `);
    }
  }
  async show(id?: string): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM products WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release;
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get product ${id}.Error:${error}`);
    }
  }
}
