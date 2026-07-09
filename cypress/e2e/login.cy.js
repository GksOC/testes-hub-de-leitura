/// <reference types="cypress"/>
import user from "../fixtures/usuario.json";

describe('Login no hub', () => {

    beforeEach(() => {
        cy.visit('login.html');
    });

    //teste 1
    it('Deve fazer login com sucesso', () => {
        cy.get('#email').type('usuario2@teste.com');
        cy.get('#password').type('Senha@123');
        cy.get('#login-btn').click();

        //resultado
        cy.url().should('include', 'dashboard');
    }); 

    //teste 2
    it('Deve fazer login com sucesso (comando custom)', () => {
        cy.login('usuario2@teste.com', 'Senha@123');
    });

    //teste 3
    it('Deve fazer login com sucesso com conta Admin (comando custom)', () => {
        cy.login('admin@biblioteca.com', 'admin123');
    });

    //teste 4
    it('Deve fazer login com sucesso (usando massa de dados) ', () => {
        //olhar diretório "../fixtures"
        cy.login(user.email, user.senha)
    });

});
