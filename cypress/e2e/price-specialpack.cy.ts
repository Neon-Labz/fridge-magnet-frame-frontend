/// <reference types="cypress" />

describe('FMS-114 - Price & Special Package Section Testing', () => {

  beforeEach(() => {
    cy.visit('/price')
    cy.wait(1000)
  })

  // =========================================================
  // HERO SECTION
  // =========================================================

  it('should display hero section correctly', () => {

    cy.contains('MAGNIFY CREATIONS')
      .should('be.visible')

    cy.contains('FRIDGE MAGNET FRAMES')
      .should('be.visible')

    cy.contains('Send your photos - we print, magnetize & deliver!')
      .should('be.visible')
  })

  // =========================================================
  // MAGNETS ONLY SECTION
  // =========================================================

  it('should display Magnets Only section', () => {

    cy.contains('Magnets Only')
      .should('be.visible')

    cy.contains('4 pieces')
      .should('be.visible')

    cy.contains('6 pieces')
      .should('be.visible')

    cy.contains('9 pieces')
      .should('be.visible')

    cy.contains('12 pieces')
      .should('be.visible')

    cy.contains('18 pieces')
      .should('be.visible')
  })

  it('should validate Magnets Only prices', () => {

    cy.contains('Rs. 1,500')
      .should('be.visible')

    cy.contains('Rs. 1,990')
      .should('be.visible')

    cy.contains('Rs. 2,590')
      .should('be.visible')

    cy.contains('Rs. 2,990')
      .should('be.visible')

    cy.contains('Rs. 3,990')
      .should('be.visible')
  })

  it('should display Popular badge', () => {

    cy.contains('Popular')
      .should('be.visible')
  })

  // =========================================================
  // MAGNETS + FRAME BUNDLE SECTION
  // =========================================================

  it('should display Magnets + Frame Bundle section', () => {

    cy.contains('Magnets + Frame Bundle')
      .should('be.visible')

    cy.contains('Black or white 4-in-1 frame included')
      .should('be.visible')
  })

  it('should validate bundle package items', () => {

    cy.contains('4 pieces + Frame')
      .should('be.visible')

    cy.contains('6 pieces + Frame')
      .should('be.visible')

    cy.contains('9 pieces + Frame')
      .should('be.visible')

    cy.contains('12 pieces + Frame')
      .should('be.visible')
  })

  it('should validate bundle prices', () => {

    cy.contains('Rs. 2,500')
      .should('be.visible')

    cy.contains('Rs. 2,990')
      .should('be.visible')

    cy.contains('Rs. 3,590')
      .should('be.visible')

    cy.contains('Rs. 3,990')
      .should('be.visible')
  })

  // =========================================================
  // SPECIAL PACKAGE SECTION
  // =========================================================

  it('should display Special Packages heading', () => {

    cy.contains('Special Packages')
      .should('be.visible')
  })

  it('should validate wedding package details', () => {

    cy.contains('Wedding — 20 magnets')
      .should('be.visible')

    cy.contains('Perfect guest gift')
      .should('be.visible')

    cy.contains('Rs. 5,900')
      .should('be.visible')
  })

  it('should validate wedding frame package details', () => {

    cy.contains('Wedding — 20 + 2 Frames')
      .should('be.visible')

    cy.contains('Premium wedding package')
      .should('be.visible')

    cy.contains('Rs. 7,900')
      .should('be.visible')
  })

  it('should validate graduation package details', () => {

    cy.contains('Graduation — 6 + Frame')
      .should('be.visible')

    cy.contains('Celebrate your big day')
      .should('be.visible')
  })

  it('should validate birthday package details', () => {

    cy.contains('Birthday — 6 magnets')
      .should('be.visible')

    cy.contains('Memorable gift idea')
      .should('be.visible')
  })

  it('should validate corporate package details', () => {

    cy.contains('Corporate — 50 magnets')
      .should('be.visible')

    cy.contains('Branded bulk order')
      .should('be.visible')

    cy.contains('Rs. 11,000')
      .should('be.visible')
  })

  // =========================================================
  // SERVICE FEATURES SECTION
  // =========================================================

  it('should display all service features', () => {

    cy.contains('Island Wide Delivery')
      .should('be.visible')

    cy.contains('Cash on Delivery')
      .should('be.visible')

    cy.contains('Same Day Jaffna')
      .should('be.visible')

    cy.contains('Premium Quality')
      .should('be.visible')
  })

  // =========================================================
  // CONTACT CTA SECTION
  // =========================================================

  it('should display WhatsApp CTA section', () => {

    cy.contains('Ready to customize? Order now via WhatsApp')
      .should('be.visible')

    cy.contains('+94 753 912 534')
      .should('be.visible')

    cy.contains('magnifyofficials@gmail.com')
      .should('be.visible')
  })

  // =========================================================
  // UI VALIDATIONS
  // =========================================================

  it('should validate section cards count', () => {

    cy.get('div.rounded-3xl')
      .should('have.length.at.least', 9)
  })

  it('should validate all pricing cards are visible', () => {

    cy.get('div.rounded-3xl').each(($card) => {

      cy.wrap($card)
        .scrollIntoView()
        .should('be.visible')
    })
  })

  it('should validate uppercase headings', () => {

    cy.contains('MAGNIFY CREATIONS')
      .should('have.css', 'text-transform', 'uppercase')

    cy.contains('Special Packages')
      .should('be.visible')
  })

  // =========================================================
  // RESPONSIVE TESTING
  // =========================================================

  it('should render correctly on mobile', () => {

    cy.viewport('iphone-x')

    cy.wait(1000)

    cy.contains('MAGNIFY CREATIONS')
      .should('be.visible')

    cy.contains('Special Packages')
      .should('be.visible')
  })

  it('should render correctly on tablet', () => {

    cy.viewport('ipad-2')

    cy.wait(1000)

    cy.contains('Magnets Only')
      .should('be.visible')

    cy.contains('Corporate — 50 magnets')
      .should('be.visible')
  })

  it('should render correctly on desktop', () => {

    cy.viewport(1440, 900)

    cy.wait(1000)

    cy.contains('+94 753 912 534')
      .should('be.visible')
  })

  // =========================================================
  // SCROLL TESTING
  // =========================================================

  it('should scroll through all sections successfully', () => {

    cy.scrollTo('bottom')

    cy.wait(1000)

    cy.contains('magnifyofficials@gmail.com')
      .should('be.visible')

    cy.scrollTo('top')

    cy.wait(1000)

    cy.contains('MAGNIFY CREATIONS')
      .should('be.visible')
  })

})