const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    setupNodeEvents(on, config) {
      // Pega o BASE_URL que está no cypress.env.json e atribui ao baseUrl do Cypress
      if (config.env.BASE_URL) {
        config.baseUrl = config.env.BASE_URL;
      }

      return config;
    },
    projectId: "4ffoce",
    video: false
  }
});