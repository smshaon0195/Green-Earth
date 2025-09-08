// Catagori Display---------------------
let allCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((categoriList) => categoriList.json())
    .then((listItem) => {
      displayCatagories(listItem.categories);
    });
};

// {
//     "id": 1,
//     "category_name": "Fruit Tree",
//     "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
// }

let activeBtn = (id) => {
  let allLi = document.querySelectorAll("#item-catagories-parent li");
  allLi.forEach((li) => li.classList.remove("buttonActive"));

  let element = document.getElementById(id);
  element.classList.add("buttonActive");

};


let displayCatagories = (name) => {
name.forEach((id) => {
    let ulParent = document.getElementById("item-catagories-parent");
    let li = document.createElement("li");
    li.innerHTML = `
    
    <li onclick="activeBtn(id)" id="catagory-${id.id}"  class="my-2 hover:bg-[#15803D] hover:text-white cursor-pointer p-1 rounded-sm">${id.category_name}</li>
        
    `;

    ulParent.appendChild(li);
  });
};

allCategories();

let manageSpiner = (loding) => {
  if (loding == true) {
    document.getElementById("spiner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("card-container").classList.remove("hidden");
    document.getElementById("spiner").classList.add("hidden");
  }
};
// Card Display-----------------
let allPlants = () => {
  manageSpiner(true);
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((plats) => plats.json())
    .then((plantCard) => {
      displayPlants(plantCard.plants);
    });
};

let displayPlants = (cards) => {
  const cardParent = document.getElementById("card-container");

  cards.forEach((card) => {
    let newCard = document.createElement("div");
    newCard.innerHTML = `
              <div class="card bg-white shadow p-3">
                <div class="img">
                  <img
                    class="w-full h-40 rounded-xl"
                    src="${card.image}"
                    alt="" />
                </div>
                <div class="card-titile my-3">
                  <h4 class="font-bold mb-1">${card.name}</h4>
                  <p class="w-full h-13 line-clamp-2">${card.description}</p>
                </div>
                <div class="flex justify-between">
                  <div class="ammount-titile mb-3">
                    <button
                      class="p-1 text-md rounded-2xl font-semibold px-3 bg-[#daf8e5] text-[#15803D]"
                    >
                     ${card.category}
                    </button>
                  </div>
                  <div class="ammout text-xl font-semibold">
                    <span class="font-bold text-2xl">৳</span>${card.price}
                  </div>
                </div>
                <button  class="btn add-to-cart  bg-[#15803D] rounded-3xl text-white btn-active">
                  Add to Cart
                </button>
              </div>
`;
    cardParent.appendChild(newCard);
    manageSpiner(false);
    let addBtn = newCard.querySelector(".add-to-cart");
    // console.log(addBtn)

    addBtn.addEventListener("click", function () {
      addHistory(card);
    });
  });
};

let taka = 0;
let pPrice = document.getElementById("taka").innerText
let price = Number(pPrice)
// Add money funcation
let totalAmmount = (ammount)=>{
taka += ammount;   
 document.getElementById("taka").innerText = taka;

}


let addHistory = (item) => {
  totalAmmount(item.price)

  alert(`${item.name} is succesfully copy`);
  const historyParent = document.getElementById("cart-parents");
  let historyItem = document.createElement("div");
  historyItem.innerHTML = `
 <div id="cart-parent" class="mb-3 ">
                  <div class="cart flex justify-between items-center px-3 p-1 rounded-xl bg-[#F0FDF4]">
                    <div class="titleBlance">
                      <h4 class="font-bold">${item.name}</h4>
                      <p class="text-[#1F2937]">৳<span class="price">${item.price}</span> x 1</p>
                    </div>
                    <div class="cencel hover:cursor-pointer">X</div>
                  </div>
                </div>
  `;
  historyParent.appendChild(historyItem);

let cancels = document.querySelectorAll(".cencel");

cancels.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (taka <= 0) return;

    let parent = e.target.closest("#cart-parent");

    let price = Number(parent.querySelector(".price").innerText);

    taka -= price;

    if (taka < 0) taka = 0;

    document.getElementById("taka").innerText = taka;

    parent.remove();
  });
});





  
};

allPlants();






// let totalPrice = document.createElement("div");
//   totalPrice.innerHTML = `

// 

//     `;
