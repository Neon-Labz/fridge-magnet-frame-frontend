describe('Register Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register')
  })

  it('renders register modal with all expected elements', () => {
    cy.contains('Create Account').should('be.visible')
    cy.get('input[placeholder="Full Name"]').should('exist')
    cy.get('input[placeholder="Email"]').should('exist')
    cy.get('input[placeholder="Password"]').should('exist')
    cy.contains('Sign in with Google').should('be.visible')
    cy.get('button[type="submit"]').contains('Register')
    cy.contains('Already have an account?').should('be.visible')
  })

  it('validates empty fields and invalid email on register page', () => {
    cy.get('button[type="submit"]').click()

    cy.contains('Full name must be at least 2 characters')
    cy.contains('Invalid email address')
    cy.contains('Password must be at least 6 characters')
  })

  it('registers successfully using mocked API', () => {
    cy.intercept('POST', '**/auth/register', {
      statusCode: 200,
      body: {
        success: true,
        data: { id: 1 }
      }
    })

    cy.get('input[name="fullName"]').type('Test')
    cy.get('input[name="email"]').type('test@test.com')
    cy.get('input[name="password"]').type('123456')

    cy.get('button[type="submit"]').click()

    cy.contains('Create Account').should('be.visible')
  })

  it('Check sign in with google button clickable', () => {
    cy.contains('Sign in').click()
    // cy.contains('h2', 'Welcome back').should('be.visible', { timeout: 5000 })
  })
})