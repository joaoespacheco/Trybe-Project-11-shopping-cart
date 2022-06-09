require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

const productObj =   {
  sku: 'MLB1615760527',
  name: ' Cpu Pc  Torre Core I5 3470 3.20ghz 8gb Ssd 240gb Com Nf',
  image: 'http://http2.mlstatic.com/D_601489-MLB42991126172_082020-I.jpg',
  salePrice: 1609
}
  

describe('2 - Teste a função fetchItem', () => {

  test('Verificando se "fetchItem" é uma "function', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  })

  test('Verificando se ao chamar "fetchItem" com o argumento "MLB1615760527" a função é chamada, se ela retorna um objeto identico a constante "item" e se o fetch utiliza como endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    expect.assertions(3);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    const funcao = await fetchItem('MLB1615760527');
    console.log(funcao)
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url);
    expect(funcao).toEqual(productObj);
  });
  
  test('Verificando se ao chamar "fetchItem" sem argumentos a função retorna o erro "You must provide an url"', async () => {
    expect.assertions(1);
    const funcao = await fetchItem();
    expect(funcao).toEqual(new Error('You must provide an url'));
  });

});
