import { visitHome, checkResponsive } from '../support/utils';

describe('FMS-83 - Play Video Section', () => {
  beforeEach(() => {
    visitHome();
  });

  const getVideoSection = () =>
    cy.contains('h2', 'What is a Magnet Frame?').closest('section');

  it('should display video section', () => {
    getVideoSection().should('be.visible');
  });

  it('should display section heading', () => {
    cy.get('h2').contains('What is a Magnet Frame?').should('be.visible');
  });

  it('should display red underline accent', () => {
    cy.get('div[class*="h-\\[3px\\]"][class*="w-\\[90px\\]"][class*="bg-\\[#BC0000\\]"]').should('be.visible');
  });

  it('should display section description', () => {
    cy.get('p').contains('Your memories - printed, magnetised').should('be.visible');
  });

  it('should display video image', () => {
    cy.get('img[alt="Magnet Frame Demo"]').should('be.visible');
  });

  it('should load video image correctly', () => {
    cy.get('img[alt="Magnet Frame Demo"]')
      .should('have.attr', 'src')
      .and('include', 'homepage-video.gif');
  });

  it('should display video in container', () => {
    cy.get('img[alt="Magnet Frame Demo"]')
      .closest('div[class*="aspect-\\[3\\/2\\]"]')
      .should('be.visible');
  });

  it('should validate responsive layout', () => {
    checkResponsive();
    getVideoSection().should('be.visible');
  });
});
