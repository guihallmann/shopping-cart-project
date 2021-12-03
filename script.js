const clearButton = document.querySelector('.empty-cart');
const loadingArea = document.querySelector('.loading-area');
const totalPriceArea = document.querySelector('.total-price');
let dataArr = [];

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// function showPrice() {
//   let total = 0;
//   itemsArr.forEach((item) => {
//     total += item.price;
//   });
//   totalPriceArea.innerText = total;
// }

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const items = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  items.appendChild(section);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function cartItemClickListener(event) {
  event.target.remove();
}

clearButton.addEventListener('click', () => {
  const allItems = document.querySelectorAll('.cart__item');
  allItems.forEach((item) => item.remove());
});

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getResults(arr) {
  arr.forEach(createProductItemElement);
}

function addListenerOnButtons() {
  const cartList = document.querySelector('.cart__items');
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', async ({ target }) => {
    const id = getSkuFromProductItem(target.parentNode);
    const itemInfo = await fetchItem(id);
    dataArr = [...dataArr, 
      { SKU: `${itemInfo.id}`, 
      NAME: `${itemInfo.title}`, 
      PRICE: `${itemInfo.price}` }];
    const li = createCartItemElement(itemInfo);
    cartList.appendChild(li);
    saveCartItems(JSON.stringify(dataArr));
  }));
}
function loadingMessage() {
  const message = document.createElement('p');
  message.className = 'loading';
  message.innerText = 'Loading...';
  loadingArea.appendChild(message);
}

function removeLoading() {
  loadingArea.remove();
}

window.onload = async () => {
  loadingMessage(); 
  const allData = await fetchProducts('computador');
  const resultArr = allData.results;
  getResults(resultArr);
  addListenerOnButtons();
  removeLoading();
};
