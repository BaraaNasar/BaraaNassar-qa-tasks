import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// --- Background & Shared Steps ---
Given("I visit the SauceDemo website", () => {
    cy.visit("https://www.saucedemo.com");
    // Ensure the login element is visible to confirm we are on the page
    cy.get('[data-test="username"]').should("be.visible");
});

Given("I am logged in as {string}", (username) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
});

// --- Login Scenario Steps ---
When("I enter username {string}", (username) => {
    cy.get('[data-test="username"]').clear().type(username);
});

When("I enter password {string}", (password) => {
    cy.get('[data-test="password"]').clear().type(password);
});

When("I click the login button", () => {
    cy.get('[data-test="login-button"]').click();
});

Then("I should be logged in successfully", () => {
    cy.url().should("include", "/inventory.html");
    cy.get(".title").should("contain", "Products");
});

// --- Checkout Scenario Steps ---
When("I add a product to the cart", () => {
    // Add the first product (Sauce Labs Backpack)
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // Verify badge shows '1'
    cy.get(".shopping_cart_badge").should("contain", "1");
});

When("I click on the cart icon", () => {
    cy.get(".shopping_cart_link").click();
});

When("I proceed to checkout", () => {
    cy.get('[data-test="checkout"]').click();
});

When("I fill the checkout information", () => {
    cy.get('[data-test="firstName"]').type("Test");
    cy.get('[data-test="lastName"]').type("User");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
});

When("I finish the checkout", () => {
    // Confirm we are on overview page
    cy.get(".title").should("contain", "Overview");
    cy.get('[data-test="finish"]').click();
});

Then("the order should be completed successfully", () => {
    cy.get(".complete-header").should("contain", "Thank you for your order!");
    cy.get('[data-test="back-to-products"]').should("be.visible");
});

// --- Logout Scenario Steps ---
When("I click the logout button", () => {
    // Open sidebar menu
    cy.get("#react-burger-menu-btn").click();
    // Wait for animation text to be visible or interactable
    cy.get("#logout_sidebar_link").click();
});

Then("I should be redirected to the login page", () => {
    cy.url().should("equal", "https://www.saucedemo.com/");
    cy.get('[data-test="login-button"]').should("be.visible");
});
