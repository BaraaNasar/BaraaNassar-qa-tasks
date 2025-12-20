/// <reference types="cypress" />

describe('Task 1: Selectors', () => {
  it('finds all elements using different selector types', () => {
    cy.visit('https://demo.productionready.io/#/register');

    // Element: "conduit" (Top Left)
    cy.get('.navbar-brand');

    // Element: "Home" (Top Right)
    cy.contains('.nav-link:visible', 'Home');

    // Element: "Sign up" (Top Right - Nav Link)
    cy.get('a[href="#/register"]:visible'); 

    // Element: "Sign up" (Header - Center)
    cy.get('h1');

    // Element: "Have an account?"
    cy.contains('Have an account?');

    // Element: Username Input
    cy.get('[placeholder="Username"]');

    // Element: Email Input
    cy.get('[type="email"]');

    // Element: Password Input
    cy.get('[placeholder="Password"]');

    // Element: "Sign up" Button
    cy.get('[type="submit"]');

    // Element: "conduit" (Footer)
    cy.get('.logo-font');

    // Element: Footer Copyright Text
    cy.get('.attribution');
  });
});
