import { visitHome, checkResponsive } from '../support/utils';

describe('FMS-83 - Play Video Section', () => {
  beforeEach(() => {
    visitHome();
  });

  it('should display video section', () => {
    cy.get('section[class*="bg-white"][class*="py-"]').should('be.visible');
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
    cy.get('div[class*="rounded-\\[24px\\]"][class*="bg-\\[#F9F9FE\\]"]').should('be.visible');
  });

  it('should validate responsive layout', () => {
    checkResponsive();
    cy.get('section[class*="bg-white"][class*="py-"]').should('be.visible');
  });
});