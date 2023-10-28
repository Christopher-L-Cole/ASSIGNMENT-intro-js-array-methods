import { card } from "../components/card.js";
import { tableRow } from "../components/table.js";
import { referenceList } from "../data/reference.js";
import { renderToDom } from "../utils/renderToDom.js";

// Reusable function to get the cards on the DOM
// .forEach()
const renderCards = (array) => { //array is taco
  let refStuff = "";

  array.forEach((item) => {        //each time it goes through the array it takes the object in the array at that time, so first then second, etc.. so that we have access to that item.
    refStuff += card(item); 
  });

  renderToDom("#cards", refStuff);
}

// UPDATE/ADD ITEMS TO CART
// .findIndex() & (.includes() - string method)
const toggleCart = (event) => {
  if (event.target.id.includes("fav-btn")) {
   console.log('Clicked Fav btn')
  }
}

// SEARCH
// .filter()
const search = (event) => {
  const eventLC = event.target.value.toLowerCase();
  console.log(eventLC)
}

// BUTTON FILTER
// .filter() & .reduce() &.sort() - chaining
const buttonFilter = (event) => {
  if(event.target.id.includes('free')) {
    const free = referenceList.filter(item => item.price <= 0) //filter returns a new array. if item price is less than or equal to 0 return that in a new array.
    renderCards(free); //passing free into reusable function. creates new array, iterates through it. btw item is taco
  }
  if(event.target.id.includes('cartFilter')) { // we want to see if the item is in the cart. 
    const wishList = referenceList.filter(item => item.inCart); // could also call it const cartFilter, we set the id to cartFilter in HTML which is for the Wish list button. renaming it wish list just makes sense to me.
    renderCards(wishList); // we could have wrote item => item.inCart === true. but with boolean it already knows what we're doing. having a true statement in the object inCart element makes it work this way. we could write a banger (!) in before to look for false
  }
  if(event.target.id.includes('books')) {
    const books = referenceList.filter(item => item.type.toLowerCase() === 'book'); // we did this cause data was messed up. we had a case that wasn't uniform in reference.js
    renderCards(books);
  }
  if(event.target.id.includes('clearFilter')) { // we want to clear all the filters when they click the button
    renderCards(referenceList);  // referenceList shows everything, its our array. so we pass that to see everything again. 
  }
  
  if(event.target.id.includes('productList')) {
    let table = `<table class="table table-dark table-striped" style="width: 600px">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Type</th>
        <th scope="col">Price</th>
      </tr>
    </thead>
    <tbody>
    `;
    
    productList().forEach(item => {
      table += tableRow(item);
    });

    table += `</tbody></table>`

    renderToDom('#cards', table);
  }
  
}

// CALCULATE CART TOTAL
// .reduce() & .some()
const cartTotal = () => {
  const total = 0
  document.querySelector("#cartTotal").innerHTML = total.toFixed(2);
}

// RESHAPE DATA TO RENDER TO DOM
// .map()
const productList = () => {
  return [{ title: "SAMPLE TITLE", price: 45.00, type: "SAMPLE TYPE" }]
}


const startApp = () => {
  // PUT ALL CARDS ON THE DOM
  renderCards(referenceList)

  // PUT CART TOTAL ON DOM
  cartTotal();

  // SELECT THE CARD DIV
  document.querySelector('#cards').addEventListener('click', toggleCart);

  // SELECT THE SEARCH INPUT
  document.querySelector('#searchInput').addEventListener('keyup', search)

  // SELECT BUTTON ROW DIV
  document.querySelector('#btnRow').addEventListener('click', buttonFilter);
}
startApp();
