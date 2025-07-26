// search.js
import { products } from './products.js';
import { renderProducts } from './renderProducts.js';
import { productCartCounter } from './cartProductsCounter.js';

export function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  if (!searchInput || !searchButton) {
    return;
  }

  // Buscar en tiempo real al escribir
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        renderProducts(products); // Si está vacío, sse van a mostrar todos los productos
        productCartCounter();
      return;
    }

    const filteredProducts = products.filter(product => {
      const titleMatch = product.title.toLowerCase().includes(query);
      const idMatch = product.id.toString() === query;
      return titleMatch || idMatch;
    });

    renderProducts(filteredProducts);
    productCartCounter();
  });

  // Búsqueda exacta al apretar el botón solo para el codigo del producto
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        renderProducts(products);
        productCartCounter();
        return;
    }

    // Si es un número, buscar por código exacto
    if (/^\d+$/.test(query)) {
        // Es un número entero
        const filtered = products.filter(product => product.id.toString() === query);
        renderProducts(filtered);
        productCartCounter();
    } else {
        // No es número, buscar por título que contenga el texto
        const filtered = products.filter(product => product.title.toLowerCase().includes(query));
        renderProducts(filtered);
        productCartCounter();
    }
  });


  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita que se envíe un formulario o cualquier otro comportamiento por defecto
      searchButton.click();    // Simula un click en el botón Buscar para reutilizar la lógica que ya tenés
    }
  });


}
