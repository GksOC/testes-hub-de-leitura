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

//Pages
import { faker } from "@faker-js/faker";

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


 //API
 Cypress.Commands.add('geraToken', (email, senha) => {
   cy.request({
      method: 'POST',
      url: '/api/login',
      body: {
         "email": email,
         "password": senha
      }
   }).then((response) => {
      expect(response.status).to.equal(200);
      return response.body.token
   });
 });

Cypress.Commands.add('criarUsuario', (nome, email, senha) => {
   cy.api({
      method: 'POST',
      url: '/api/users',
      body: {
         "name": nome,
         "email": email,
         "password": senha
      }
   }).then(response => {
      expect(response.status).to.eq(201);
      return response.body.user.id
   })
});

Cypress.Commands.add('criarLivroValido', (token) => {
   cy.api({
      method: 'POST',
      url: '/api/books',
      body: livroBody(),
      headers: { 'Authorization': token } //validando login somente admin
   }).then(response => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal("Livro criado com sucesso.");
      return response.body.book.id;
   });
});

Cypress.Commands.add('criarLivroCustom', (token, modificadores = []) => {
   let template = JSON.stringify(livroBody());

   if (modificadores && Array.isArray(modificadores)) {
      modificadores.forEach(({ prop, valor }) => {
         if (prop && valor !== undefined) {
            // Cria a regex para encontrar a chave e substituir o valor mantendo a estrutura JSON
            //Verifica se a propiedade recebe texto, números ou valores boolean
            const regex = new RegExp(`("${prop}":\\s*)("[^"]*"|\\d+|true|false|null)`, 'g');
            
            // Formata o novo valor caso ele precise de aspas (se for string)
            const valorFormatado = typeof valor === 'string' ? `"${valor}"` : valor;
            
            template = template.replace(regex, `$1${valorFormatado}`);
         }   
      });
   } else {
      throw new Error("O parâmetro de modificadores precisa ser um Array.");
   }

   return cy.request({
      method: 'POST',
      url: '/api/books',
      body: JSON.parse(template), 
      failOnStatusCode: false,
      headers: { 'Authorization': token }
   });
});

function livroBody (){
   return {
      title: faker.book.title(),
      author: faker.book.author(),
      description: faker.hacker.phrase(),
      category: "Literatura Estrangeira",
      isbn: "978-85-260-1320-6",
      editor: faker.book.publisher(),
      language: "Inglês",
      publication_year: Math.floor(Math.random() * (2025 - 1946) + 1946),
      pages: Math.floor(Math.random() * (919) + 80),
      format: "Físico",
      total_copies: 4,
      available_copies: 4
   };
}