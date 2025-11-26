const { test, expect } = require("@playwright/test");

test("positive: register and login with valid credentials", async ({ page }) => {
  const unique = Date.now();
  const email = `user_${unique}@test.com`;
  const password = "mypassword123";

  // Register
  await page.goto("/static/register.html");
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="confirm-password"]', password);
  await page.click('button[type="submit"]');

  await expect(page.locator("#message")).toHaveText("Registration successful");

  // Login
  await page.goto("/static/login.html");
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');

  await expect(page.locator("#message")).toHaveText("Login successful");

  // Ensure JWT stored
  const token = await page.evaluate(() => window.localStorage.getItem("token"));
  expect(token).toBeTruthy();
});

test("negative: register with short password shows front-end error", async ({ page }) => {
  const unique = Date.now();
  const email = `shortpass_${unique}@test.com`;
  const password = "short"; // < 8 chars

  await page.goto("/static/register.html");
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="confirm-password"]', password);
  await page.click('button[type="submit"]');

  await expect(page.locator("#message")).toHaveText(
    "Password must be at least 8 characters"
  );
});

test("negative: login with wrong password shows invalid credentials", async ({
  page,
  request
}) => {
  const unique = Date.now();
  const email = `wrongpass_${unique}@test.com`;
  const correctPassword = "correctpassword123";
  const wrongPassword = "wrongpassword";

  // Ensure the user exists – ignore result if already registered
  await request.post("/register", {
    data: { email, password: correctPassword }
  }).catch(() => { /* ignore errors */ });

  await page.goto("/static/login.html");
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', wrongPassword);
  await page.click('button[type="submit"]');

  await expect(page.locator("#message")).toHaveText("Invalid email or password");
});
