import { Given , And , Then , When} from "cypress-cucumber-preprocessor/steps";

Cypress.on('uncaught:exception', (err, runnable)=>{
    return false
})

Given('I go to the url https://console.cart.com', () => {
    cy.visit('https://console.cart.com')
    cy.contains('Welcome to Cart.com')
})

When("I enter valid email", ()=>{
    cy.get('#login-email').type('automation-brandconsole-dev@cart.com')
})

And("I enter valid password", ()=>{
    cy.get('#login-password').type('aKo1C3#GYzn5')
})

And("I click on the Log in button", () =>{
    cy.get('#btn-login').click()
})

Then("I land on organization dashboard page", ()=>{
    cy.contains('Wrong email or password')
})
