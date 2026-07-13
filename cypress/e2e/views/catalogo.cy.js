/// <reference types="cypress" />

describe('Catálogo de livros', () => {

    beforeEach(() => {
      cy.visit('/catalog.html');
    });

    //teste 1
    it('Deve clicar no botão Adicinar à cesta de um produto específico', () => {
        cy.get(':nth-child(8) > .card > .card-body > .mt-auto > .d-grid > .btn-primary').click();

        //resultado
        cy.get('#cart-count').should('have.text', '1');
    });

    //teste 2
    it('Deve clicar em todos os botões de Adicionar à cesta disponíveis na página', () => {
        cy.get('.btn-primary').click( {multiple: true} );

        //resultado
        cy.get('#cart-count').should('have.text', '12');
    });

    //teste 3
    it('Deve clicar no primeiro botão de Adicionar à cesta', () => {
        cy.get('.btn-primary').first().click();

        //resultado
        cy.get('#cart-count').should('have.text', '1');
    });

    //teste 4
    it('Deve clicar no último botão de Adicionar à cesta', () => {
        cy.get('.btn-primary').last().click();

        //resultado
        cy.get('#cart-count').should('have.text', '1');
    });

    //teste 5
    it('Deve clicar no 3º item da lista', () => {
        cy.get('.btn-primary').eq(2).click();

        //resultado
        cy.get('#cart-count').should('have.text', '1');
    });

    //teste 6
    it('Deve clicar no nome do (3º) livro e direcionar para a tela do livro', () => {
        cy.get('.card-title').eq(2).click();

        //resultado
        cy.url().should('include', 'book-details');

        cy.get('#add-to-cart-btn').click();

        cy.contains('#alert-container', 'Livro adicionado à cesta com sucesso!').should('be.visible');
        cy.get('#cart-count').should('have.text', '1');
    });
});
