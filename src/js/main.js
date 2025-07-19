import { products } from './modules/products.js';
import { renderProducts, renderFeaturedProducts } from './modules/renderProducts.js';
import { initSearch } from './modules/search.js';
import { productCartCounter } from './modules/cartProductsCounter.js';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  renderFeaturedProducts(products);
  initSearch();
  productCartCounter();
});