import { UsersModel } from '../model/user';
import { Request, Response, Router } from 'express';
//import verifyAuthToken from '../Relevant Supporting Files/middleware/authentication';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//import Verify from '../Relevant Supporting Files/middleware/authentication';
dotenv.config();
const secretToken = process.env.TOKEN_SECRET as string;
/*
const verifyAuthToken = (req: Request, res: Response): void => {
  try {
    const authorizationHeader = String(req.headers.authorization) 
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, secretToken) ;
    
  } catch (error) {
    res.json(error);
  }
};
*/
const userRoutes = Router();
const usersModel = new UsersModel();

const create = async (req: Request, res: Response) => {
  try {
    const user = await usersModel.create(req.body);
    const token = jwt.sign({ user }, secretToken);
    res.json({
      data: { ...user, token }
    });
  } catch (error) {
    res.json(error);
  }
};
//show all users
const index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = String(req.headers.authorization);
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, secretToken);
    const user = await usersModel.index();
    res.json({
      data: user,
      message: 'All users returned sucessfully'
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
    const user = await usersModel.show(req.params.id);
    res.json({
      data: user,
      message: 'user is returned sucessfully'
    });
  } catch (error) {
    res.json(error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.authenticate(email, password);
    const token = jwt.sign({ user }, secretToken);
    if (!user) {
      return res.json('error');
    } else {
      return res.json({
        data: { ...user, token },
        message: 'authenticated successfully'
      });
    }
  } catch (error) {
    res.json(error);
  }
};
// api/users
userRoutes.post('/', create);
userRoutes.get('/', index);
userRoutes.get('/:id', show);

// api/users/authenticate
userRoutes.post('/authenticate', authenticate);

export default userRoutes;
