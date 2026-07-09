/// <reference types="cypress"/>
import livros from "../fixtures/livros.json";

describe('Busca no católogo', () => {

    beforeEach(() => {
       cy.visit('catalog.html'); 
    });

    //teste 1
    it('Deve fazer a busca do livro 1984 com sucesso', () => {
        cy.get('#search-input').type('1984');

        //resultado
        cy.get('.card-title').should('contain', '1984');
    });

    //teste 2
    it('Deve fazer a busca de livros aleatórios', () => {
        let i = Math.floor(Math.random() * (livros.length));
        cy.get('#search-input').type(livros[i].livro);

        //resultado
        cy.get('.card-title').should('contain', livros[i].livro);
    });

    //teste 3
    //Esse daqui literalmente faz a mesma coisa que o anterior só que com mais código, não entendi a diferença kkkk (mudei pra categoria pra ter uma diferença)
    it('Deve fazer a busca de livros usando Fixture do Cypress', () => {
        let i = Math.floor(Math.random() * (livros.length));
        cy.fixture('livros').then( (catalogo) => {
            cy.get('#search-input').type(catalogo[i].categoria);
            cy.get('.card-body').should('contain', catalogo[i].categoria);
        });
    });

    //teste 4
    it('Deve validar todos os livros da lista', () => {
        cy.fixture('livros').then( (catalogo) => {
            catalogo.forEach(item => {
                cy.get('#search-input').clear().type(item.livro);
                cy.get('.card-title').should('contain', item.livro);
            });
        });
    });


});