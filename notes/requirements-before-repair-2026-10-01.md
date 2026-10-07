# ShopCheck requirements and acceptance criteria

Baseline: 2026-10-01. Scope: Phase 1 requirements only.

Epic: [KAN-4](https://ertihoxha874.atlassian.net/browse/KAN-4). Requirements task: [KAN-5](https://ertihoxha874.atlassian.net/browse/KAN-5).

## Status and authorship

 its name, category, euro price with two decimal places and available stock.

- **CAT-AC-03:** Search matches a case-insensitive substring of the product name, ignoring leading and trailing whitespace. An empty or whitespace-only search imposes no search restriction.

- **CAT-AC-04:** Selecting a category displays only products in that category; selecting all categories removes that restriction.

- **CAT-AC-05:** When search and category filtering are both active, only products matching both are displayed.

- **CAT-AC-06:** No matching products displays “No products found”. Clearing search and selecting all categories restores the full catalog.

- **CAT-AC-07:** Zero-stock products remain visible, display “Out of stock” and cannot be added to the cart.

## SC-REQ-03 Manage a customer cart

Jira: [KAN-8](https://ertihoxha874.atlassian.net/browse/KAN-8)

As a customer, I want to manage my own cart so that I can prepare an order.

- **CART-AC-01:** Only signed-in customers can read or modify a saved cart. Signed-out visitors attempting to add an item are prompted to sign in.

- **CART-AC-02:** Adding a product creates one cart line. Adding the same product again increases that line's quantity; it does not create a duplicate line.

- **CART-AC-03:** The server accepts only whole-number quantities from 1 through current available stock, including the resulting combined quantity when adding again. Zero, negative, fractional, nonnumeric and above-stock values are rejected with an error; the saved cart is unchanged.

- **CART-AC-04:** Each line total equals unit price multiplied by quantity. Item subtotal is the sum of line totals. Money is stored and calculated in integer euro cents.

- **CART-AC-05:** An explicit Remove action deletes a cart line and recalculates totals. Removing the last line displays an empty cart. Setting quantity to zero is not a Remove action.

- **CART-AC-06:** Refreshing the page retains the signed-in customer's saved products and quantities.

- **CART-AC-07:** Given Customer A has cart items, when A logs out and B logs in in the same browser, only B's saved items and quantities are displayed, or an empty cart if B has none. A's cart is not transferred to B. The server also rejects attempts to read or modify another customer's cart.

- **CART-AC-08:** Logout preserves the customer's cart on the server; signing in again restores that customer's saved products and quantities.

- **CART-AC-09:** Adding to a cart neither reserves nor reduces stock. On the next cart fetch or refresh after stock becomes insufficient, the affected line is flagged without silently changing its quantity. Checkout revalidates stock and rejects the order until the cart is corrected.

## SC-REQ-04 Apply a discount and calculate shipping

Jira: [KAN-9](https://ertihoxha874.atlassian.net/browse/KAN-9)

As a customer, I want clear discounts and shipping costs so that I know the amount I will pay.

- **PRICE-AC-01:** SAVE10 discounts the non-empty cart's item subtotal by 10%; shipping is excluded from the discount.

- **PRICE-AC-02:** The discount is rounded to the nearest integer cent, with half-cent values rounded up: discountCents = floor((subtotalCents + 5) / 10). For subtotal €10.05, discount is €1.01 and discounted subtotal is €9.04.

- **PRICE-AC-03:** Discount input is trimmed and compared case-insensitively; “ save10 ” is accepted as SAVE10.

- **PRICE-AC-04:** An invalid or empty submitted code displays “Invalid discount code” and changes neither the applied discount nor the total.

- **PRICE-AC-05:** A cart can have only one SAVE10 discount. Reapplying it does not stack or increase the discount.

- **PRICE-AC-06:** For a non-empty cart, shipping is €3.00 when discounted subtotal is below €50.00; shipping is €0.00 at or above €50.00. Without a code, discounted subtotal equals item subtotal.

- **PRICE-AC-07:** Order total equals discounted subtotal plus shipping. The cart displays item subtotal, discount, shipping and final total with two decimal places.

- **PRICE-AC-08:** Cart changes recalculate discount, shipping and total. An empty cart has zero subtotal, discount, shipping and total.

- **PRICE-AC-09:** A valid applied code persists with that customer's cart after refresh and logout. Removing the code recalculates totals. Removing all items clears the code. Applying a code to an empty cart is rejected with an explanatory message.

- **PRICE-AC-10:** Checkout derives prices, discount and shipping on the server using stored product data and the supported discount rule; browser-supplied amounts cannot override them.

## SC-REQ-05 Checkout and view personal orders

Jira: [KAN-10](https://ertihoxha874.atlassian.net/browse/KAN-10)

As a customer, I want to place an order and view my order history so that I can confirm my purchases.

- **ORDER-AC-01:** Checkout requires a signed-in customer and a non-empty cart. The server rejects unauthenticated or empty-cart submissions without creating an order.

- **ORDER-AC-02:** Full name, street address, city, postal code and country are required strings. After trimming, each must contain at least one character. Missing or whitespace-only values produce field-specific errors; no order or stock change occurs. Postal codes are not restricted to numeric characters.

- **ORDER-AC-03:** Checkout offers simulated payment success and failure, clearly labeled as simulation. No real payment details are requested or processed.

- **ORDER-AC-04:** Before committing an order, the server revalidates product existence and every whole-number quantity against current stock. Any invalid or insufficient-stock line rejects the entire checkout, identifies the problem and changes neither orders nor stock.

- **ORDER-AC-05:** Valid checkout with simulated payment success creates exactly one order and reduces each product's stock by its ordered quantity exactly once.

- **ORDER-AC-06:** Simulated payment failure displays an error, creates no order, reduces no stock and retains the cart and discount for retry.

- **ORDER-AC-07:** Each checkout attempt has a customer-scoped unique attempt identifier. Double-clicks, concurrent duplicate submissions and network retries reuse it and create at most one order. A retry of a successful attempt returns the original order reference without further stock changes, even after the cart was cleared.

- **ORDER-AC-08:** Reusing an attempt identifier with different checkout data is rejected without side effects. A new deliberate attempt after a failed payment or corrected checkout data uses a new identifier.

- **ORDER-AC-09:** Order creation and all stock reductions commit together or not at all. Concurrent orders cannot reduce stock below zero; if two customers compete for the last unit, at most one order succeeds.

- **ORDER-AC-10:** Successful checkout displays the order reference and clears the purchased cart and applied code. A failed checkout preserves them.

- **ORDER-AC-11:** Order history shows only the signed-in customer's orders, newest first, including reference, date, items, quantities, unit prices, item subtotal, discount, shipping and total. Customers with no orders see an explicit empty state.

- **ORDER-AC-12:** The server denies access to another customer's order, including direct requests with its identifier, and returns no order details. Signed-out requests are also denied.

- **ORDER-AC-13:** Orders store immutable purchase-time prices and totals. Later catalog-price changes do not modify historical order details.

## Completion and traceability

Implementation must satisfy the criteria without changing requirements merely to make tests pass. Each later test case references a requirement/story and relevant AC IDs. Execution records separately record tester, environment, version, actual result, status, evidence and confirmed Jira defects. Only actual results may be marked Pass or Fail; unexecuted cases remain Not Run. Bugs require reproduction against a requirement, evidence preserved before a fix, learner retesting, and relevant regression before closure.

Phase 1 is not closed by this document alone: the implementation/QA backlog and remaining Jira configuration limitations still need review. Later lessons cover test design, manual execution, API testing, focused automation and local release validation.

