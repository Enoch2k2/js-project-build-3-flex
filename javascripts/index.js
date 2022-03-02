// This is for our javascript logic
const baseUrl = 'http://localhost:3000'
let meals = []
let checkoutNum = 0;
let cart = []

// NODE GETTERS
const mainDiv = () => document.getElementById("main");
const mealsLink = () => document.getElementById("meals-link");
const checkoutLink = () => document.getElementById("checkout-link");
const checkoutNumber = () => document.getElementById("checkout-number");
const checkoutNumberDisplay = () => document.getElementById("checkout-number-display");

// Functions
const fetchmeals = () => {
  fetch(baseUrl + "/meals")
    .then(resp => resp.json())
    .then(data => {
      meals = data;
    })
}

const searchMeals = term => {
  return meals.filter(meal => meal.name.toLowerCase().includes(term.toLowerCase()))
}

const renderMeals = () => {
  // iterate over meals and display them as cards
  const row = document.createElement('row');
  row.className = "row";

  meals.forEach(meal => {
    const col = renderMeal(meal)

    row.appendChild(col);
  });

  mainDiv().appendChild(row);
}

const renderMeal = meal => {
  // render the meal to the page
  const col = document.createElement('div');
  col.className = "col s12 m4 l4"

  col.appendChild(createCard(meal))

  return col;
}

// Event Handlers
function addOrder(e) {
  e.preventDefault();
  let item = cart.find(item => item.id === this.id);

  if(item) {
    item.qty++
  } else {
    let newItem = {
      ...this,
      qty: 1
    }

    cart.push(newItem);
  }
  
  checkoutNumber().style.display = 'inline-block';
  checkoutNumberDisplay().innerText = checkoutQuantity();
}

const checkoutQuantity = () => {
  return cart.reduce((total, item) => total + item.qty, 0);
}

const checkoutTotal = () => {
  return cart.reduce((total, item) => total + (item.qty * item.price), 0);
}

const renderMealsPage = (e) => {
  e.preventDefault();

  resetMain();

  const h3 = document.createElement('h3');
  h3.innerText = "Meal List Page"
  h3.className = "center-align"
  h3.style.marginTop = "10px";
  h3.style.paddingTop = "10px";

  mainDiv().appendChild(h3);

  renderMeals();
}

const renderCheckoutPage = (e) => {
  e.preventDefault();
  resetMain();
  
  const h3 = document.createElement('h3');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const theadRow = document.createElement('tr');
  const thMealName = document.createElement('th');
  const thPrice = document.createElement('th');
  const thQty = document.createElement('th');
  const thAddOne = document.createElement('th');
  const thRemoveOne = document.createElement('th');
  const thRemove = document.createElement('th');
  const pTotal = document.createElement('p');
  const checkoutBtn = document.createElement('button');

  h3.className = "center-align"
  table.className = "highlight responsive-table"
  checkoutBtn.className = 'btn';

  h3.style.marginTop = "10px";
  h3.style.paddingTop = "10px";

  h3.innerText = "Checkout"
  thMealName.innerText = "Meal Name"
  thPrice.innerText = "Price"
  thQty.innerText = "Qty"
  thAddOne.innerText = 'Add 1'
  thRemoveOne.innerText = 'Remove 1'
  thRemove.innerText = "Remove"
  pTotal.innerText = `Total: $${checkoutTotal()}`
  checkoutBtn.innerText = "Checkout"

  theadRow.appendChild(thMealName)
  theadRow.appendChild(thPrice)
  theadRow.appendChild(thQty)
  theadRow.appendChild(thAddOne)
  theadRow.appendChild(thRemoveOne)
  theadRow.appendChild(thRemove)

  // for every meal we'll make a table row with table data
  cart.forEach(meal => {
    const tr = document.createElement('tr');
    const mealName = document.createElement('td');
    const price = document.createElement('td');
    const qty = document.createElement('td');
    const addOne = document.createElement('td');
    const removeOne = document.createElement('td');
    const addOneBtn = document.createElement('button');
    const removeOneBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    const remove = document.createElement('td');

    addOneBtn.className = 'btn';
    removeOneBtn.className = 'btn';
    removeBtn.className = 'btn';

    addOneBtn.innerText = "add";
    removeOneBtn.innerText = "subtract";
    removeBtn.innerText = "remove";

    mealName.innerText = meal.name;
    price.innerText = `$${meal.price}`;
    qty.innerText = meal.qty;

    addOne.appendChild(addOneBtn);
    removeOne.appendChild(removeOneBtn);
    remove.appendChild(removeBtn);

    tr.appendChild(mealName);
    tr.appendChild(price);
    tr.appendChild(qty);
    tr.appendChild(addOne);
    tr.appendChild(removeOne);
    tr.appendChild(remove);

    tbody.appendChild(tr);
  })
  
  thead.appendChild(theadRow);
  table.appendChild(thead);
  table.appendChild(tbody);

  mainDiv().appendChild(h3);
  mainDiv().appendChild(table);
  mainDiv().appendChild(pTotal);
  mainDiv().appendChild(checkoutBtn);

  //   <p class="right-align">Total: $2.98</p>
}

