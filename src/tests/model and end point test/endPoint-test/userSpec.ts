/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/*
import supertest from 'supertest';
import app from '../../../index';
import { User, UsersModel } from '../../../model/user';
import db from '../../../database';
import { response } from 'express';

const usersModel = new UsersModel();
const request = supertest(app);
let token: string = '';

describe('user endpoints', () => {
  beforeAll(async () => {
    const user = {
      //id:1,
      email: 'test@ymail.com',
      first_name: 'first',
      last_name: 'test',
      password: 'test'
    } as User;
    await usersModel.create(user);
  });
  afterAll(async () => {
    const connection = await db.connect();
    const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
  describe('Test Auth method',()=>{
    it('authentication method',async ()=> {
      const response = await request.post('/api/users/authenticate')
      expect(response.status).toBe(200);
    })
  })
  describe('test CRUD', () => {
    const token: string = ' ';

    it('create new user', async () => {
      const response = await request.post('/api/users/').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('show all users', async () => {
      const response = await request.get('/api/users/').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
    it('get user', async () => {
      const response = await request.get('/api/users/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
*/

import supertest from 'supertest';
import app from '../../../index';
import { User, UsersModel } from '../../../model/user';
import db from '../../../database';

const usersModel = new UsersModel();
const request = supertest(app);
//let token: string = '';

describe('user endpoints', () => {
  beforeAll(async () => {
    const user = {
      id: 1,
      email: 'test@ymail.com',
      first_name: 'first',
      last_name: 'test',
      password: 'test'
    } as User;
    await usersModel.create(user);
  });
  afterAll(async () => {
    const connection = await db.connect();
    const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
  describe('Test Auth method', () => {
    it('authentication method', async () => {
      const response = await request.post('/api/users/authenticate');
      expect(response.status).toBe(200);
    });
  });
  describe('test CRUD', () => {
    const token: string = ' ';

    it('create new user', async () => {
      const response = await request
        .post('/api/users/')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 2,
          email: 'test2@ymail.com',
          first_name: 'second',
          last_name: 'testt'
          //password: 'test'
        });
      expect(response.status).toBe(200);
      const { id, email, first_name, last_name } = response.body.data;
      expect(id).toBe(2);
      expect(email).toBe('test2@ymail.com');
      expect(first_name).toBe('second');
      expect(last_name).toBe('testt');
      //expect(password).toBe('test');
    });

    it('show all users', async () => {
      const response = await request.get('/api/users/').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
    it('get user', async () => {
      const response = await request.get('/api/users/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
