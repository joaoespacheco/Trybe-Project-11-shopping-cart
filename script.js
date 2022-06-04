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
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

function newArrayGenerator(productsInformation) {
  const newArray = productsInformation;
  newArray.forEach((elemento) => {
    const ArrayObject = elemento;
    ArrayObject.sku = ArrayObject.id;
    ArrayObject.name = ArrayObject.title;
    ArrayObject.image = ArrayObject.thumbnail;
    delete ArrayObject.id;
    delete ArrayObject.title;
    delete ArrayObject.thumbnail;
  });
  return newArray;
}

function appendProductBoard(listChanged) {
  const productBoard = document.querySelector('.items');
  listChanged.forEach((elemento) => {
    productBoard.appendChild(createProductItemElement(elemento));
  });
}

async function CreateProductsBoard() {
  const data = await fetchProducts('computador');
  const ResultsChanged = newArrayGenerator(data.results);
  appendProductBoard(ResultsChanged);
}

CreateProductsBoard();

window.onload = () => { };
