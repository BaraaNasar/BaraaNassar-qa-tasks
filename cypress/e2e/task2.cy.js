/// <reference types="cypress" />

describe('Task 2: Automation Exercise Functionalities', () => {

  // Helper utils for generating random user data
  function generateUser() {
    const id = Math.floor(Math.random() * 100000);
    return {
      name: `User${id}`,
      email: `test${id}@example.com`,
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      address: '123 Test St',
      country: 'United States',
      state: 'Test State',
      city: 'Test City',
      zipcode: '12345',
      mobile: '1234567890'
    };
  }

  // Helper to register a user
  function registerUser(user) {
    cy.visit('http://automationexercise.com');
    cy.contains('Signup / Login').click();
    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.get('[data-qa="signup-button"]').click();

    cy.contains('Enter Account Information').should('be.visible');
    cy.get('#id_gender1').click();
    cy.get('[data-qa="password"]').type(user.password);
    cy.get('[data-qa="days"]').select('1');
    cy.get('[data-qa="months"]').select('January');
    cy.get('[data-qa="years"]').select('2000');
    cy.get('#newsletter').check();
    cy.get('#optin').check();

    cy.get('[data-qa="first_name"]').type(user.firstName);
    cy.get('[data-qa="last_name"]').type(user.lastName);
    cy.get('[data-qa="address"]').type(user.address);
    cy.get('[data-qa="country"]').select(user.country);
    cy.get('[data-qa="state"]').type(user.state);
    cy.get('[data-qa="city"]').type(user.city);
    cy.get('[data-qa="zipcode"]').type(user.zipcode);
    cy.get('[data-qa="mobile_number"]').type(user.mobile);
    cy.get('[data-qa="create-account"]').click();

    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.contains(`Logged in as ${user.name}`).should('be.visible');
  }

  // 1. Create New User Account
  it('Test Case 1: Register User', () => {
    const user = generateUser();

    cy.visit('http://automationexercise.com');
    cy.get('body').should('be.visible');

    // Navigate to Signup
    cy.contains('Signup / Login').click();
    cy.contains('New User Signup!').should('be.visible');

    // Fill Signup Data
    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.get('[data-qa="signup-button"]').click();

    // Fill Account Information
    cy.contains('Enter Account Information').should('be.visible');
    cy.get('#id_gender1').click();
    cy.get('[data-qa="password"]').type(user.password);
    cy.get('[data-qa="days"]').select('1');
    cy.get('[data-qa="months"]').select('January');
    cy.get('[data-qa="years"]').select('2000');
    cy.get('#newsletter').check();
    cy.get('#optin').check();

    cy.get('[data-qa="first_name"]').type(user.firstName);
    cy.get('[data-qa="last_name"]').type(user.lastName);
    cy.get('[data-qa="company"]').type('Test Company');
    cy.get('[data-qa="address"]').type(user.address);
    cy.get('[data-qa="country"]').select(user.country);
    cy.get('[data-qa="state"]').type(user.state);
    cy.get('[data-qa="city"]').type(user.city);
    cy.get('[data-qa="zipcode"]').type(user.zipcode);
    cy.get('[data-qa="mobile_number"]').type(user.mobile);
    cy.get('[data-qa="create-account"]').click();

    // Verify Account Created
    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();

    // Verify Logged In
    cy.contains(`Logged in as ${user.name}`).should('be.visible');
  });

  // 2. User Login
  it('Test Case 2: Login User with correct email and password', () => {
    // Strategy: Register a brand new user first to GUARANTEE existence
    const user = generateUser();
    registerUser(user);

    // Logout first
    cy.contains('Logout').click();
    cy.contains('Signup / Login').should('be.visible');

    // Perform Login
    cy.visit('http://automationexercise.com');
    cy.contains('Signup / Login').click();
    cy.contains('Login to your account').should('be.visible');

    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type(user.password);
    cy.get('[data-qa="login-button"]').click();

    // Verify Login Success
    cy.contains(`Logged in as ${user.name}`).should('be.visible');
  });

  // 3. Search for a Product
  it('Test Case 3: Search Product (Valid and Invalid)', () => {
    cy.visit('http://automationexercise.com');
    cy.contains('Products').click();
    cy.get('.features_items').should('be.visible');

    // 3a. Valid Search
    cy.get('#search_product').type('Dress');
    cy.get('#submit_search').click();
    cy.contains('Searched Products').should('be.visible');
    cy.get('.productinfo').should('have.length.greaterThan', 0);

    // 3b. Invalid Search
    cy.get('#search_product').clear().type('NonExistentProductXYZ123');
    cy.get('#submit_search').click();
    cy.contains('Searched Products').should('be.visible');
    cy.get('.productinfo').should('not.exist');
  });

  // 4. Add Product to Cart
  it('Test Case 4: Add Product to cart', () => {
    cy.visit('http://automationexercise.com');
    cy.contains('Products').click();

    // View Product
    cy.get('.choose a').first().click();
    cy.get('.product-information').should('be.visible');

    // Add to cart
    cy.get('button.cart').click();

    // Verify Added
    cy.contains('Added!').should('be.visible');
    cy.contains('Your product has been added to cart.').should('be.visible');

    // View Cart
    cy.get('.modal-content a[href="/view_cart"]').click();

    // Verify Cart Page
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info').should('be.visible');
    cy.get('.cart_description').should('exist');
  });

  // 5. Add a Product Review
  it('Test Case 5: Add review on product (Logged In)', () => {
    // Pre-requisite: Register and Login
    const user = generateUser();
    registerUser(user);

    cy.contains('Products').click();
    cy.get('.choose a').first().click();

    // Write Review
    cy.contains('Write Your Review').should('be.visible');
    cy.get('#name').type(user.name);
    cy.get('#email').type(user.email);
    cy.get('#review').type('This is a 5-star review! Excellent product.');
    cy.get('#button-review').click();

    // Verify Success
    cy.contains('Thank you for your review.').should('be.visible');
  });

});
