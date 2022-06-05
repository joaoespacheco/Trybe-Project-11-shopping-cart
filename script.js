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

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const fatherElement = document.querySelector('.cart__items');
  fatherElement.removeChild(event.target);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

function appendProductBoard(listChanged) {
  const productBoard = document.querySelector('.items');
  listChanged.forEach((elemento) => {
    productBoard.appendChild(createProductItemElement(elemento));
  });
}

async function CreateProductsBoard(endPoint) {
  const data = await fetchProducts(endPoint);
  const { results } = data;
  const resultsChanged = results.map(({ id, title, thumbnail }) => ({
    sku: id,
    name: title,
    image: thumbnail,
  }));
  appendProductBoard(resultsChanged);
}

function appendCartItemBoard(itemChanged) {
  const itemBoard = document.querySelector('.cart__items');
  itemBoard.appendChild(createCartItemElement(itemChanged));
}

async function CreateCartItemBoard(endPoint) {
  const item = await fetchItem(endPoint);
  const { id, title, thumbnail, price } = item;
  const itemChanged = {
    sku: id,
    name: title,
    image: thumbnail,
    salePrice: price,
  };
  appendCartItemBoard(itemChanged);
}

const buttomAdd = document.querySelector('.items');

buttomAdd.addEventListener('click', (event) => {
  if (event.target.classList.value === 'item__add') {
    const fatherNode = event.target.parentNode;
    const childSku = fatherNode.childNodes[0];
    CreateCartItemBoard(childSku.innerText);
  }
});

window.onload = () => {
  CreateProductsBoard('computador');
};
