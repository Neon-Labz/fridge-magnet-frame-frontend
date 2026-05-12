describe('FMS-93 - Send Message Section UI', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should display form fields', () => {
    cy.get('#fullName').should('be.visible');
    cy.get('#email').should('be.visible');
    cy.get('#subject').should('be.visible');
    cy.get('#message').should('be.visible');
  });

  it('should allow user to fill form fields', () => {
    cy.get('#fullName').type('John Doe');
    cy.get('#email').type('john@example.com');

    cy.get('#subject').select('General Inquiry');

    cy.get('#message').type('This is a test message');
  });

  it('should display submit button', () => {
    cy.contains('Send Message')
      .should('be.visible')
      .and('not.be.disabled');
  });

  it('should trigger form submit event', () => {
    cy.get('#fullName').type('QA User');
    cy.get('#email').type('qa@test.com');
    cy.get('#subject').select('Order Support');
    cy.get('#message').type('Testing message');

    cy.contains('Send Message').click();
  });
});