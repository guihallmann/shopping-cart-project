const fetchProducts = async (query) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('You must provide an url', error);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
