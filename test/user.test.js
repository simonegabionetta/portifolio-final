const request = require('supertest');
const { expect } = require('chai');

describe('users', ()=> {
  describe('POST /users/register', ()=>{
    it('Deve retornar 201 quando o usuário for criado', async() =>{

      const resposta = await request('http://localhost:3000')
        .post('/users/register')
        .set('Content-Type','application/json')
        .send({
            'name': 'maria',
            'email': 'maria3@gmail.com',
            'password': '123456'
          })
      
      console.log(resposta.status, resposta.body)
      expect(resposta.status).to.equal(201);
      expect(resposta.body.name).be.a('string');
      expect(resposta.body.email).be.a('string');
  
    })

  })

})



    


