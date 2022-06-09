Feature: Homepage Featured Section Navigation

Scenario Outline: Navigate by clicking Get Started or Learn More button
    Given I am logged in and at homepage
    When I click the button in "<Title>" card
    Then a page with url "<URL>" appears

    Examples:
        | Title | URL |
        | Storefront | https://console.cart.com/storefront |
        | Fulfillment | https://console.cart.com/fulfillment |
        | Unified Analytics | https://console.cart.com/unified-analytics/dashboard |
        | Multichannel Management | https://console.cart.com/multichannel-management |
        | Growth Marketing | https://console.cart.com/growth-marketing |
        | Customer Engagement | https://console.cart.com/customer-engagement |
        | Marketplace Services | https://console.cart.com/marketplace-services |
        | Data Science Solutions | https://console.cart.com/data-science-solutions |
        | Growth Capital | https://console.cart.com/growth-capital |

