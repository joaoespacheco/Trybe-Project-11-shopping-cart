const saveCartItems = (savedItems) => {
  localStorage.setItem('cartItems', JSON.stringify(savedItems));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
