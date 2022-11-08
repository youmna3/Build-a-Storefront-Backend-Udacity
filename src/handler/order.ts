import { OrderModel } from '../model/order';

import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const secretToken = process.env.TOKEN_SECRET as string;

const orderRoutes = Router();

const orderModel = new OrderModel();

const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = String(req.headers.authorization);
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, secretToken);

    const order = await orderModel.create(req.body);
    res.json({
      data: { ...order }
    });
  } catch (error) {
    res.json(error);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = String(req.headers.authorization);
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, secretToken);
    const order = await orderModel.index();
    res.json({
      data: order
    });
  } catch (error) {
    res.json(error);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = String(req.headers.authorization);
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, secretToken);

    const order = await orderModel.show(req.params.id as unknown as number);
    res.json({
      data: { order }
    });
  } catch (error) {
    res.json(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  /*const quantity: number = _req.body.quantity
  const order_id = _req.params.id  as string
  const product_id = _req.body
  */
  try {
    const authorizationHeader = String(req.headers.authorization);
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, secretToken);
    const addedProduct = await orderModel.addProduct(req.body);
    res.json({
      data: { ...addedProduct }
    });
  } catch (error) {
    res.json(error);
  }
};

/*const addProduct = async (req: Request, res: Response) => {
  const quantity: number = parseInt(req.body.quantity);
  const order_id: string = req.params.id;
  const product_id: string = req.body;

  try {
    const addedProduct = await orderModel.addProduct(quantity, order_id, product_id);
    res.json(addedProduct);
  } catch (error) {
    res.json(error);
  }
};
*/
orderRoutes.post('/', create);
orderRoutes.get('/', index);
orderRoutes.get('/:id', show);
orderRoutes.post('/:id/products', addProduct);

export default orderRoutes;

/*const orderProducts = async(req:Request, res:Response) =>{
  const orderId: string = (req.params.id)
    const productId:string = req.body.productId
    const quantity:number = parseInt(req.body.quantity)
try {
    const addedProduct = await orderModel.orderProducts(quantity, productId, orderId)
    res.json({
      data:{... addedProduct}
    })
  } catch (error) {
    res.json(error)
  }
}
*/
