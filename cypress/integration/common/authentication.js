//Cypress.config('experimentalSessionAndOrigin', true)

Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
      cy.visit('https://console.cart.com/')
      cy.get('#login-email').type(username)
      cy.get('#login-password').type(password)
      cy.get('#btn-login').click()
      cy.wait(10000)
      cy.contains('Welcome to Cart.com!')
    })
  })