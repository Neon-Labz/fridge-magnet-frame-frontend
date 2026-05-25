import { visitHome, checkResponsive } from '../support/utils';

describe('FMS-81 - Home View All Product Section', () => {
  beforeEach(() => {
    visitHome();
  });

  const getProductSection = () =>
    cy.contains('h2', 'Curated Classics').closest('section');

  it('should display product section', () => {
    getProductSection().should('be.visible');
    cy.contains('h2', 'Curated Classics').should('be.visible');
  });

  it('should display empty product state when no products are provided', () => {
    getProductSection().within(() => {
      cy.contains('No products available right now.').should('be.visible');
      cy.get('div[class*="overflow-hidden"][class*="rounded-\\[13px\\]"]').should('not.exist');
    });
  });

  it('should display product section subtitle', () => {
    getProductSection()
      .contains('The foundation of every great gallery wall.')
      .should('be.visible');
  });

  it('should not display product titles when product list is empty', () => {
    getProductSection().find('h3[class*="font-manrope"]').should('not.exist');
  });

  it('should not display Add to Cart buttons when product list is empty', () => {
    getProductSection().contains('button', 'Add to Cart').should('not.exist');
  });

  it('should not display product badges when product list is empty', () => {
    getProductSection().find('span[class*="rounded-full"]').should('not.exist');
  });

  it('should keep product section stable after scrolling', () => {
    cy.scrollTo('center');
    getProductSection().should('be.visible');
  });

  it('should validate responsive grid layout', () => {
    checkResponsive();
    getProductSection().contains('No products available right now.').should('be.visible');
  });
});
