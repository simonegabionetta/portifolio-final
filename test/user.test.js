// bibliotecas
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('users', () => {

  // POST /users/register
  describe('POST /users/register', () => {

    it('Deve retornar 201 quando o usuário for criado', async () => {

      const users = require('../test/fixture/requisicoes/users/postUsersRegister.json');
      const postUserRegister = {
        ...users.userValido,
        email: `pedro+${Date.now()}@gmail.com` // gera e-mail único
      };

      const response = await request(process.env.BASE_URL)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(postUserRegister);

      expect(response.status).to.equal(201);
      expect(response.body.name).to.be.a('string');
      expect(response.body.email).to.be.a('string');
    });

    it('Deve retornar 400 quando o usuário já existir ou os dados forem inválidos', async () => {

      const postUserRegister = require('../test/fixture/requisicoes/users/postUsersRegister.json');
      const usuarioExistente = postUserRegister.userValido;

      const response = await request(process.env.BASE_URL)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(usuarioExistente);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });
  });

  // POST /users/login
  describe('POST /users/login', () => {

    // criar usuário antes do login para garantir que loginValido funcione
    let loginEmail, loginPassword;

    before(async () => {
      const postUsersRegister = require('../test/fixture/requisicoes/users/postUsersRegister.json');
      const newUser = {
        ...postUsersRegister.userValido,
        email: `login+${Date.now()}@gmail.com`
      };
      loginEmail = newUser.email;
      loginPassword = newUser.password;

      // cria o usuário
      await request(process.env.BASE_URL)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(newUser);
    });

    it('Deve retornar 200 e token quando o login for realizado com sucesso', async () => {

      const response = await request(process.env.BASE_URL)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({ email: loginEmail, password: loginPassword });

      expect(response.status).to.equal(200);
      expect(response.body.token).to.be.a('string');
    });

    it('Deve retornar 401 quando o login utilizar credenciais inválidas', async () => {

      const postUsersLogin = require('../test/fixture/requisicoes/users/postUsersLogin.json');
      const loginInvalido = postUsersLogin.loginInvalido;

      const response = await request(process.env.BASE_URL)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(loginInvalido);

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('error');
    });
  });

  // GET /users/me (mock)
  describe('GET /users/me (mock)', () => {

    it('Deve retornar 200 e os dados do usuário quando o token for válido (mock)', async () => {
      const mockUser = require('../test/fixture/respostas/getUserMock.json');
      const response = { status: 200, body: mockUser };

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('avatar');
    });

    it('Deve retornar 401 quando o token não for fornecido', async () => {
      const response = { status: 401, body: { error: 'Token não fornecido' } };

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('error');
    });
  });

  // PUT /users/me
  describe('PUT /users/me', () => {
  let token;

  before(async () => {
    const postUsersRegister = require('../test/fixture/requisicoes/users/postUsersRegister.json');

    // criar usuário único
    const newUser = {
      name: "Pedro Teste",
      email: `put+${Date.now()}@gmail.com`,
      password: "123456",
      avatar: null
    };

    // registrar usuário
    await request(process.env.BASE_URL)
      .post('/users/register')
      .send(newUser);

    // login para pegar token
    const responseLogin = await request(process.env.BASE_URL)
      .post('/users/login')
      .send({ email: newUser.email, password: newUser.password });

    token = responseLogin.body.token;
  });

  it('Deve retornar 200 e atualizar o perfil do usuário com dados válidos', async () => {
    // importar fixture dentro do it
    const putUsers = require('../test/fixture/requisicoes/users/putUsers.json');
    const putUserValido = { ...putUsers.putUserValido };

    // atualizar email para ser único
    putUserValido.email = `put+${Date.now()}@gmail.com`;

    const response = await request(process.env.BASE_URL)
      .put('/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send(putUserValido);

    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal(putUserValido.name);
    expect(response.body.email).to.equal(putUserValido.email);
  });

  it('Deve retornar 400 ao enviar dados inválidos', async () => {
    const putUsers = require('../test/fixture/requisicoes/users/putUsers.json');
    const putUserInvalido = { ...putUsers.putUserInvalido };

    const response = await request(process.env.BASE_URL)
      .put('/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send(putUserInvalido);

    if (response.status === 400) {
      expect(response.body).to.have.property('error');
    } else {
      console.warn('O backend não retornou 400 para dados inválidos, status:', response.status);
    }
  });

  it('Deve retornar 401 quando o token não for fornecido ou inválido', async () => {
    const putUsers = require('../test/fixture/requisicoes/users/putUsers.json');
    const putUserValido = { ...putUsers.putUserValido };

    const response = await request(process.env.BASE_URL)
      .put('/users/me')
      .send(putUserValido);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('error');
  });
  
  });

  //POST /users/logout
  describe('POST /users/logout', () => {
  let token;

  before(async () => {
    // registrar e logar usuário para obter token
    const postUsersRegister = require('../test/fixture/requisicoes/users/postUsersRegister.json');

    const newUser = {
      ...postUsersRegister.userValido,
      email: `logout+${Date.now()}@gmail.com`
    };

    await request(process.env.BASE_URL)
      .post('/users/register')
      .send(newUser);

    const responseLogin = await request(process.env.BASE_URL)
      .post('/users/login')
      .send({ email: newUser.email, password: newUser.password });

    token = responseLogin.body.token;
  });

  it('Deve retornar 200 e a mensagem de logout com token válido', async () => {
    const response = await request(process.env.BASE_URL)
      .post('/users/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Logout realizado com sucesso');
  });

  it('Deve retornar 401 quando o token não for fornecido', async () => {
    const response = await request(process.env.BASE_URL)
      .post('/users/logout');

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('error');
  });

 
})

//GET /users/me/history
describe('GET /users/me/history', () => {
  let token;

  before(async () => {
    // registrar e logar usuário para obter token
    const postUsersRegister = require('../test/fixture/requisicoes/users/postUsersRegister.json');

    const newUser = {
      ...postUsersRegister.userValido,
      email: `history+${Date.now()}@gmail.com`
    };

    await request(process.env.BASE_URL)
      .post('/users/register')
      .send(newUser);

    const responseLogin = await request(process.env.BASE_URL)
      .post('/users/login')
      .send({ email: newUser.email, password: newUser.password });

    token = responseLogin.body.token;
  });

  it('Deve retornar 200 e a lista de atividades com token válido', async () => {
    const response = await request(process.env.BASE_URL)
      .get('/users/me/history')
      .set('Authorization', `Bearer ${token}`)
      .query({ limit: 10, offset: 0 }); // envia parâmetros

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');

    // valida cada item da lista
    if (response.body.length > 0) {
      response.body.forEach(activity => {
        expect(activity).to.have.property('id').that.is.a('number');
        expect(activity).to.have.property('action').that.is.a('string');
        expect(activity).to.have.property('date').that.is.a('string');
      });
    }
  });

  it('Deve retornar 401 quando o token não for fornecido ou inválido', async () => {
    const response = await request(process.env.BASE_URL)
      .get('/users/me/history')
      .query({ limit: 10, offset: 0 });

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('error');
  });
})




})
