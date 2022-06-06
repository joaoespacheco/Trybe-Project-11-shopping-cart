const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {

  test('Verifica se "saveCartItems" é uma função', () => {
    expect.assertions(1);
    expect(typeof saveCartItems).toBe('function');
  })

  test('Verifica se ao executar "saveCartItems" com o argumento "<ol><li>Item</li></ol>", o método "localStorage.setItem" é chamado', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })

  test('Verifica se ao executar "saveCartItems" com o argumento "<ol><li>Item</li></ol>", o método "localStorage.setItem" é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o argumento passado', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify('<ol><li>Item</li></ol>'));
  })

});