// Event Listeners
const attachMealsLinkEvent = () => {
  mealsLink().addEventListener('click', renderMealsPage);
}

const attachCheckoutLinkEvent = () => {
  checkoutLink().addEventListener('click', renderCheckoutPage);
}

// Helpers

const createCard = (meal) => {
  const divCard = document.createElement('div');
  const divImage = document.createElement('div');
  const divCardContent = document.createElement('div');
  const divCardAction = document.createElement('div');
  const img = document.createElement('img');
  const span = document.createElement('span');
  const pDescription = document.createElement('p')
  const pPrice = document.createElement('p');
  const link1 = document.createElement('a');

  divCard.className = "card";
  divImage.className = "card-image";
  divCardContent.className = "card-content";
  divCardAction.className = "card-action";
  span.className = 'card-title';


  img.setAttribute("src", meal.imageUrl);
  link1.setAttribute("href", "#");

  span.innerText = meal.name;
  pDescription.innerText = meal.description;
  pPrice.innerText = `$${meal.price}`;
  link1.innerText = "Order";

  link1.addEventListener('click', addOrder.bind(meal));

  divImage.appendChild(img);
  divImage.appendChild(span);
  divCardContent.appendChild(pDescription);
  divCardContent.appendChild(pPrice);
  divCardAction.appendChild(link1);

  divCard.appendChild(divImage);
  divCard.appendChild(divCardContent);
  divCard.appendChild(divCardAction);

  // <div class="col s12 m7">
  //   <div class="card">
  //     <div class="card-image">
  //       <img src="images/sample-1.jpg">
  //       <span class="card-title">Card Title</span>
  //     </div>
  //     <div class="card-content">
  //       <p>I am a very simple card. I am good at containing small bits of information.
  //       I am convenient because I require little markup to use effectively.</p>
  //     </div>
  //     <div class="card-action">
  //       <a href="#">This is a link</a>
  //     </div>
  //   </div>
  // </div>

  return divCard;
}

const resetMain = () => {
  mainDiv().innerHTML = "";
}

const hideCheckoutNumber = () => {
  checkoutNumber().style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  fetchmeals();
  attachMealsLinkEvent();
  attachCheckoutLinkEvent();
  hideCheckoutNumber();
})


{/* <h3 class="center-align" style="margin-top: 10px; padding-top: 10px">Welcome to Flatiron Tacos!</h3>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero consequatur, doloremque dignissimos tempore doloribus optio dolor voluptas maxime ducimus obcaecati adipisci quod amet quibusdam laboriosam deserunt quam inventore provident laborum?</p> */}