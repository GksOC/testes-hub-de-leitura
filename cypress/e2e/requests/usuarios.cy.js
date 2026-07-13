/// <reference types="cypress"/>
import { faker } from "@faker-js/faker";

let token = "";

beforeEach(() => {
    cy.geraToken( "admin@biblioteca.com", "admin123").then(tkn => {
        token = tkn;
    });
});


describe('GET - Teste de API - Gestão de Usuários', () => {

    // it.only('Teste de token', () => {
    //     cy.geraToken( "admin@biblioteca.com", "admin123").then(tkn => {
    //         cy.api({
    //             method: 'GET',
    //             url: '/api/users',
    //             headers: { 'Authorization': tkn }
    //         }).should(response => {
    //             expect(response.status).to.eq(200);
    //             expect(response.body.users).to.be.an('array');
    //         });
    //     });
    // });
    
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
            url: '/api/users/68',
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
            expect(response.body.users[0]).to.have.property('id');
            expect(response.body.users[0]).to.have.property('name');
            expect(response.body.users[0]).to.have.property('email');
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

describe('PUT - Teste de API - Gestão de Usuários', () => {
    it.skip('Deve atualizar um usuário específico com sucesso', () => {
        let id = 68;
        cy.api({
            method: 'PUT',
            url: `/api/users/${id}`,
            body: {
                "name": "Willian H.A. Irons",
                "email": "GksOC@Family.Irons",
                "password": "novaSenha@123"
            },
            headers: { 'Authorization': token }
        }).should(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Usuário atualizado com sucesso.");
        });
    });

    //este aqui é um teste que garante que a requisição funcione indepentemente da entrada de um ID
    it('Deve atulizar um usuário com sucesso - de forma independente', () => {
        let email = faker.internet.email()
        cy.criarUsuario(faker.person.firstName(), email, faker.internet.password()).then(userId => {
            cy.api({
                method: 'PUT',
                url: `/api/users/${userId}`,
                body: {
                    "name": faker.person.fullName(),
                    "email": email,
                    "password": faker.internet.password()
                },
                headers: { 'Authorization': token }
            }).should(response => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq("Usuário atualizado com sucesso.");
            });
        });
    });
});

describe('DELETE - Teste de API - Gestão de Usuários', () => {

    it.skip('Deve excluir um usuário específico com sucesso', () => {
        let id = 91;
        cy.api({
            method: 'DELETE',
            url: `/api/users/${id}`,
            headers: { 'Authorization': token }
        }).should(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('usuário removido com sucesso.');
        });
    });

    it('Deve excluir um usuário com sucesso - de forma independente', () => {
        let email = faker.internet.email()
        cy.criarUsuario(faker.person.firstName(), email, faker.internet.password()).then(userId => {
            cy.api({
                method: 'DELETE',
                url: `/api/users/${userId}`,
                headers: { 'Authorization': token }
            }).should(response => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq("Usuário removido com sucesso.");
            });
        });
    });
});