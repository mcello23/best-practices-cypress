describe('Sensitive data bad practice', () => {
  beforeEach(() => {
    cy.visit('https://notes-serverless-app.com/login')
  })

  it('fills the form leaking sensitive data', () => {
    cy.get('#email').type(Cypress.env('EMAIL_USER'))
    cy.get('#password').type(Cypress.env('PASSWORD_USER'), { log: false})
  })
})
