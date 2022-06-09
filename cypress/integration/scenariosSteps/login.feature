Feature: Login

# before each test
Background: Before Each
    Given I visit https://console.cart.com
    And I see the title "welcomeTitle"

Scenario: Invalid email and password
    When I fill username with "email" and password with "password" as "invalid" data
    And click the login button
    Then I see "Wrong email or password"
    
Scenario: Blank email field
    When I fill "password" with "valid" data
    And click the login button
    Then I see "Please enter your e-mail address and password"
    
Scenario: Blank password field
    When I fill the "email" field as "valid" data
    And click the login button
    Then I see "Please enter your e-mail address and password"


Scenario: Click forgot password link
    When I fill the "email" field as "valid" data
    And click the Forgot Password link
    Then I see "We've just sent you an email to reset your password"


Scenario: Click forgot password link with blank email
    When I click the Forgot Password link
    Then I see "email or username are required"

Scenario: Click bottom Login link from Create Account page
    When I click "Create Account"
    And Click bottom Log in link
    Then I see Log In button exists

Scenario: Fill the login form with valid credintials and submit
    When I fill username with "email" and password with "password" as "valid" data
    And click the login button
    Then I land to the homepage with the title "Welcome to Cart.com!"