const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {

  test('Verifica se "getSavedCartItems" é uma função', () => {
    expect.assertions(1);
    expect(typeof getSavedCartItems).toBe('function');
  })

  test('Verifica se ao executar "getSavedCartItems", o método "localStorage.getItem" é chamado', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  })

  test('Verifica se ao executar "getSavedCartItems", o método localStorage.getItem é chamado com o "cartItems" como parâmetro', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })

});
