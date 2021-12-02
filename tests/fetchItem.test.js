require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  const url = 'https://api.mercadolibre.com/items/MLB1615760527';
  test('Testa se fetchItem é uma função', () => {
    const actual = typeof fetchItem;
    const expected = 'function';
    expect(actual).toBe(expected);
  });
  test('Testa se fetchItem é chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  test('Testa se fetchItem utiliza o endpoint correto' ,() => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  test('Testa se fetchItem retorna um objeto igual item', async () => {
    const actual = await fetchItem('MLB1615760527');
    const expected = item;
    expect(actual).toEqual(expected);
  });
  test('Testa se ao chamar fetchItem sem parâmetros um erro é retornado', async () => {
    const actual = await fetchItem();
    const error = new Error('You must provide an url');
    expect(actual).toEqual(error);
  })
});
