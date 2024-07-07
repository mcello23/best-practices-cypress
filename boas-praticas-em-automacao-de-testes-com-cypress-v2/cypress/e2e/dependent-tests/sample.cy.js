describe('Dependent tests bad practice', () => {
  beforeEach(() => {
    cy.session('login', () => { // Garanta que 'login' seja uma string que identifica unicamente esta sessão
      cy.visit('http://notes-serverless-app.com/login')
  
      cy.get('#email').type(Cypress.env('EMAIL_USER'))
      cy.get('#password').type(Cypress.env('PASSWORD_USER'), { log: false })
      cy.get('button[type="submit"]').click()
      
      cy.contains('h1', 'Your Notes').should('be.visible')
    })
    cy.visit('http://notes-serverless-app.com')
  })

  it('CRUDS a note', () => {
    cy.contains('Create a new note').click()

    cy.get('#content').type('My note')
    cy.contains('Create').click()

    cy.get('.list-group').should('contain', 'My note')

    cy.get('.list-group').contains('My note').click()
    cy.get('#content').type(' updated')
    cy.contains('Save').click()

    cy.get('.list-group').should('contain', 'My note updated')
    cy.get('.list-group:contains(My note updated)').should('be.visible')

    cy.get('.list-group').contains('My note updated').click()
    cy.contains('Delete').click()
    cy.get('.list-group a')
      .its ('length')
      .should ('be.at.least', 1)
    cy.get('.list-group:contains(My note updated)').should('not.exist')
  })
})