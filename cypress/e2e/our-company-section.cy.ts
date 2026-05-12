describe('FMS-92 - Our Company Section', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should display Our Company heading and description', () => {
    cy.contains('Our Company').should('be.visible');

    cy.contains(
      'We are here to support your business inquiries'
    ).should('be.visible');
  });

  it('should display contact cards correctly', () => {
    cy.contains('+ 075 391 2534').should('be.visible');
    cy.contains('magnifyofficials@gmail.com').should('be.visible');
    cy.contains('Kokuvil West, Jaffna').should('be.visible');
  });

  it('should display social icons section', () => {
    cy.contains('FOLLOW US').should('be.visible');

    cy.get('button[aria-label="WhatsApp"]').should('be.visible');
    cy.get('button[aria-label="Facebook"]').should('be.visible');
    cy.get('button[aria-label="Instagram"]').should('be.visible');
    cy.get('button[aria-label="TikTok"]').should('be.visible');
  });
});