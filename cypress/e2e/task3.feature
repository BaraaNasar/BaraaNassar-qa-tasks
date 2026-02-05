Feature: SauceDemo Functionalities
  I want to verify the main functionalities of the Swag Labs website: Login, Checkout, and Logout.

  Background:
    Given I visit the SauceDemo website

  Scenario Outline: Login with multiple users
    When I enter username "<username>"
    And I enter password "<password>"
    And I click the login button
    Then I should be logged in successfully

    Examples:
      | username                | password     |
      | standard_user           | secret_sauce |
      | problem_user            | secret_sauce |
      | performance_glitch_user | secret_sauce |

  Scenario: Checkout Flow
    Given I am logged in as "standard_user"
    When I add a product to the cart
    And I click on the cart icon
    And I proceed to checkout
    And I fill the checkout information
    And I finish the checkout
    Then the order should be completed successfully

  Scenario: Logout Flow
    Given I am logged in as "standard_user"
    When I click the logout button
    Then I should be redirected to the login page
