import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Given("I am logged in and at homepage", () => {
    cy.login(Cypress.env('auth0_username'), Cypress.env('auth0_password'))
    cy.visit('https://console.cart.com')
    cy.wait(15000)
})

When("I click the button in {string} card", (title) => {
    cy.get('ul>li').each(($el) => {
        const text = $el.find('h3').text()
        if (text === title) {
            cy.wrap($el).find('[data-testid="button"]').click()
        }
    })
})

Then("a page with url {string} appears", (url) => {
    cy.url().should('include', url)
})