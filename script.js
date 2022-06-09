const TotalPriceNode = document.querySelector('.total-price');
const cartItemsNode = document.querySelector('.cart__items');
const itemsNode = document.querySelector('.items');
const EmptyCartNode = document.querySelector('.empty-cart');
let savedItems = [];

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const hideTagTotalPrice = () => {
  const node = TotalPriceNode;
  node.innerText = '';
};

function createTotalPrice() {
  const arraySavedItems = savedItems;
  let totalCost = 0;
  arraySavedItems.forEach(({ salePrice }) => { (totalCost += salePrice); });
  const BrlFormat = totalCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  TotalPriceNode.innerText = `Custo Total: ${BrlFormat}`;
}

function removeSavedItems(eventTarget) {
  const itemToRemove = savedItems.find(({ sku }) => eventTarget.innerText.includes(sku));
  savedItems.splice(savedItems.indexOf(itemToRemove), 1);
  saveCartItems(savedItems);
  if (savedItems.length > 0) createTotalPrice();
  else hideTagTotalPrice();
}

const cartItemClickListener = (event) => {
  const fatherElement = cartItemsNode;
  fatherElement.removeChild(event.target);
  removeSavedItems(event.target);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  const BrlFormat = salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  li.className = 'cart__item';
  li.innerText = `[Cod. ${sku}] - ${name}
  Custo unitário: ${BrlFormat}`;
  li.addEventListener('click', cartItemClickListener);
  savedItems.push({ sku, name, salePrice });
  return li;
};

function appendCartItemBoard(productObj) {
  const fatherNode = cartItemsNode;
  fatherNode.appendChild(createCartItemElement(productObj));
  saveCartItems(savedItems);
  createTotalPrice();
}

function getSavedStartItems() {
  const storageItemsSaved = JSON.parse(getSavedCartItems());
  sessionStorage.removeItem('CartItem');
  if (storageItemsSaved !== null) {
    storageItemsSaved.forEach((productObj) => appendCartItemBoard(productObj));
  }
}

function appendProductBoard(productsArray) {
  const productBoard = document.querySelector('.items');
  productsArray.forEach((product) => productBoard.appendChild(createProductItemElement(product)));
}

async function CreateProductsBoard(productCategory) {
  const { results } = await fetchProducts(productCategory);
  const resultsChanged = results.map(({ id, title, thumbnail }) => ({
    sku: id,
    name: title,
    image: thumbnail,
  }));
  appendProductBoard(resultsChanged);
  getSavedStartItems();
}

async function CreateCartItemBoard(productSku) {
  const { sku, name, image, salePrice } = await fetchItem(productSku);
  appendCartItemBoard({ sku, name, image, salePrice });
}

itemsNode.addEventListener('click', (event) => {
  if (event.target.classList.value === 'item__add') {
    CreateCartItemBoard(getSkuFromProductItem(event.target.parentNode));
  }
});

EmptyCartNode.addEventListener('click', () => {
  const boardCartItems = cartItemsNode;
  boardCartItems.innerHTML = '';
  hideTagTotalPrice();
  savedItems = [];
  saveCartItems(savedItems);
});

function loading(status) {
  const boardItems = itemsNode;
  if (status === 'loadingOn') {
    boardItems.appendChild(createCustomElement('section', 'loading', '...loading'));
  } else {
    const loadingNode = document.querySelector('.loading');
    loadingNode.remove();
  }
}

window.onload = async () => {
  loading('loadingOn');
  await CreateProductsBoard('computador');
  loading('loadingOff');
};
