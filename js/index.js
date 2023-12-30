// &-------------- HTML ELEMENTS ---------------
var nameInput = document.getElementById("name");
var categoryInput = document.getElementById("category");
var priceInput = document.getElementById("price");
var descriptionInput = document.getElementById("description");
var tableBody = document.getElementById("tBody");
var addButton = document.getElementById("addBtn");
var clearButton = document.getElementById("clrBtn");
var searchInput = document.getElementById("search");
var updateBtn = document.getElementById("updateBtn");
var deleteBtn = document.getElementById("deleteBtn");
var updateButton = document.getElementById("updateButton");
var alertName = document.getElementById("alertName");
var alerCategory = document.getElementById("alerCategory");
var alertPrice = document.getElementById("alertPrice");
var alertDescription = document.getElementById("alertDescription");
// &-------------- GLOBAL VARIABLES -----------
if (localStorage.getItem("arrayPproduct") !== null) {
  var allProducts = JSON.parse(localStorage.getItem("arrayPproduct"));
  retriveProduct();
} else {
  var allProducts = [];
}
var updateIndex = 0;
// &-------------- FUNCTIONS ------------------
function createProduct() {
  if (
    valdationName() == true &&
    validationCategory() == true &&
    validationPrice() == true &&
    validationDescription() == true
  ) {
    var product = {
      productName: nameInput.value,
      productCategory: categoryInput.value,
      productPrice: priceInput.value,
      productDescription: descriptionInput.value,
    };

    allProducts.push(product);
    localStorage.setItem("arrayPproduct", JSON.stringify(allProducts));
    retriveProduct();
  }
}

function clearForm() {
  nameInput.value = "";
  categoryInput.value = "";
  priceInput.value = null;
  descriptionInput.value = "";
}

function retriveProduct() {
  var trs = "";
  for (var i = 0; i < allProducts.length; i++) {
    trs += `<tr>
        <td>${i} </td>
        <td>${allProducts[i].productName} </td>
        <td>${allProducts[i].productCategory}</td>
        <td>${allProducts[i].productPrice}</td>
        <td>${allProducts[i].productDescription}</td>
        <td> <button class="btn bg-warning" id="updateBtn" onclick="setData(${i})">
        <i class="fa-solid fa-wrench"></i>
      </button></td>

        <td>  <button class="btn bg-danger" id="deleteBtn" onclick="deleteProduct(${i})">
        <i class="fa-solid fa-trash"></i>
      </button>
      </td>
        </tr>`;
  }

  tableBody.innerHTML = trs;
}

function searchProduct() {
  var term = searchInput.value;
  var trs = "";
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].productName.toLowerCase().includes(term.toLowerCase())) {
      trs += `<tr>
          <td>${i} </td>
          <td>${allProducts[i].productName} </td>
          <td>${allProducts[i].productCategory}</td>
          <td>${allProducts[i].productPrice}</td>
          <td>${allProducts[i].productDescription}</td>
          <td> <button class="btn bg-warning" id="addBtn">
          <i class="fa-solid fa-wrench"></i>
        </button></td>
  
          <td>  <button class="btn bg-danger" id="addBtn">
          <i class="fa-solid fa-trash"></i>
        </button>
        </td>
          </tr>`;
    }

    tableBody.innerHTML = trs;
  }
}

function deleteProduct(index) {
  allProducts.splice(index, 1);
  retriveProduct();
  localStorage.setItem("arrayPproduct", JSON.stringify(allProducts));
}
function setData(index) {
  nameInput.value = allProducts[index].productName;
  categoryInput.value = allProducts[index].productCategory;
  priceInput.value = allProducts[index].productPrice;
  descriptionInput.value = allProducts[index].productDescription;
  addButton.classList.add("d-none");
  updateButton.classList.remove("d-none");
  updateIndex = index;
}
function updateProuduct() {
  var product = {
    productName: nameInput.value,
    productCategory: categoryInput.value,
    productPrice: priceInput.value,
    productDescription: descriptionInput.value,
  };
  allProducts.splice(updateIndex, 1, product);
  retriveProduct();
  localStorage.setItem("arrayPproduct", JSON.stringify(allProducts));
  addButton.classList.remove("d-none");
  updateButton.classList.add("d-none");
}
// *VALIDATION
function valdationName() {
  var text = nameInput.value;
  var regxName = /^[A-Z][a-z]{3,8}$/;
  console.log(regxName.test(text));
  if (regxName.test(text) == true) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    alertName.classList.add("d-none");
    return true;
  } else {
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    alertName.classList.remove("d-none");
    return false;
  }
}
function validationCategory() {
  var text = categoryInput.value;
  var rejexCategory = /^[A-Z][a-z]{3,8}$/;
  if (rejexCategory.test(text) == true) {
    categoryInput.classList.add("is-valid");
    categoryInput.classList.remove("is-invalid");
    alerCategory.classList.add("d-none");
    return true;
  } else {
    categoryInput.classList.remove("is-valid");
    categoryInput.classList.add("is-invalid");
    alerCategory.classList.remove("d-none");
    return false;
  }
}
function validationPrice() {
  var text = priceInput.value;
  var rejexPrice = /^\d{3,9}$/;
  if (rejexPrice.test(text) == true) {
    priceInput.classList.add("is-valid");
    priceInput.classList.remove("is-invalid");
    alertPrice.classList.add("d-none");
    return true;
  } else {
    priceInput.classList.remove("is-valid");
    priceInput.classList.add("is-invalid");
    alertPrice.classList.remove("d-none");
    return false;
  }
}
function validationDescription() {
  var text = descriptionInput.value;
  var rejexDesc = /^\w+(\s+\w+)*$/;
  if (rejexDesc.test(text) == true) {
    descriptionInput.classList.add("is-valid");
    descriptionInput.classList.remove("is-invalid");
    // alertDescription.classList.add("d-none");
    return true;
  } else {
    descriptionInput.classList.remove("is-valid");
    descriptionInput.classList.add("is-invalid");
    // alertDescription.classList.remove("d-none");
    return false;
  }
}
// &-------------- EVENTS ---------------------
addButton.onclick = createProduct;
clearButton.onclick = clearForm;
searchInput.oninput = searchProduct;
updateButton.onclick = updateProuduct;
nameInput.oninput = valdationName;
categoryInput.oninput = validationCategory;
priceInput.oninput = validationPrice;
descriptionInput.oninput = validationDescription;



