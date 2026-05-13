describe('Create Customer UI', () => {

  beforeEach(() => {
    cy.visit('/dashboard/customers');
  });

  it('should open create customer modal', () => {

    cy.contains('Add your first customer').click();
    cy.wait(4000);

    cy.contains('Add New Customer').should('exist');

    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="phone"]').should('exist');
    cy.get('input[name="address"]').should('exist');

    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@test.com');
    cy.get('input[name="phone"]').type('123-456-7890');
    cy.get('input[name="address"]').type('123 Main St');

    cy.contains('Add Customer').click();
  });

});