/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

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

    //teste 2
    it.only('Deve fazer cadastro com sucesso, usando Faker', () => {
        let  nome = faker.person.fullName();
        let email = `teste${Date.now()}@email.com`;
        let phone = faker.phone.number('319########');
        let password = faker.internet.password({ length: 8, memorable: true, pattern: /[A-Za-z0-9]/ });

        cy.get('#name').type(nome);
        cy.get('#email').type(email);
        cy.get('#phone').type(phone);
        cy.get('#password').type(password);
        cy.get('#confirm-password').type(password);
        cy.get('#terms-agreement').check();
        cy.get('#register-btn').click();
        //resultado
        cy.url().should('include', '/dashboard.html');
    });
}); 