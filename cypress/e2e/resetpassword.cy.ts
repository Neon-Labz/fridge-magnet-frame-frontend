describe('Reset Password', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/reset-password')
  })

  it('renders form', () => {
    cy.contains('Reset password').should('be.visible')
  })

  it('shows validation error for password mismatch', () => { 
    cy.get('input[placeholder="New password"]').type('12345678') 
    cy.get('input[placeholder="Confirm password"]').type('wrongpass') 
    cy.get('button[type="submit"]').click() 
    cy.contains("Passwords don't match") 
  }) 
  it('shows validation error for too short password', () => { 
    cy.get('input[placeholder="New password"]').type('short') 
    cy.get('input[placeholder="Confirm password"]').type('short') 
    cy.get('button[type="submit"]').click() 
    cy.contains('Password must be at least 8 characters') })

  it('success reset', () => {
    cy.intercept('POST', '**/auth/reset-password', {
      statusCode: 200,
      body: { success: true }
    }).as('resetRequest')

    cy.get('input[placeholder="New password"]').type('12345678')
    cy.get('input[placeholder="Confirm password"]').type('12345678')

    cy.get('button[type="submit"]').click()

    cy.wait('@resetRequest')

    cy.contains('Password Updated').should('be.visible')
    cy.contains('button', 'Back to Login').click() 
    cy.contains('h2', 'Welcome back').should('be.visible', { timeout: 5000 })
  })
})