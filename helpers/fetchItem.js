const fetchItem = async (productSku) => {
  const url = `https://api.mercadolibre.com/items/${productSku}`;
  try {
    const response = await fetch(url);
    const item = await response.json();
    const { id, title, thumbnail, price } = item;
    const productItem = {
      sku: id,
      name: title,
      image: thumbnail,
      salePrice: price,
    };
    return productItem;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
