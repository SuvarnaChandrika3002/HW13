// @ts-check
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./playwright-tests",
  timeout: 30000,
  use: {
    baseURL: "http://localhost:8000",
    headless: true
  }
});
