/// <reference types="cypress" />

describe('Cadastro no Hub de Leitura', () => { 

    beforeEach(() => {
        cy.visit('/register.html');
    });

    //teste 1
    it('Deve fazer cadastro com sucesso', () => {
        let email = `teste${Date.now()}@email.com`;

        cy.get('#name').type('Guilherme Cantarino');
        cy.get('#email').type(email);
        cy.get('#phone').type('31999999999');
        cy.get('#password').type('Senha123');
        cy.get('#confirm-password').type('Senha123');
        cy.get('#terms-agreement').check();
        cy.get('#register-btn').click();

        //resultado
        cy.url().should('include', '/dashboard.html');
    });

}); 