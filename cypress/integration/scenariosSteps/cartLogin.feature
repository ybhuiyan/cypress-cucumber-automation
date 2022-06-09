Feature: Login to cart.com

Scenario: User should be able to login to cart.com with valid user name and password. 
    Given I go to the url https://console.cart.com
    When I enter valid email
    And I enter valid password
    And I click on the Log in button
    Then I land on organization dashboard page
