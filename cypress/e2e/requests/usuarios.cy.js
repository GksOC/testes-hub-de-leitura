/// <reference types="cypress"/>
import { faker } from "@faker-js/faker";

describe('GET - Teste de API - Gestão de Usuários', () => {

    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBiaWJsaW90ZWNhLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc4Mzk2MzAwOSwiZXhwIjoxNzgzOTkxODA5fQ.9Cynq1LAYVKvJ8f6-WHQEhByz_jmxALQEYkPTmZ8SYg";
    
    it('Deve listar usuários com sucesso', () => {
        cy.api({
            method: 'GET',
            url: '/api/users',
            headers: { 'Authorization': token } 
        }).should( response => {
            expect(response.status).to.equal(200);
            expect(response.body.users).to.be.an('array');
        });
    });

    it('Deve validar propriedades de um usuário', () => {
        cy.api({
            method: 'GET',
            url: '/api/users',
            headers: { 'Authorization': token }
        }).should(response => {
            expect(response.status).to.equal(200);
            expect(response.body.users[0]).to.have.property('id');
            expect(response.body.users[0]).to.have.property('name');
            expect(response.body.users[0]).to.have.property('email');
        });
    });

    it('Deve listar um usuário com sucesso buscando por ID', () => {
        cy.api({
            method: 'GET',
            url: '/api/users/2',
            headers: { 'Authorization': token }
        }).should(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('name');
            expect(response.body).to.have.property('email');
        });
    });

    it('Deve listar um usuário com sucesso usando filtro', () => {
        cy.api({
            method: 'GET',
            url: '/api/users',
            headers: { 'Authorization': token },
            qs: { //filtro para o Cypress
                page: 1,
                limit: 20,
                search: 'Gks'
            }
        }).should(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('name');
            expect(response.body).to.have.property('email');
        });
    });

});

describe('POST - Teste de API - GEstão de Usuários', () => {

    it('Deve cadastrar um usuário com sucesso', () =>{
        cy.api({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": faker.person.fullName(),
                "email": faker.internet.email(),
                "password": faker.internet.password()
            }
        }).should(response => {
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal("Usuário criado com sucesso.");
        });
    });

    it('Deve informar usuário com email já cadastrado', () =>{
        cy.api({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": "Maria Santos",
                "email": "maria@email.com",
                "password": "senha123"
            },
            failOnStatusCode: false //isso permitirá que o Cypress valide o teste caso a requisição retorne um erro da família 4xx
        }).should(response => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal("Email já está sendo usado por outro usuário.");
        });
    });

});