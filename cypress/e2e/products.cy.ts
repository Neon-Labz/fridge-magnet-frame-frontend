import { visitHome, checkResponsive } from '../support/utils';

describe('FMS-81 - Home View All Product Section', () => {
  beforeEach(() => {
    visitHome();
  });

  it('should display product section', () => {
    cy.get('section[class*="bg-\\[#F9F9FE\\]"]').should('be.visible');
    cy.get('h2').contains('Curated Classics').should('be.visible');
  });

  it('should display product cards grid with 3 products', () => {
    cy.get('div[class*="grid"][class*="grid-cols-3"]').should('be.visible');
    cy.get('div[class*="overflow-hidden"][class*="rounded-\\[13px\\]"]').should('have.length', 3);
  });

  it('should validate product titles are visible', () => {
    cy.get('h3[class*="font-manrope"]').first().should('be.visible');
    cy.get('h3[class*="font-manrope"]').contains('Magnate Frame').should('be.visible');
  });

  it('should validate product descriptions', () => {
    cy.get('p').contains('Sustainably sourced solid oak').should('be.visible');
    cy.get('p').contains('Deep matte black finish').should('be.visible');
  });

  it('should display Add to Cart buttons', () => {
    // Verify at least one Add to Cart button exists and is visible
    cy.get('button').contains('Add to Cart').should('exist').and('be.visible');
  });

  it('should display product badge', () => {
    cy.get('span').contains('New Arrival').should('be.visible');
  });

  it('should have clickable Add to Cart button', () => {
    cy.get('button').contains('Add to Cart').first().should('be.visible').should('not.be.disabled');
    cy.get('button').contains('Add to Cart').first().click();
    // Button click should complete without errors
    cy.get('button').contains('Add to Cart').first().should('be.visible');
  });

  it('should validate responsive grid layout', () => {
    checkResponsive();
    cy.get('div[class*="grid"][class*="grid-cols-3"]').should('be.visible');
  });
});