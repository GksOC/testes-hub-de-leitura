/// <reference types="cypress" />
import reservas from "../../fixtures/reservas.json"

describe('Funcionalidade: Administrar Reservas de livros', () => {

    beforeEach(() => {
        cy.visit('/login.html');
    })
    
    it('Deve exibir as reservas via intercept', () => {
        cy.login('usuario@teste.com', 'user123');
        cy.get('h4').should('contain', 'Olá');

        cy.intercept('GET', 'api/reservations', {
            statusCode: 200,
            body: reservas
        }).as('listarReservas');

        cy.visit('dashboard.html');
        cy.wait('@listarReservas')
    });
})