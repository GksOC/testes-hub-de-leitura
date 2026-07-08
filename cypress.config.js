const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //configurar o site base para não precisar colocar o endereço completo do site em cada teste.
    baseUrl: "http://localhost:3000",
  },
});
