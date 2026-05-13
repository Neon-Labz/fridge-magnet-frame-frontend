describe('Customer List Page UI', () => {

  beforeEach(() => {
    cy.visit('/dashboard/customers');
  });

  it('should display customer page title', () => {

    cy.contains('Customers').should('exist');

  });

  it('should display table headers', () => {

    cy.contains('Customer ID').should('exist');
    cy.contains('Customer Name').should('exist');
    cy.contains('Email Address').should('exist');
    cy.contains('Phone Number').should('exist');
    cy.contains('Customer Address').should('exist');

  });

  it('should display pagination buttons', () => {

    cy.contains('<').should('exist');
    cy.contains('>').should('exist');

  });

});