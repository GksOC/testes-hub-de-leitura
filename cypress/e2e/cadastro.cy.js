/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import CadastroPage from "../support/pages/cadastro-page.js";

describe('Cadastro no Hub de Leitura', () => { 

    beforeEach(() => {
        CadastroPage.visitarPaginaCadastro();
    });

    //teste 1
    it.skip('Deve fazer cadastro com sucesso', () => {
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
    it('Deve fazer cadastro com sucesso, usando Faker', () => {
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

    //teste 3
    it('Deve preencher cadastro com sucesso (comando custom)', () => {
        let password = faker.internet.password();
        cy.preencherCadastro(
            faker.person.fullName(),
            faker.internet.email(),
            faker.phone.number(),
            password,
            password,
        );
    });

    //teste 4
    //É muito parecido com o anterior, mas está bem mais separado do que usando o "commands.js" que é mais "global"
    it('Deve preencher cadastro com sucesso (usando Page Objects)', () => {
        let password = faker.internet.password();
        CadastroPage.preencherCadastro(
            faker.person.fullName(),
            faker.internet.email(),
            faker.phone.number(),
            password,
            password,
        );
    });

}); 