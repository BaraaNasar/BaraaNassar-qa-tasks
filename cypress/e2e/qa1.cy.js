/// <reference types="cypress" />

describe('QA1 Test Suite', () => {
  it('should visit the OrangeHRM page, login, and verify the title', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');

    cy.get('[type="submit"]').click();
    cy.get('[title="Assign Leave"]').first().click();
    cy.get('[placeholder="Type for hints..."]').type('baraa123');
  });
});

