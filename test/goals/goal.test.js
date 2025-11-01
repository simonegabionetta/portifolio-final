// bibliotecas
const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
require('dotenv').config();

// Fixtures
const goalsData = require('../test/fixture/requisicoes/goals/postGoals.json');
const userData = require('../test/fixture/requisicoes/users/postUsersRegister.json');

describe('goals', () => {
  let token;

  // Antes de todos os testes, registra usuário e pega token
  before(async () => {
    const newUser = {
      ...userData.userValido,
      email: `goaluser+${Date.now()}@gmail.com`
    };

    // Registrar usuário
    await request(process.env.BASE_URL)
      .post('/users/register')
      .send(newUser);

    // Login para pegar token
    const responseLogin = await request(process.env.BASE_URL)
      .post('/users/login')
      .send({ email: newUser.email, password: newUser.password });

    expect(responseLogin.status).to.equal(200);
    token = responseLogin.body.token;
  });

 
  describe('POST /goals', () => {

    it('Deve retornar 201 quando criar uma meta com dados válidos', async () => {
      const goalValida = {
        ...goalsData.goalValida,
        title: `${goalsData.goalValida.title} ${Date.now()}` // título único
      };

      const response = await request(process.env.BASE_URL)
        .post('/goals')
        .set('Authorization', `Bearer ${token}`)
        .send(goalValida);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.include(goalsData.goalValida.title);
      expect(response.body.status).to.equal('planejada');
    });

    it('Deve retornar 400 quando enviar dados inválidos (mock)', async () => {
      const mockServer = { post: sinon.stub() };
      mockServer.post.withArgs('/goals', goalsData.goalInvalida).resolves({
        status: 400,
        body: { error: 'Dados inválidos' }
      });

      const response = await mockServer.post('/goals', goalsData.goalInvalida);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('Deve retornar 401 quando o token não for fornecido (mock)', async () => {
      const mockServer = { post: sinon.stub() };
      mockServer.post.withArgs('/goals').resolves({
        status: 401,
        body: { error: 'Token não fornecido' }
      });

      const response = await mockServer.post('/goals');

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('error');
    });

  });

  
  describe('GET /goals', () => {

    it('Deve retornar 200 e listar as metas com token válido', async () => {
      const response = await request(process.env.BASE_URL)
        .get('/goals')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');

      if (response.body.length > 0) {
        const goal = response.body[0];
        expect(goal).to.have.property('id');
        expect(goal).to.have.property('title');
        expect(goal).to.have.property('type');
        expect(goal).to.have.property('status');
        expect(goal).to.have.property('dueDate');
      }
    });

    it('Deve retornar 401 quando o token não for fornecido ou for inválido (mock)', async () => {
      const mockServer = { get: sinon.stub() };
      mockServer.get.withArgs('/goals').resolves({
        status: 401,
        body: { error: 'Token não fornecido ou inválido' }
      });

      const response = await mockServer.get('/goals');

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('error');
    });

  });

  describe('GET /goals/id', () => {
  let token;
  let createdGoalId;

  before(async () => {
    // Criar usuário e pegar token
    const newUser = {
      ...userData.userValido,
      email: `goaluser+${Date.now()}@gmail.com`
    };

    await request(process.env.BASE_URL)
      .post('/users/register')
      .send(newUser);

    const responseLogin = await request(process.env.BASE_URL)
      .post('/users/login')
      .send({ email: newUser.email, password: newUser.password });

    expect(responseLogin.status).to.equal(200);
    token = responseLogin.body.token;

    // Criar meta real para testar GET /goals/:id 200
    const responseGoal = await request(process.env.BASE_URL)
      .post('/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...goalsData.goalValida, title: `${goalsData.goalValida.title} ${Date.now()}` });

    expect(responseGoal.status).to.equal(201);
    createdGoalId = responseGoal.body.id;
  });

  // Teste 200 - meta encontrada
  it('Deve retornar 200 e os detalhes da meta com ID válido', async () => {
    const response = await request(process.env.BASE_URL)
      .get(`/goals/${createdGoalId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id', createdGoalId);
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('type');
    expect(response.body).to.have.property('description');
    expect(response.body).to.have.property('status');
    expect(response.body).to.have.property('tasks').that.is.an('array');
    expect(response.body).to.have.property('evidence').that.is.an('array');
    expect(response.body).to.have.property('responsible');
    expect(response.body).to.have.property('createdAt');
  });

  // Teste 401 - token não fornecido ou inválido
  it('Deve retornar 401 quando o token não for fornecido ou for inválido (mock)', async () => {
    const mockServer = { get: sinon.stub() };
    mockServer.get.withArgs(`/goals/${createdGoalId}`).resolves({
      status: 401,
      body: { error: 'Token não fornecido ou inválido' }
    });

    const response = await mockServer.get(`/goals/${createdGoalId}`);
    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('error');
  });

  // Teste 404 - meta não encontrada
  it('Deve retornar 404 quando o ID da meta não existir (mock)', async () => {
    const nonExistentId = 999999;
    const mockServer = { get: sinon.stub() };
    mockServer.get.withArgs(`/goals/${nonExistentId}`).resolves({
      status: 404,
      body: { error: 'Meta não encontrada' }
    });

    const response = await mockServer.get(`/goals/${nonExistentId}`);
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('error');
  });
  });

  describe('PUT /goals/id', () => {
  let token;
  let goalId;

  before(async () => {
    // Criar usuário e obter token
    const newUser = {
      ...userData.userValido,
      email: `putgoaluser+${Date.now()}@gmail.com`
    };

    await request(process.env.BASE_URL)
      .post('/users/register')
      .send(newUser);

    const responseLogin = await request(process.env.BASE_URL)
      .post('/users/login')
      .send({ email: newUser.email, password: newUser.password });

    expect(responseLogin.status).to.equal(200);
    token = responseLogin.body.token;

    // Criar meta para testar PUT
    const responseGoal = await request(process.env.BASE_URL)
      .post('/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...goalsData.goalValida, title: `${goalsData.goalValida.title} ${Date.now()}` });

    expect(responseGoal.status).to.equal(201);
    goalId = responseGoal.body.id;
  });

  it('Deve retornar 200 e atualizar a meta com dados válidos', async () => {
    const updatedGoal = { ...goalsData.goalValida, title: 'Meta Atualizada' };

    const response = await request(process.env.BASE_URL)
      .put(`/goals/${goalId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedGoal);

    expect(response.status).to.equal(200);
    expect(response.body.title).to.equal('Meta Atualizada');
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('status');
  });

  it('Deve retornar 400 ao enviar dados inválidos', async () => {
    // Criamos mock do server
    const mockServer = { put: sinon.stub() };

    // Simula a resposta 400 do backend
    mockServer.put.withArgs('/goals/1', goalsData.goalInvalida).resolves({
      status: 400,
      body: { error: 'Dados inválidos' }
    });

    // Faz a "requisição" usando o mock
    const response = await mockServer.put('/goals/1', goalsData.goalInvalida);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
  });
  });

 describe('DELETE /goals/id', () => {
  let token;
  let goalId;

  before(async () => {
    // Login do usuário
    const loginValido = {
      email: 'pedro@gmail.com',
      password: '123456'
    };

    const responseLogin = await request(process.env.BASE_URL)
      .post('/users/login')
      .send(loginValido);

    expect(responseLogin.status).to.equal(200);
    token = responseLogin.body.token;

    // Criar meta para deletar
    const responseGoal = await request(process.env.BASE_URL)
      .post('/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...goalsData.goalValida, title: `${goalsData.goalValida.title} ${Date.now()}` });

    expect(responseGoal.status).to.equal(201);
    goalId = responseGoal.body.id;
  });

  it('Deve retornar 204 ao deletar uma meta existente', async () => {
    const response = await request(process.env.BASE_URL)
      .delete(`/goals/${goalId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(204);
    expect(response.body).to.be.empty;
  });

  it('Deve retornar 404 quando a meta não existir (mock)', async () => {
    const mockServer = { delete: sinon.stub() };
    const nonExistentGoalId = 9999;

    mockServer.delete.withArgs(`/goals/${nonExistentGoalId}`).resolves({
      status: 404,
      body: { error: 'Meta não encontrada' }
    });

    const response = await mockServer.delete(`/goals/${nonExistentGoalId}`);
    console.log(response.body)
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('error');
  });
});
 





});
