let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "Eyes on leaves",
    tag: "eyesonleaf",
    price: 22,
    inCart: 0,
  },
  {
    name: "Ballerina Painting",
    tag: "ballerinapainting",
    price: 20,
    inCart: 0,
  },
  {
    name: "Marilyn Monroe",
    tag: "marilynmonroe",
    price: 30,
    inCart: 0,
  },
  {
    name: "Girl In Nature",
    tag: "girlunderpinktree",
    price: 45,
    inCart: 0,
  },
  {
    name: "Rose Quartz",
    tag: "rosequartzpainting",
    price: 50,
    inCart: 0,
  },
  {
    name: "Beauty within",
    tag: "swansinapond",
    price: 36,
    inCart: 0,
  },
  {
    name: "Dancing lovers",
    tag: "coupledancing",
    price: 33,
    inCart: 0,
  },
  {
    name: "Learn the Rules Then Break them",
    tag: "learntherules",
    price: 80,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cartbutton span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cartbutton span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cartbutton span").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  console.log("My carCost is", cartCost);
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  console.log(cartItems);
  let productContainer = document.querySelector(".products-container");
  let cartCost = localStorage.getItem("totalCost");

  console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
     
      
        <div class="product">
       <ion-icon onclick="deleteButtons(event)" name="close-circle"></ion-icon>
     <h5>${item.name}</h5>
     <img src="./assets/imgs/${
       item.tag
     }.jpg" width="130px" style="margin-right:5%;
    ">
     <h5 class="price"  >${item.price}KD </h5>
        <h5 class="quantity">
        <ion-icon name="arrow-dropleft-circle"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon name="arrow-dropright-circle"></ion-icon>
        </h5>
        <h5 class="total">
        ${item.inCart * item.price}KD
        </h5>
        </div>
      </div>

        
        `;
    });

    productContainer.innerHTML += `
    <div class="basketTotalContainer">
    <h4 class="basketTotalTitle">
    Basket Total
    </h4>

    <h4 class= "basketTotal">
    ${cartCost}KD
    </h4>

    </div>
    `;
  }

  // manageQuantity();
}

function deleteButtons(event) {
  event.target.parentElement.remove();
}

// function deleteButtons() {
//   let deleteButtons = document.querySelectorAll(".product ion-icon");
//   let productName;
//   let productNumbers = localStorage.getItem("cartNumbers");
//   let cartItems = localStorage.getItem("productsInCart");
//   cartItems = JSON.parse(cartItems);
//   let cartCost = localStorage.getItem("totalCost");

//   for (let i = 0; i < deleteButtons.length; i++) {
//     deleteButtons[i].addEventListener("click", () => {
//       productName = deleteButtons[i].parentElement.textContent
//         .trim()
//         .toLowerCase()
//         .repeat();
//       // console.log(productName);
//       // console.log(
//       //   cartItems[productName].name + " " + cartItems[productName].inCart
//       // );
//       localStorage.setItem(
//         "cartNumbers",
//         productNumbers - cartItems[productName].inCart
//       );
//       localStorage.setItem('totalCost', cartCost - )
//     });
//   }
// }

onLoadCartNumbers();
displayCart();
