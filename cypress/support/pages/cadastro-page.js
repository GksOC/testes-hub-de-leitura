class CadastroPage {

    //Seletores
    campoNome() {return cy.get('#name')}
    campoEmail() {return cy.get('#email')}
    campoTelefone() {return cy.get('#phone')}
    campoSenha() {return cy.get('#password')}
    campoConfSenha() {return cy.get('#confirm-password')}
    checkTermos() {return cy.get('#terms-agreement')}
    botaoCriarConta() {return cy.get('#register-btn')}

    //Métodos
    visitarPaginaCadastro(){
        cy.visit('register.html');
    }

    preencherCadastro(nome, email, telefone, senha, confSenha){
        //para aceitar valores vazios, checar com o if(<valor)
        if(nome) this.campoNome().clear().type(nome);
        if(email) this.campoEmail().clear().type(email);
        if(email) this.campoTelefone().clear().type(telefone);
        if(senha) this.campoSenha().clear().type(senha);
        if(confSenha) this.campoConfSenha().clear().type(confSenha);
        this.checkTermos().check();
        this.botaoCriarConta().click();
    }
}

//já cria a instância da classe ao ser importada
export default new CadastroPage()