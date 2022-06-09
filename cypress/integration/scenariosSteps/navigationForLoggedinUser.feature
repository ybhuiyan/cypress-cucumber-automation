Feature: Navigation for logged in user

Scenario Outline: Login and test Navigation link working
    Given I logged in and visit cart.com homepage
    When I click the dropdown menu
    And click the "<Link>"
    Then I see a page with url "<URL>"

    Examples:
        | Link | URL |
        | Storefront | https://console.cart.com/storefront |
        | Fulfillment | https://console.cart.com/fulfillment |
        | Dashboard | https://console.cart.com/unified-analytics/dashboard |
        | Multichannel Management | https://console.cart.com/multichannel-management |
        | Growth Marketing | https://console.cart.com/growth-marketing |
        | Customer Engagement | https://console.cart.com/customer-engagement |
        | Marketplace Services | https://console.cart.com/marketplace-services |
        | Data Science Solutions | https://console.cart.com/data-science-solutions |
        | Growth Capital | https://console.cart.com/growth-capital |