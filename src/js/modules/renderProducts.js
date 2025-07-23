import { Product, products } from './products.js';

export function renderProducts(products) {
    try{
        const productsContainer = document.querySelector('.gallery');
        if (!productsContainer) return; // Asegurarse de que el contenedor exista ya que el main lo cargamos en varios html

        productsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar productos destacados

        products.forEach(product => {
            const card = renderProduct(product);
            console.log(product)
            productsContainer.appendChild(card);
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
            const card = renderFeaturedProduct(product);
            console.log(product)
            productsContainer.appendChild(card);
        });
    }catch (error) {
        console.error("Error al renderizar productos destacados:", error);
    }
}


function renderProduct(product) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', product.id); // Agregar atributo data-id para identificar el producto

    const img = document.createElement('img');
    img.src = `${product.image}.jpg`;
    img.alt = `Imagen de ${product.title}`;
    img.classList.add('card__image');

    const title = document.createElement('h4');
    title.textContent = product.title;
    title.classList.add('card__title');

    const code = document.createElement('span');
    code.textContent = product.id;
    code.classList.add('card__code');

    const description = document.createElement('p');
    description.textContent = product.descripcion;
    description.classList.add('card__description');

    const seeMoreButton = document.createElement('button');
    seeMoreButton.textContent= 'Ver más';
    seeMoreButton.classList.add('button--see-more');

    const price = document.createElement('span');
    price.textContent = `$${product.price.toLocaleString()}`;
    price.classList.add('card__price');


    const removeButton = document.createElement('button');
    removeButton.textContent = 'Quitar del carrito';
    removeButton.classList.add('button', 'button--remove');

    const addButton = document.createElement('button');
    addButton.textContent = 'Agregar del carrito';
    addButton.classList.add('button', 'button--add');

    const counter = document.createElement("span");
    counter.textContent = "0";
    counter.classList.add("card__counter");

    const actions = document.createElement('div');
    actions.classList.add('card__actions');
    actions.appendChild(removeButton);
    actions.appendChild(counter);
    actions.appendChild(addButton);

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(code);
    card.appendChild(description);
    card.appendChild(seeMoreButton);
    card.appendChild(price);
    card.appendChild(actions);

    return card;
}


function renderFeaturedProduct(product) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', product.id); // Agregar atributo data-id para identificar el producto

    const img = document.createElement('img');
    img.src = `${product.image}.jpg`;
    img.alt = `Imagen de ${product.title}`;
    img.classList.add('card__image');

    const title = document.createElement('h4');
    title.textContent = product.title;
    title.classList.add('card__title');

    const code = document.createElement('span');
    code.textContent = product.id;
    code.classList.add('card__code');

    const description = document.createElement('p');
    description.textContent = product.descripcion;
    description.classList.add('card__description');

    const price = document.createElement('span');
    price.textContent = `$${product.price.toLocaleString()}`;
    price.classList.add('card__price');

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(code);
    card.appendChild(description);
    card.appendChild(price);

    return card;
}