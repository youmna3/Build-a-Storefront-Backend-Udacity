import { Router } from 'express';
import userRoutes from '../../handler/user';
import productRoutes from '../../handler/product';
import orderRoutes from '../../handler/order';
//import verifyAuthToken from '../middleware/authentication';
const routes = Router();

routes.use('/users', userRoutes);
routes.use('/products', productRoutes);
routes.use('/orders', orderRoutes);

export default routes;
