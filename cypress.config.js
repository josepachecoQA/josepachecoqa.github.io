const fs = require('fs');
const { defineConfig } = require('cypress');
const codeCoverageTask = require('@cypress/code-coverage/task');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8000',
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: {
      runMode: 2,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      on('task', {
        clearDownloads() {
          fs.rmSync(config.downloadsFolder, { recursive: true, force: true });
          return null;
        },
      });
      return config;
    },
  },
});
