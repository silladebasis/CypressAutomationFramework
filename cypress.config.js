const { defineConfig } = require("cypress");

module.exports = defineConfig({
  includeShadowDom:true,
  viewportHeight:1080,
  viewportWidth:1920,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  
});
