/// <reference types="cypress" />

describe('login no hub de leitura', () => {

    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearLocalStorage();
        cy.visit('/login.html');
    });

    it('Deve fazer login com sucesos com usuário comum via API', () => {
        cy.loginApp(Cypress.env('USER_EMAIL'), Cypress.env('USER_SENHA'));
        cy.visit('/dashboard.html');
        cy.get('h4').should('contain', 'Olá');
    });

    it('Deve fazer login com sucesso com usuário comum - setando o token', () => {
        // let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c3VhcmlvQHRlc3RlLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3ODQ1NzM0MDEsImV4cCI6MTc4NDYwMjIwMX0.IasBGG8jirOaIJ15p4T3tD9Ot-EYPvvypZlMTOAmVQg";
        window.localStorage.setItem('authToken', Cypress.env('TOKEN_USER'));
        
        cy.visit('/dashboard.html');
        cy.get('h4').should('contain', 'Olá');
    })

    it('Deve fazer login com sucesso com usuário admin sem visualizar modal', () => {
        //encontrar o nome do cookie usando a inspeção do DevTools > Aplicativo > Armazenamento > Cookies 
        cy.setCookie('jwt_education_shown', 'true');
        cy.loginApp('admin@biblioteca.com', 'admin123');
        
        cy.visit('/admin-dashboard.html');
        cy.get('h1').should('contain', 'Painel Administrativo');

        // cy.wait(5000);
        // cy.clearAllCookies();
        // cy.reload();
    }); 

    // it.skip('Deve mudar o indioma da Ebac com cookie', () => {
    //     cy.visit('https://lms.ebaconline.com.br');
    //     cy.setCookie('i18n_redirected', 'en');
    //     cy.reload();
    // });
    
});