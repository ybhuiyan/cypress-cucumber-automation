import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

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

function generateRandomeText() {
    var strValues = "abcdefg12345";
    var strEmail = "";
    var strTmp;
    for (var i = 0; i < 10; i++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    return strEmail;
}

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const url = "https://console.cart.com";

Given("I visit https://console.cart.com", () => {
    cy.visit(url);
    cy.get("body").then($body => {
        if ($body.find("#login-email").length > 0) {
            //evaluates as true
        } else {
            cy.contains("Create Organization").click();
            cy.get('header > div').eq(2).within(() => {
                cy.get('div > button').click();
                cy.contains('Sign Out').click();
            });
        }
    });
    cy.contains(string)
});


When("user click the Create Account button", (string) => {
    cy.get('#nav-profile-tab').click();
});

And("the user fill in the form with the following information and submit", (datatable) => {
    // user fill in the form with the following information
    datatable.hashes().forEach(row => {
        cy.get('#x_first_name').type(row.firstname);
        cy.get('#x_last_name').type(row.lastname);
        cy.get('#email').type(makeEmail());
        cy.get('#password').type(row.password);
        cy.get('#phone').type(row.phone);

        cy.get('#btn-signup').click();
    });
});

And("the user see the Create Organization button and click it", () => {
    cy.contains('Create Organization').click();
});

And("the user fill the organization form and submit", () => {
    cy.get('#organization-name').type(generateRandomeText());
    cy.get('#organization-url').type('example.com');
    // select the 3rd div of form
    cy.get('form > div').eq(2).within(() => {
        cy.get('div > button').click();
        cy.contains('$0 - $200,000').click();
    });
    // select the 4th div of form
    cy.get('form > div').eq(3).within(() => {
        cy.get('div > button').click();
        cy.contains('Online').click();
    });
    cy.wait(3000);
    cy.contains('Create Organization').click();
});

Then("the user should be redirected to the homepage with the text {string}", (content) => {
    cy.contains(content);
});


When("I click {string}", (string) => {
    cy.contains(string).click();
});

Then("I see {string}", (content) => {
    cy.contains(content);
});


And("I click Create Account button", () => {
    cy.get('#btn-signup').click();
})


And("I fill in the form with the following information and submit without filling {string}", (string, datatable) => {
    datatable.hashes().forEach(row => {
        cy.get('#x_first_name').type(row.firstname);
        cy.get('#x_last_name').type(row.lastname);
        cy.get('#email').type(makeEmail());
        cy.get('#password').type(row.password);
        cy.get('#phone').type(row.phone);
    });

    if (string === "First name") {
        cy.get('#x_first_name').clear();
    } else if (string === "Last name") {
        cy.get('#x_last_name').clear();
    } else if (string === "Email") {
        cy.get('#email').clear();
    } else if (string === "Password") {
        cy.get('#password').clear();
    } else if (string === "Phone") {
        cy.get('#phone').clear();
    }

    cy.get('#btn-signup').click();
})