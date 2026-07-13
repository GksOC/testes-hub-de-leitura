const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //configurar o site base para não precisar colocar o endereço completo do site em cada teste.
    baseUrl: "http://localhost:3000",
    
    //configurando o Cypress Cloud
    projectId: "4ffoce",
    video: false
  },

});
