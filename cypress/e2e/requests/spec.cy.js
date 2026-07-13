/// <reference types="cypress" />

describe('Template spec', () => {
    it('passes', () => {
        cy.api('http://localhost:3000/api/books');
    });
});