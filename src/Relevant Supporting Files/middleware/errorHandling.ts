import { Request, Response } from 'express';

interface Error {
  name?: string;
  stack?: string;
  message?: string;
  status?: number;
}

const errorhandeling = (error: Error, req: Request, res: Response) => {
  const status = error.status || 500;
  const message = error.message || 'something went wrong';
  res.status(status).json({ status, message });
};

export default errorhandeling;

/*async orderProducts(quantity: number, order_id?: string, product_id?: string) {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO order_products (quantity, order_id, product_id ) VALUES($1,$2,$3) RETURNING *`;
      const result = await connection.query(sql, [quantity, order_id, product_id]);
      connection.release;
      return result.rows[0];
    } catch (error) {
      throw new Error(`can not add new products to the order. Error: ${error}`);
    }
  }

*/
