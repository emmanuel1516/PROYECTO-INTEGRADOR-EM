import { Product, products } from './products.js';

export function renderProducts(products) {
    try{
        const productsContainer = document.querySelector('.gallery');
        if (!productsContainer) return; // Asegurarse de que el contenedor exista ya que el main lo cargamos en varios html

        productsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar productos destacados

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('card');
            productCard.setAttribute('data-id', product.id); // Agregar atributo data-id para identificar el producto

            productCard.innerHTML = `
            <img class="card__image" src="${product.image}.jpg" alt="Imagen de ${product.title}">
            <h4 class="card__title">${product.title}</h4>
            <span class="card__code">${product.id}</span>
            <p class="card__description">${product.descripcion}</p>
            <span class="card__price">$${product.price.toLocaleString()}</span>
            <div class="card__actions">
                <button class="button button--remove">Quitar del carrito</button>
                <span class="card__counter">0</span>
                <button class="button button--add">Agregar al carrito</button>
            </div>
            `;

            productsContainer.appendChild(productCard);
        });

    }catch (error) {
        console.error("Error al renderizar productos:", error);
    }
}


// featured = true
export function renderFeaturedProducts(products) {
    try{
        const productsContainer = document.querySelector('.featured-products');
        if (!productsContainer) return; // Asegurarse de que el contenedor exista ya que el main lo cargamos en varios html

        productsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar productos destacados

        products.forEach(product => {
            if (!product.featured) return; // Solo renderizar productos destacados
            const productCard = document.createElement('div');
            productCard.classList.add('card');

            productCard.innerHTML = `
            <img class="card__image" src="${product.image}.jpg" alt="Imagen de ${product.title}">
            <h4 class="card__title">${product.title}</h4>
            <span class="card__price">$${product.price.toLocaleString()}</span>
            `;

            productsContainer.appendChild(productCard);
        });
    }catch (error) {
        console.error("Error al renderizar productos destacados:", error);
    }
}