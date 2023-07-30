const year = document.getElementById("year");
const thisYear = new Date().getFullYear();
year.setAttribute("datetime", thisYear);
year.textContent = thisYear;

import menu from "./modules/menu.js";
import personReviews from "./modules/person.js";

let article = document.querySelector(".menu");

// load data from array

window.addEventListener("DOMContentLoaded", function () {
  let displayMenu = menu.map(function (item) {
    return `
  <section>
 <img src="${item.image}" alt ="${item.name}"/>
 <header>
 <h3 class="name">${item.name}</h3>
 <h4 class="price">$${item.price}</h4>
 </header>
 <p>${item.description}</p>
 <div class="btn">
 <button class="btn_minus" id="${item.id}">-</button>
 <input class="btn_input" type="text" value="0">
 <button class="btn_plus" id="${item.id}">+</button>
 </div>
 
 </section>`;
  });
  displayMenu = displayMenu.join("");
  article.innerHTML = displayMenu;

  //menu section

  let btnsPlus = document.querySelectorAll(".btn_plus");
  let btnsMinus = document.querySelectorAll(".btn_minus");
  let counters = document.querySelectorAll(".btn_input");
  let displayItems = document.querySelector(".display-items");
  let checkoutButton = document.querySelector(".checkout-btn");

  let orderItem;
  let totalPrice = 0;
  let operator;

  let counter;
  btnsPlus.forEach(function (btnPlus, index) {
    btnPlus.addEventListener("click", function () {
      operator = "+";

      counter = parseInt(counters[index].value);
      counters[index].value = counter + 1;
      addOrder(menu[index]);
      calculateTotalPrice(index, operator);
    });
  });

  btnsMinus.forEach(function (btnMinus, index) {
    btnMinus.addEventListener("click", function () {
      operator = "-";
      counter = parseInt(counters[index].value);
      if (counter > 0) {
        counters[index].value = counter - 1;
        removeOrder(menu[index]);
        calculateTotalPrice(index, operator);
      }
    });
  });
  function addOrder(item) {
    orderItem = document.createElement("div");
    orderItem.classList.add("order-item");
    orderItem.innerHTML = item.name + " $" + item.price;
    displayItems.append(orderItem);
  }

  function removeOrder(item) {
    let namePrice = item.name + " $" + item.price;
    let orders = document.querySelectorAll(".order-item");

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].innerHTML === namePrice) {
        orders[i].remove();
        break;
      }
    }
  }
  function calculateTotalPrice(index, operator) {
    if (operator === "+") {
      totalPrice += menu[index].price;
    } else if (operator === "-") {
      totalPrice -= menu[index].price;
    }
  }

  checkoutButton.addEventListener("click", function () {
    orderItem = document.createElement("div");
    orderItem.classList.add("order-item");
    orderItem.innerHTML = "Total $" + totalPrice.toFixed(2);

    displayItems.append(orderItem);
  });
  let reset = document.querySelector(".reset");
  reset.addEventListener("click", function () {
    for (const item of counters) {
      item.value = 0;
    }
    let orders = document.querySelectorAll(".order-item");
    for (const order of orders) {
      order.remove();
    }
    totalPrice = 0;
  });
});

// reviews section
let image = document.getElementById("person-image");
let name = document.getElementById("person-name");
let review = document.getElementById("review");
let buttonLeft = document.getElementById("button-left");
let buttonRight = document.getElementById("button-right");

let currentPerson = 0;

//intial load for first item in array as a default
window.addEventListener("DOMContentLoaded", function () {
  getPersonInfo(currentPerson);
});

// left buuton
buttonLeft.addEventListener("click", function () {
  currentPerson++;
  if (currentPerson > personReviews.length - 1) {
    currentPerson = 0;
  }
  getPersonInfo(currentPerson);
});

//right buuton
buttonRight.addEventListener("click", function () {
  currentPerson--;
  if (currentPerson < 0) {
    currentPerson = personReviews.length - 1;
  }
  getPersonInfo(currentPerson);
});

function getPersonInfo(index) {
  let firstPerson = personReviews[index];
  image.src = firstPerson.image;
  name.innerHTML = firstPerson.name;
  review.innerHTML = firstPerson.description;
}
