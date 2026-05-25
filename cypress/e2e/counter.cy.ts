import { visitHome, checkResponsive } from '../support/utils';

describe('FMS-82 - Counter Section', () => {
  beforeEach(() => {
    visitHome();
  });

  const getCounterSection = () =>
    cy.contains('LIMITED RELEASE').closest('section');

  it('should display counter section', () => {
    getCounterSection().should('be.visible');
  });

  it('should display counter container with gradient background', () => {
    cy.contains('LIMITED RELEASE')
      .parents('div[class*="rounded-\\[24px\\]"]')
      .first()
      .should('be.visible')
      .and('have.attr', 'style')
      .and('include', 'linear-gradient');
  });

  it('should display Limited Release badge', () => {
    cy.get('div').contains('LIMITED RELEASE').should('be.visible');
  });

  it('should display offer heading', () => {
    getCounterSection().within(() => {
      cy.get('h2').should('contain.text', 'Limited Time Gallery');
      cy.get('h2').should('contain.text', 'Opening Offer');
    });
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
    getCounterSection().within(() => {
      cy.contains('div', /^\d{2}$/).should('be.visible');
      cy.get('div[class*="text-\\[38px\\]"]').should('have.length.at.least', 3);
    });
  });

  it('should display Claim Offer button', () => {
    cy.get('button').contains('Claim Offer').should('be.visible');
  });

  it('should validate counter remains visible on scroll', () => {
    cy.scrollTo('center');
    getCounterSection().should('be.visible');
  });

  it('should validate responsive layout', () => {
    checkResponsive();
    getCounterSection().should('be.visible');
  });
});
