describe('Forgot Password', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/forgot-password')
  })

  it('renders form', () => {
    cy.contains('Forgot Password?').should('be.visible')
  })

  it('validates email', () => {
    cy.get('button[type="submit"]').click()

    cy.get('body').should('contain', 'Invalid email address')
  })

  it('success flow', () => {
    cy.intercept('POST', '**/auth/forgot-password', {
      statusCode: 200,
      body: { success: true }
    }).as('forgotRequest')

    cy.get('input[placeholder="Email"]').type('test@mail.com')
    cy.get('button[type="submit"]').click()

    cy.wait('@forgotRequest')

    cy.contains('Check Your Email').should('be.visible')
    cy.contains('button', 'Back to Login').click() 
    cy.contains('h2', 'Welcome back').should('be.visible', { timeout: 5000 })
  })
})