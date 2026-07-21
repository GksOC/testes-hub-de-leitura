/// <reference types="cypress" />

describe('Testes de API com intercept', () => {

    beforeEach(() => {
        cy.visit('/login.html');
    });

    it('Login usando Intercept', () => {
        cy.intercept('POST', 'api/login', 
            {
                statusCode: 200,
                body: {
                    authToken: "token123",
                    name: "usuário de Teste"
                }
            }
        ).as('loginMock');

        cy.login('usuario@teste.com', 'user123');
        cy.wait('@loginMock');
    });

    it('Simulando erro de servidor', () => {
        cy.intercept('POST', 'api/login', {statusCode: 500}).as('erroServer');

        cy.login('usuario@teste.com', 'user123');
        cy.wait('@erroServer');
    });

    it('Simulando erro do cliente', () => {
        cy.intercept('POST', 'api/login', 
            {
                statusCode: 400,
                body: { erro: 'erro do cliente' }
            }
        ).as('erroCliente');

        cy.login('usuario@teste.com', 'user123');
        cy.wait('@erroCliente');
    });
});