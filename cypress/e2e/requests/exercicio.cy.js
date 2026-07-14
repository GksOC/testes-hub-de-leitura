/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

let token
beforeEach(() => {
    cy.geraToken('admin@biblioteca.com', 'admin123').then(tkn => {
        token = tkn
    })
});

describe('GET - Testes da Funcionalidade Catálogo de Livros', () => {

    // Objetivo: Verificar que a API retorna lista de livros com paginação e filtros funcionando
    // Validar que filtros por categoria e autores funcionam corretamente
    it('GET - Deve listar livros com filtros e paginação', () => {
        let search = '', category = 'Fantasia', author = 'J', available = 'true', limit = 20, offset = 0, orderBy = 'title',  order = 'ASC'
        cy.api({
            method: 'GET',
            url: '/api/books',
            headers: { 'Authorization': token },
            qs: { //filtro para o Cypress
                search: search,
                category: category,
                author: author,
                available: available,
                limit: limit,
                offset: offset,
                orderBy: orderBy,
                order: order
            }
        }).should(response => {
            expect(response.status).to.equal(200);
            response.body.books.forEach(book => {
                expect(book.title).contain(search);
                expect(book.author).contain(search); //"search" também pesquisa nome de autor
                expect(book.author).contain(author);
                expect(book.category).contain(category);
            });
        });
    });
    
    // Objetivo: Validar que é possível obter detalhes de um livro específico pelo ID
    // Verificar que todos os campos do livro são retornados corretamente
    it('GET - Deve obter detalhes de um livro específico', () => {
        let id = 1;
        cy.api({
            method: 'GET',
            url: `/api/books/${id}`,
            headers: { 'Authorization': token }
        }).should(response => {
            expect(response.status).to.equal(200);
            expect(response.body.book.id).to.equal(id);
            expect(response.body.book).to.have.property('title');
            expect(response.body.book).to.have.property('author');
            expect(response.body.book).to.have.property('description');
            expect(response.body.book).to.have.property('category');
            expect(response.body.book).to.have.property('isbn');
            expect(response.body.book).to.have.property('editor');
            expect(response.body.book).to.have.property('language');
            expect(response.body.book).to.have.property('publication_year');
            expect(response.body.book).to.have.property('pages');
            expect(response.body.book).to.have.property('format');
            expect(response.body.book).to.have.property('total_copies');
            expect(response.body.book).to.have.property('available_copies');
            expect(response.body.book).to.have.property('description');
            expect(response.body.book).to.have.property('cover_image');
            expect(response.body.book).to.have.property('created_at');
            expect(response.body.book).to.have.property('total_reservations');
            expect(response.body.book).to.have.property('active_reservations');
            expect(response.body.book).to.have.property('average_rating');
            expect(response.body.book).to.have.property('total_reviews');
            expect(response.body.book).to.have.property('isAvailable');
            expect(response.body.book).to.have.property('availability_status');
            expect(response.body.book).to.have.property('recent_reviews');
        });
    });
    
});
   
describe('POST - Testes da Funcionalidade Catálogo de Livros', () => {

    // Objetivo: Validar que um novo livro é adicionado com sucesso ao catálogo
    // Verificar que apenas admin pode adicionar novos livros (validação de permissão)
    it('POST - Deve cadastrar um novo livro com sucesso', () => {
        cy.api({
            method: 'POST',
            url: '/api/books',
            body: {
                "title": faker.book.title(),
                "author": faker.book.author(),
                "description": faker.hacker.phrase(),
                "category": "Literatura Estrangeira",
                "isbn": "978-85-260-1320-6",
                "editor": faker.book.publisher(),
                "language": "Inglês",
                "publication_year": Math.floor(Math.random() * (2025 - 1946) + 1946),
                "pages": Math.floor(Math.random() * (919) + 80),
                "format": "Físico",
                "total_copies": 4,
                "available_copies": 4
            },
            headers: { 'Authorization': token } //validando login somente admin
        }).should(response => {
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal("Livro criado com sucesso.");
        }); 
    });

    // Objetivo: Garantir que dados inválidos são rejeitados ao adicionar um livro
    // Validar mensagens de erro apropriadas para dados faltantes ou incorretos
    it('POST -  Deve rejeitar livro com dados inválidos', () => {
        cy.api({
            method: 'POST',
            url: '/api/books',
            body: {
                "title": faker.book.title(),
                "author": faker.book.author(),
                "description": faker.hacker.phrase(),
                "category": "Literatura Estrangeira",
                "isbn": "978-85-260-1320-6",
                "editor": faker.book.publisher(),
                "language": "Inglês",
                "publication_year": Math.floor(Math.random() * (2799) - 1400), //idade inválida que fica entre -1400 e 1399
                "pages": Math.floor(Math.random() * (919) + 80),
                "format": "Físico",
                "total_copies": 4,
                "available_copies": 4
            },
            headers: { 'Authorization': token },
            failOnStatusCode: false
        }).should(response => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('\"publication_year\" must be greater than or equal to 1400');
        }); 
    });

});

