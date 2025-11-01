const request = require('supertest');
require('dotenv').config();

const obterToken = async(email, password)
const responseLogin = await request(process.env.BASE_URL)
    .post('/users/login')
    .set('Content-Type','application/json')
    .send({
        email, password 
  
    })
    
    if (responseLogin.status !== 200 || !responseLogin.body.token) {
        throw new Error(`Falha ao obter token: ${responseLogin.body.error || 'Erro desconhecido'}`);
    }

    return responseLogin.body.obterToken

    module.export= {
        obterToken
    }