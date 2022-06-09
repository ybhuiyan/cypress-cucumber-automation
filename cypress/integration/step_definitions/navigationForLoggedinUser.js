import { Given, When, Then, And, Scenario } from "cypress-cucumber-preprocessor/steps";


Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

beforeEach(() => {
    Given("I logged in and visit cart.com homepage", () => {
        cy.login(Cypress.env('auth0_username'), Cypress.env('auth0_password'))
        cy.visit('https://console.cart.com')
        cy.wait(5000)
    })
})


When("I click the dropdown menu", () => {
    cy.get("body").then($body => {
        if ($body.find(".css-ki3ndu").length > 0) {
            cy.get(".css-ki3ndu").then($header => {
                if ($header.is(':visible')) {
                    cy.get('css-ki3ndn').click()
                } else {
                   cy.get('.css-7ty2sp').click()
                }
            })
            
        } else {
            cy.get('button > svg').click()
        }
    })
})

And("click the {string}", (link) => {
    cy.contains(link).click({'force': true})
})

Then("I see a page with url {string}", (url) => {
    cy.url().should('include', url)
})

