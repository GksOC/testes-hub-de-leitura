/// <reference types="cypress" />

describe('template spec', () => {

  //primeira ação antes de cada teste
  beforeEach(() => {
    //cy.visit('http://localhost:3000/index.html') //obsleto após configurar o site base no cypress.config.js
    cy.visit('/index.html');
  });

  //cada teste é um "it"
  //usar "it.only" para rodar apenas um teste
  //it('<titulo do teste>', () => { <bloco de código> }  )
  it('Preencher formulário de contato', () => {
    //cy.visit('http://localhost:3000/index.html')

    cy.get('[name="name"]').type('Guilherme Cantarino');
    cy.get('[name="email"]').type('guilhermeocantarino@gmail.com');
    cy.get('[name="subject"]').select('Dúvidas Gerais');
    cy.get('[name="message"]').type('Olá, gostaria de saber se há mais livros disponíveis além dos que estão listados. Desde já, obrigado!')

    cy.get('#btn-submit').click();
    //para encontrar as mensagens de popup, é preciso clicar na ação do teste e depois em "after" para ver o que acontece depois do clique.
    cy.contains('#alert-container', 'Contato enviado com sucesso!').should('be.visible');
  })

  //teste 2
  it('Validar mensagem de erro ao enviar sem nome', () => {
    //cy.visit('http://localhost:3000/index.html')

    cy.get('[name="name"]').clear();
    cy.get('[name="email"]').type('guilhermeocantarino@gmail.com');
    cy.get('[name="subject"]').select('Dúvidas Gerais');
    cy.get('[name="message"]').type('Olá, gostaria de saber se há mais livros disponíveis além dos que estão listados. Desde já, obrigado!')

    cy.get('#btn-submit').click();
    cy.contains('#alert-container', 'Por favor, preencha o campo Nome.').should('be.visible');
  })

  //teste 3
  it('Validar mensagem de erro ao enviar sem email', () => {
    //cy.visit('http://localhost:3000/index.html')
    
    cy.get('[name="name"]').type('Guilherme Cantarino');
    cy.get('[name="email"]').clear();
    cy.get('[name="subject"]').select('Dúvidas Gerais');
    cy.get('[name="message"]').type('Olá, gostaria de saber se há mais livros disponíveis além dos que estão listados. Desde já, obrigado!')

    cy.get('#btn-submit').click();
    cy.contains('#alert-container', 'Por favor, preencha o campo E-mail.').should('be.visible');
  })

  //teste 4
  it('Validar mensagem de erro ao enviar sem assunto', () => {
    //cy.visit('http://localhost:3000/index.html')
    
    cy.get('[name="name"]').type('Guilherme Cantarino');
    cy.get('[name="email"]').type('guilhermeocantarino@gmail.com');
    //cy.get('[name="subject"]').select('Selecione o assunto...');
    cy.get('[name="message"]').type('Olá, gostaria de saber se há mais livros disponíveis além dos que estão listados. Desde já, obrigado!')

    cy.get('#btn-submit').click();
    cy.contains('#alert-container', 'Por favor, selecione o Assunto.').should('be.visible');
  })

  //teste 5
  it('Validar mensagem de erro ao enviar sem mensagem', () => {
    cy.visit('http://localhost:3000/index.html')
    
    cy.get('[name="name"]').type('Guilherme Cantarino');
    cy.get('[name="email"]').type('guilhermeocantarino@gmail.com');
    cy.get('[name="subject"]').select('Dúvidas Gerais');
    cy.get('[name="message"]').clear();

    cy.get('#btn-submit').click();
    cy.contains('#alert-container', 'Por favor, escreva sua Mensagem.').should('be.visible');
  })

  
})