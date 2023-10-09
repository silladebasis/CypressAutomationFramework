const { defineConfig } = require("cypress");

module.exports = defineConfig({
  includeShadowDom:true,
  viewportHeight:1080,
  viewportWidth:1920,
  e2e: {
    setupNodeEvents(on, config) {
      const appURL = config.env.type || 'staging'

      const urls = {
        staging : 'https://demowebshop.tricentis.com/',
        prod : 'https://demoweshop.tricentis.com/'
      }
      config.baseUrl = urls[appURL]
      return config
    },
  },
  
});
