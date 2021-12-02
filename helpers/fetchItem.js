const fetchItem = async (id) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error('You must provide an url', error);
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/try...catch
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
