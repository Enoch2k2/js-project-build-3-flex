### Overview (What do we want to build?)
Restaurant app, where customers can order

### Features
- Meals page - that list all of the meals the restaurant has
- Order buttons - that allows us to select the meal
- checkout - that allows us to process the order (delivery, pickup, curbside)
- potentially mock a user login?
- user could be an admin

### MVP
* Meals (DOMContentLoaded)
* Order button (click event)
* Checkout (click event, submit)

### Stretch Goals
* mocked admin login


### Day 1 Goal
* We are going to add Materialize to our project
* Create a landing page for our Restaurant
* Meals (Potentially, might be day 2) (definitely day 2)


### Day 2 Goal
* We are going to implement navigation for Meals page
* Add mock data to our db.json for meals
* List meals to the meals the page

### Events
Overall: The user will click the meals page, let it populate and then be able to click on the order button to order a meal. When they click on the meal, it should show a number next to the checkout cart.


3 question rule:
When: When the order button populates

Cause: Click

Effect: If number isn't visible, we will unhide the counter showing the incremented number.