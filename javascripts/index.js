// This is for our javascript logic
const baseUrl = 'http://localhost:3000'
let meals = []

// NODE GETTERS
const mainDiv = () => document.getElementById("main");
const mealsLink = () => document.getElementById("meals-link");

// Functions
const fetchmeals = () => {
  fetch(baseUrl + "/meals")
    .then(resp => resp.json())
    .then(data => {
      meals = data;
    })
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

// Event Listeners
const attachMealsLinkEvent = () => {
  mealsLink().addEventListener('click', renderMealsPage);
}

// Helpers

const createCard = (meal) => {
  console.log(meal)
  const divCard = document.createElement('div');
  const divImage = document.createElement('div');
  const divCardContent = document.createElement('div');
  const divCardAction = document.createElement('div');
  const img = document.createElement('img');
  const span = document.createElement('span');
  const pDescription = document.createElement('p')
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
  link1.innerText = "Order";

  divImage.appendChild(img);
  divImage.appendChild(span);
  divCardContent.appendChild(pDescription);
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

document.addEventListener('DOMContentLoaded', () => {
  fetchmeals();
  attachMealsLinkEvent();
})


{/* <h3 class="center-align" style="margin-top: 10px; padding-top: 10px">Welcome to Flatiron Tacos!</h3>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero consequatur, doloremque dignissimos tempore doloribus optio dolor voluptas maxime ducimus obcaecati adipisci quod amet quibusdam laboriosam deserunt quam inventore provident laborum?</p> */}