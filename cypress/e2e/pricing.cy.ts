import { visitHome, checkResponsive } from '../support/utils';

describe('FMS-112 - Pricing Section', () => {
  beforeEach(() => {
    visitHome();
  });

  it('should display pricing section', () => {
    cy.get('section[class*="container"]').should('be.visible');
  });

  it('should display pricing heading', () => {
    cy.get('h2').contains('Simple, honest pricing').should('be.visible');
  });

  it('should display pricing subtext', () => {
    cy.get('p').contains('No hidden costs').should('be.visible');
  });

  it('should display exactly 2 pricing cards', () => {
    // Use CSS module grid container selector to get direct children cards only
    cy.get('[class*="priceCardsGrid"] > [class*="priceCard"]').should('have.length', 2);
  });

  it('should display first pricing card - Photo Magnets', () => {
    cy.get('[class*="priceCardsGrid"] > [class*="priceCard"]').first().should('contain.text', 'Photo Magnets');
    cy.get('[class*="priceCardsGrid"] > [class*="priceCard"]').first().should('contain.text', 'MAGNETS ONLY');
    cy.get('[class*="priceCardsGrid"] > [class*="priceCard"]').first().should('contain.text', 'Minimum 4 pieces');
  });

  it('should display second pricing card - Magnet Frame Set', () => {
    cy.get('[class*="priceCardsGrid"] > [class*="priceCard"]').last().should('contain.text', 'Magnet Frame Set');
    cy.get('[class*="priceCardsGrid"] > [class*="priceCard"]').last().should('contain.text', 'MAGNETS + FRAME');
    cy.get('[class*="priceCardsGrid"] > [class*="priceCard"]').last().should('contain.text', 'Black or white frame');
  });

  it('should validate pricing values', () => {
    cy.get('[class*="priceCardsGrid"] [class*="priceAmount"]').first().should('contain.text', '1,500');
    cy.get('[class*="priceCardsGrid"] [class*="priceAmount"]').last().should('contain.text', '2,500');
  });

  it('should display popular badge on second card', () => {
    cy.get('[class*="priceCardsGrid"] [class*="ribbon"]').should('be.visible').and('contain.text', 'POPULAR');
  });

  it('should display perfect for every occasion heading', () => {
    cy.get('h2').contains('Perfect for every occasion').should('be.visible');
  });

  it('should display occasion cards', () => {
    cy.get('[class*="occasionsGrid"] [class*="occasionCard"]').should('have.length', 6);
  });

  it('should display occasion labels', () => {
    cy.get('p').contains('Weddings').should('be.visible');
    cy.get('p').contains('Graduations').should('be.visible');
    cy.get('p').contains('Birthdays').should('be.visible');
  });

  it('should validate responsive layout', () => {
    checkResponsive();
    cy.get('[class*="priceCardsGrid"] > [class*="priceCard"]').should('be.visible');
  });
});