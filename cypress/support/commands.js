// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (usuario, senha) => { 
    //para ocultar as informações durante a depuração do cypress, utilize o Pass {log: false}
    cy.get('#email').type(usuario, {log: false});
    cy.get('#password').type(senha, {log: false});
    cy.get('#login-btn').click();

    //resultado
    cy.url().should('include', 'dashboard');
 });

 Cypress.Commands.add('preencherCadastro', (nome, email, telefone, senha, confSenha) => {
    cy.get('#name').type(nome);
    cy.get('#email').type(email);
    cy.get('#phone').type(telefone);
    cy.get('#password').type(senha);
    cy.get('#confirm-password').type(confSenha);
    cy.get('#terms-agreement').check();
    cy.get('#register-btn').click();

    //resultado
    cy.url().should('include', '/dashboard.html');
 });