import { Given, When, Then, And, Scenario } from "cypress-cucumber-preprocessor/steps";
const loginObject = require('../page_objects/loginObjects')

function makeEmail() {
    var strValues = "abcdefg12345";
    var strEmail = "";
    var strTmp;
    for (var i = 0; i < 10; i++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strTmp = "";
    strEmail = strEmail + "@";
    for (var j = 0; j < 8; j++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strEmail = strEmail + ".com"
    return strEmail;
}

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

const login_url = loginObject.urls.login_url

Given("I visit https://console.cart.com", () => {
    cy.visit(login_url);
});

And("I see the title {string}", (string) => {
    cy.contains(loginObject[string])
});

Then("the user should be redirected to the homepage with the title {string}", (content) => {
    cy.wait(10000);
    cy.contains(content);
});


When("I fill username with {string} and password with {string} as {string} data", (email, password, valid) => {
    cy.get('#login-email').type(loginObject[valid][email]);
    cy.get('#login-password').type(loginObject[valid][password]);
});

And("click the login button", () => {
    cy.get('#btn-login').click();
})

Then("I see {string}", (content) => {
    cy.contains(content);
});

When("I fill {string} with {string} data", (password, valid) => {
    cy.get('#login-password').type(loginObject[valid][password]);
});

When("I fill the {string} field as {string} data", (email, valid) => {
    cy.get('#login-email').type(loginObject[valid][email]);
});

When("I click the Forgot Password link", () => {
    cy.get('#forgotPassword').click();
})

And("click the Forgot Password link", () => {
    cy.get('#forgotPassword').click();
})

When("I click {string}", (string) => {
    cy.contains(string).click();
});

And("Click bottom Log in link", () => {
    cy.get('#signupForm > div.sales-form-submit > div.text-center > small').contains('Log in').click();
})

Then("I see Log In button exists", () => {
    cy.get('#btn-login').contains('Log In')
})

Then("I land to the homepage with the title {string}", (string) => {
    cy.contains(string)
})