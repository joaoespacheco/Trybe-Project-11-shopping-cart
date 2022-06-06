const saveCartItems = (conteudo) => {
  localStorage.setItem('cartItems', JSON.stringify(conteudo));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
