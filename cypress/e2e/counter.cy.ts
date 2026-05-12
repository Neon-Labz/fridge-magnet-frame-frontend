import { visitHome, checkResponsive } from '../support/utils';

describe('FMS-82 - Counter Section', () => {
  beforeEach(() => {
    visitHome();
  });

  it('should display counter section', () => {
    cy.get('section[class*="flex"][class*="justify-center"]').should('be.visible');
  });

  it('should display counter container with gradient background', () => {
    cy.get('div[class*="rounded-\\[24px\\]"][class*="flex"][class*="flex-row"]').should('be.visible');
  });

  it('should display Limited Release badge', () => {
    cy.get('div').contains('LIMITED RELEASE').should('be.visible');
  });

  it('should display offer heading', () => {
    cy.get('h2').contains('Limited Time Gallery Opening Offer').should('be.visible');
  });

  it('should display offer description', () => {
    cy.get('p').contains('Elevate your home with 20% off').should('be.visible');
  });

  it('should display countdown timer with all units', () => {
    // Check for days, hours, minutes labels
    cy.contains('DAYS').should('be.visible');
    cy.contains('HOURS').should('be.visible');
    cy.contains('MINS').should('be.visible');
  });

  it('should display timer numbers', () => {
    // Verify timer displays numeric values
    cy.get('span[class*="text-4xl"][class*="md:text-5xl"]').should('have.length.at.least', 3);
  });

  it('should display Claim Offer button', () => {
    cy.get('button').contains('Claim Offer').should('be.visible');
  });

  it('should validate counter remains visible on scroll', () => {
    cy.scrollTo('center');
    cy.get('section[class*="flex"][class*="justify-center"]').should('be.visible');
  });

  it('should validate responsive layout', () => {
    checkResponsive();
    cy.get('div[class*="rounded-\\[24px\\]"][class*="flex"][class*="flex-row"]').should('be.visible');
  });
});