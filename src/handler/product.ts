import { ProductModel } from '../model/product';
import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const productRoutes = Router();
const productModel = new ProductModel();
const secretToken = process.env.TOKEN_SECRET as string;

const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token as string, secretToken) as string;
    const product = await productModel.create(req.body);
    res.json({
      data: { ...product }
    });
  } catch (error) {
    res.json(error);
  }
};
const index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token as string, secretToken) as string;
    const product = await productModel.index();
    res.json({
      data: product
    });
  } catch (error) {
    res.json(error);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token as string, secretToken) as string;
    const product = await productModel.show(req.params.id);
    res.json({
      data: product
    });
  } catch (error) {
    res.json(error);
  }
};
productRoutes.post('/', create);
productRoutes.get('/', index);
productRoutes.get('/:id', show);

export default productRoutes;
