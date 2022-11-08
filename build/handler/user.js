"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const express_1 = require("express");
//import verifyAuthToken from '../Relevant Supporting Files/middleware/authentication';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
//import Verify from '../Relevant Supporting Files/middleware/authentication';
dotenv_1.default.config();
const secretToken = process.env.TOKEN_SECRET;
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
const userRoutes = (0, express_1.Router)();
const usersModel = new user_1.UsersModel();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usersModel.create(req.body);
        const token = jsonwebtoken_1.default.sign({ user }, secretToken);
        res.json({
            data: Object.assign(Object.assign({}, user), { token })
        });
    }
    catch (error) {
        res.json(error);
    }
});
//show all users
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = String(req.headers.authorization);
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secretToken);
        const user = yield usersModel.index();
        res.json({
            data: user,
            message: 'All users returned sucessfully'
        });
    }
    catch (error) {
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = String(req.headers.authorization);
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secretToken);
        const user = yield usersModel.show(req.params.id);
        res.json({
            data: user,
            message: 'user is returned sucessfully'
        });
    }
    catch (error) {
        res.json(error);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield usersModel.authenticate(email, password);
        const token = jsonwebtoken_1.default.sign({ user }, secretToken);
        if (!user) {
            return res.json('error');
        }
        else {
            return res.json({
                data: Object.assign(Object.assign({}, user), { token }),
                message: 'authenticated successfully'
            });
        }
    }
    catch (error) {
        res.json(error);
    }
});
// api/users
userRoutes.post('/', create);
userRoutes.get('/', index);
userRoutes.get('/:id', show);
// api/users/authenticate
userRoutes.post('/authenticate', authenticate);
exports.default = userRoutes;
