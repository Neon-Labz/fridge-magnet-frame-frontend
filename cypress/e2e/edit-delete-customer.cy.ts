describe('Customer UI - Edit & Delete (Frontend Only)', () => {

  beforeEach(() => {

    // Mock customers API
    cy.intercept('GET', '/api/v1/customers*', {
      statusCode: 200,
      body: {
        data: [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@test.com',
            phone: '123456789',
            address: 'Colombo',
            initials: 'JD'
          }
        ],
        total: 1,
        page: 1,
        limit: 10
      }
    }).as('getCustomers');

    cy.visit('/dashboard/customers');

    cy.wait('@getCustomers');

    cy.get('tbody tr').should('have.length', 1);
  });

  // =========================
  // EDIT TEST
  // =========================
  it('should open edit modal and validate fields', () => {

    cy.get('[aria-label="Edit"]')
      .should('exist')
      .first()
      .click();

    cy.contains('Edit Customer').should('be.visible');

    cy.get('input[name="name"]')
      .should('have.value', 'John Doe');

    cy.get('input[name="email"]')
      .should('have.value', 'john@test.com');

    cy.contains('Save Changes')
      .should('be.visible')
      .and('not.be.disabled');

    cy.contains('Cancel')
      .should('be.visible');

  });

  // =========================
  // DELETE TEST
  // =========================
  it('should open delete modal and confirm delete', () => {

    // Click delete icon
    cy.get('[aria-label="Delete"]')
      .should('exist')
      .first()
      .click();

    // Confirm delete modal
    cy.contains('Delete Customer Profile').should('be.visible');
    cy.contains('Are you sure').should('be.visible');

    // Mock DELETE API
    cy.intercept('DELETE', '/api/v1/customers/*', {
      statusCode: 200,
      body: {}
    }).as('deleteCustomer');

    // Click confirm delete
    cy.contains('Confirm Delete')
      .should('be.visible')
      .click();

    cy.wait('@deleteCustomer');

  });

});