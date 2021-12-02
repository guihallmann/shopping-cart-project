require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const actual = typeof fetchProducts;
  const expected = 'function';
  test('Testa se fetchProducts é uma função', () => {
    expect(actual).toBe(expected);
  });
  test('Testa se fetchProducts é chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  test('Testa se fetchProducts utiliza o endpoint correto', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  test('Testa se fetchProducts retorna um objeto igual computadorSearch', async () => {
    const actual = await fetchProducts('computador');
    const expected = computadorSearch;
    expect(actual).toEqual(expected);
  });
  test('Testa se ao chamar fetchProducts sem parâmetros um erro é retornado', async () => {
    const actual = await fetchProducts();
    const error = new Error('You must provide an url');
    expect(actual).toEqual(error);
  })
});
