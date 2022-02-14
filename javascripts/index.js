// This is for our javascript logic
// NODE GETTERS
const mealsLink = () => document.getElementById("meals-link");

// Event Handlers
const renderMealsPage = (e) => {
  e.preventDefault();

  console.log('hi, it works! Yay!')
}

// Event Listeners
const attachMealsLinkEvent = () => {
  mealsLink().addEventListener('click', renderMealsPage);
}

document.addEventListener('DOMContentLoaded', () => {

  attachMealsLinkEvent();
})