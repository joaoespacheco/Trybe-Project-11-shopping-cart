require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('Verificando se "fetchProducts" é uma "function', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  })

  test('Verificando se ao chamar "fetchProducts" com o argumento "computador" a função é chamada, se ela retorna um objeto identico a constante "computadorSearch" e se o fetch utiliza como endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    expect.assertions(3);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    const funcao = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url);
    expect(funcao).toEqual(computadorSearch);
  });

  test('Verificando se ao chamar "fetchProducts" sem argumentos a função retorna o erro "You must provide an url"', async () => {
    expect.assertions(1);
    const funcao = await fetchProducts();
    expect(funcao).toEqual(new Error('You must provide an url'));
  });

});
