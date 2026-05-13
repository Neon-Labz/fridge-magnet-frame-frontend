/// <reference types="cypress" />

describe('FMS-79 - Footer Section', () => {

  beforeEach(() => {

    cy.visit('/');

    // Footer Stability Validation
    cy.get('footer', { timeout: 10000 })
      .should('exist')
      .and('be.visible');
  });

  // =========================================================
  // Footer UI Rendering Validation
  // =========================================================

  describe('Footer UI Rendering', () => {

    it('should display footer section correctly', () => {

      cy.get('footer')
        .should('exist')
        .and('be.visible');
    });

    it('should display footer logo correctly', () => {

      cy.get('footer img[alt="Magnify Logo"]')
        .should('exist')
        .and('be.visible')
        .then(($img) => {

          const image = $img[0] as HTMLImageElement;

          expect(image.naturalWidth).to.be.greaterThan(0);
        });
    });

    it('should display correct copyright text', () => {

      cy.contains(
        '© 2024 Magnify. Premium photo framing for curated memories.'
      )
        .should('exist')
        .and('be.visible');
    });

    it('should display footer section headings', () => {

      cy.contains('h4', 'Navigation')
        .should('exist')
        .and('be.visible');

      cy.contains('h4', 'Connect')
        .should('exist')
        .and('be.visible');

      cy.contains('h4', 'Newsletter')
        .should('exist')
        .and('be.visible');
    });
  });

  // =========================================================
  // Navigation Section Validation
  // =========================================================

  describe('Footer Navigation Validation', () => {

    const navigationLinks = [
      'Privacy Policy',
      'Terms of Service',
      'Shipping Policy'
    ];

    const connectLinks = [
      'Contact Us',
      'About Our Craft',
      'Sustainability'
    ];

    it('should display all navigation items correctly', () => {

      navigationLinks.forEach((item) => {

        cy.contains('li', item)
          .should('exist')
          .and('be.visible')
          .and('have.text', item);
      });
    });

    it('should display all connect section items correctly', () => {

      connectLinks.forEach((item) => {

        cy.contains('li', item)
          .should('exist')
          .and('be.visible')
          .and('have.text', item);
      });
    });

    it('should validate footer list item counts', () => {

      cy.get('footer ul')
        .should('have.length', 2);

      cy.get('footer li')
        .should('have.length', 6);
    });
  });

  // =========================================================
  // Newsletter Section Validation
  // =========================================================

  describe('Newsletter Section Validation', () => {

    it('should display newsletter heading and description', () => {

      cy.contains('Newsletter')
        .should('exist')
        .and('be.visible');

      cy.contains(
        'Join our list for exclusive gallery updates and styling tips.'
      )
        .should('exist')
        .and('be.visible');
    });

    it('should display newsletter input field correctly', () => {

      cy.get('input[type="email"]')
        .should('exist')
        .and('be.visible')
        .and('have.attr', 'placeholder', 'Email address');
    });

    it('should allow user to type into newsletter input', () => {

      const testEmail = 'qaautomation@test.com';

      cy.get('input[type="email"]')
        .clear()
        .type(testEmail)
        .should('have.value', testEmail);
    });

    it('should display newsletter submit button correctly', () => {

      cy.get('button')
        .contains('→')
        .should('exist')
        .and('be.visible');
    });

    it('should validate newsletter button is enabled', () => {

      cy.get('button')
        .contains('→')
        .should('not.be.disabled');
    });
  });

  // =========================================================
  // Image & Icon Validation
  // =========================================================

  describe('Footer Image & Icon Validation', () => {

    it('should validate footer logo alt attribute', () => {

      cy.get('footer img')
        .should('have.attr', 'alt', 'Magnify Logo');
    });

    it('should validate newsletter arrow icon visibility', () => {

      cy.get('button')
        .contains('→')
        .should('exist')
        .and('be.visible');
    });
  });

  // =========================================================
  // Responsive UI Validation
  // =========================================================

  describe('Responsive Footer Validation', () => {

    const viewports = [
      {
        device: 'mobile',
        width: 375,
        height: 667
      },
      {
        device: 'tablet',
        width: 768,
        height: 1024
      },
      {
        device: 'desktop',
        width: 1440,
        height: 900
      }
    ];

    viewports.forEach((viewport) => {

      it(`should render footer correctly on ${viewport.device}`, () => {

        cy.viewport(viewport.width, viewport.height);

        cy.visit('/');

        cy.get('footer')
          .should('exist')
          .and('be.visible');

        cy.get('footer img[alt="Magnify Logo"]')
          .should('be.visible');

        cy.contains('Navigation')
          .should('be.visible');

        cy.contains('Connect')
          .should('be.visible');

        cy.contains('Newsletter')
          .should('be.visible');

        cy.get('input[type="email"]')
          .should('be.visible');
      });
    });
  });

  // =========================================================
  // Stability Validation
  // =========================================================

  describe('Footer Stability Validation', () => {

    it('should maintain footer visibility after scrolling', () => {

      cy.scrollTo('bottom');

      cy.get('footer')
        .should('be.visible');
    });

    it('should not render broken footer structure', () => {

      cy.get('footer')
        .within(() => {

          cy.get('div')
            .should('exist');

          cy.get('ul')
            .should('exist');

          cy.get('li')
            .should('have.length', 6);

          cy.get('input[type="email"]')
            .should('exist');

          cy.get('button')
            .should('exist');
        });
    });
  });
});