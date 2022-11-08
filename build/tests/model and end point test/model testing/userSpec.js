"use strict";
/*
import { User, UsersModel } from '../../model/user';
import db from '../../database';


const usersModel = new UsersModel();

describe('Testing Model For users', () => {
  it('should include create method', () => {
    expect(usersModel.create).toBeDefined();
  });
  it('user model should include index method', () => {
    expect(usersModel.index).toBeDefined();
  });
  it('should include show method', () => {
    expect(usersModel.show).toBeDefined();
  });
  it('should include authenticate method', () => {
    expect(usersModel.authenticate).toBeDefined();
  });
});

//describe('test user model')
describe('test the logic', () => {
  const user: User = {
    email: 'test@ymail.com',
    first_name: 'first',
    last_name: 'test',
    password: 'test123'
  } as User;

  afterAll(async () => {
    const connection = await db.connect();
    const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);
    connection.release();
  });


  it('create method return a user', async () => {
    const createUser = await usersModel.create(user);
    expect(createUser).toEqual({
      id: 1,
      email: 'test@ymail.com',
      first_name: 'first',
      last_name: 'test',
      password: 'test123'
    });
  });
});

/*
describe('test authentication', () => {
  const user = {
    email: 'test@ymail.com',
    first_name: 'first',
    last_name: 'test',
    password: 'testtest'
  };
});
*/
