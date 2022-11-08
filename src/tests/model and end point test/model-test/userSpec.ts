import { User, UsersModel } from '../../../model/user';
import db from '../../../database';

const usersModel = new UsersModel();

describe('users model', () => {
  describe('Test Methods Exists', () => {
    it('should have a create method', () => {
      expect(usersModel.create).toBeDefined();
    });
    it('should have a index method', () => {
      expect(usersModel.index).toBeDefined();
    });
    it('should have a show method', () => {
      expect(usersModel.show).toBeDefined();
    });
    it('should have a authenticate method', () => {
      expect(usersModel.authenticate).toBeDefined();
    });
  });
  describe('test the user model', () => {
    const user = {
      id: 1,
      email: 'test@ymail.com',
      first_name: 'first',
      last_name: 'test'
    } as User;

    afterAll(async () => {
      const connection = await db.connect();
      const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
      await connection.query(sql);
      connection.release();
    });
    it('Create method should return a User', async () => {
      const createdUser = await usersModel.create(user);
      expect(createdUser).toEqual({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      } as User);
    });
    it('index should return an array', async () => {
      const getMany = await usersModel.index();
      expect(getMany.length).toBe(1);
    });
    it('show method should return a user', async () => {
      const getOne = await usersModel.show('1');
      expect(getOne.id).toEqual(user.id);
    });

    it('return authenticated user', async () => {
      const authenticate = await usersModel.authenticate(user.email, user.password);
      expect(authenticate).toEqual(user);
    });
  });
});
