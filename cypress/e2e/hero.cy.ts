import { visitHome, checkResponsive } from '../support/utils';

describe('FMS-80 - Home Hero Section', () => {
  beforeEach(() => {
    visitHome();
  });

  it('should display hero section correctly', () => {
    cy.get('section[class*="relative"][class*="mt-[90px]"]').should('be.visible');
    cy.get('h1').first().should('contain.text', 'Your Memories');
    cy.get('h1').first().should('contain.text', 'Magnified');
    cy.get('h1').first().should('contain.text', 'Precision');
  });

  it('should validate hero paragraph content', () => {
    cy.get('p').contains('Transform your digital memories').should('be.visible');
    cy.get('p').contains('museum-grade').should('be.visible');
  });

  it('should display Shop Now button and be clickable', () => {
    cy.contains('button', 'Shop Now').should('be.visible').and('not.be.disabled');
    cy.contains('button', 'Shop Now').click();
    // Button click should complete without errors and keep page rendered
    cy.contains('button', 'Shop Now').should('be.visible');
  });

  it('should validate responsive layout', () => {
    checkResponsive();
    cy.get('section[class*="relative"][class*="mt-[90px]"]').should('be.visible');
  });
});