describe('PUT - Testes da Funcionalidade Catálogo de Livros', () => {

    // Objetivo: Validar que um livro pode ser atualizado com sucesso
    // Verificar que apenas admin pode atualizar livros (validação de permissão)
    it('PUT - Deve atualizar um livro previamente cadastrado - de forma independente', () => {
        cy.request({
            method: 'POST',
            url: '/api/books',
            body: {
                "title": faker.book.title(),
                "author": faker.book.author(),
                "description": faker.hacker.phrase(),
                "category": "Literatura Estrangeira",
                "isbn": "978-85-260-1320-6",
                "editor": faker.book.publisher(),
                "language": "Inglês",
                "publication_year": Math.floor(Math.random() * (2025 - 1946) + 1946),
                "pages": Math.floor(Math.random() * (919) + 80),
                "format": "Físico",
                "total_copies": 4,
                "available_copies": 4
            },
            headers: { 'Authorization': token }
        }).then(response => {
            expect(response.status).to.equal(201);
            return response.body.book.id
        }).then(bookId => {
            cy.api({
                method: 'PUT',
                url: `/api/books/${bookId}`,
                body: {
                    "title": "Nome livro atualizado",
                    "author": "Autor Atualizado",
                    "description": "Descrição atualizada do livro",
                    "category": "Categoria atualizada",
                    "editor": "Editora Atualizada",
                    "language": "Português",
                    "publication_year": 2000,
                    "pages": 300,
                    "format": "Físico",
                    "total_copies": 10,
                    "available_copies": 5
                    },
                headers: { 'Authorization': token } //validando login somente admin
            }).should(response => {
                expect(response.status).to.eq(200);
                // expect(response.body.message).to.eq(""); //não existe body.message nessa requisição!
            });
        }); 
    });

});

describe('DELETE - Testes da Funcionalidade Catálogo de Livros', () => {

    // Objetivo: Validar que um livro pode ser removido do catálogo
    // Verificar que apenas admin pode deletar livros (validação de permissão)
    it('DELETE - Deve deletar um livro previamente cadastrado', () => {
        cy.request({
            method: 'POST',
            url: '/api/books',
            body: {
                "title": faker.book.title(),
                "author": faker.book.author(),
                "description": faker.hacker.phrase(),
                "category": "Literatura Estrangeira",
                "isbn": "978-85-260-1320-6",
                "editor": faker.book.publisher(),
                "language": "Inglês",
                "publication_year": Math.floor(Math.random() * (2025 - 1946) + 1946),
                "pages": Math.floor(Math.random() * (919) + 80),
                "format": "Físico",
                "total_copies": 4,
                "available_copies": 4
            },
            headers: { 'Authorization': token }
        }).then(response => {
            expect(response.status).to.equal(201);
            return response.body.book.id
        }).then(bookId => {
            cy.api({
                method: 'DELETE',
                url: `/api/books/${bookId}`,
                headers: { 'Authorization': token } //validando login somente admin
            }).should(response => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq("Livro deletado com sucesso."); 
            });
        });
    });

});