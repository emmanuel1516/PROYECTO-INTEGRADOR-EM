const cartCounts = {};

export function productCartCounter() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const id = card.getAttribute('data-id');
    const btnAdd = card.querySelector('.button--add');
    const btnRemove = card.querySelector('.button--remove');
    const counterSpan = card.querySelector('.card__counter');


    if (!btnAdd || !btnRemove || !counterSpan) return;// Si no existe el contador como en el index va a dar error, con esta línea se evita

    // Mostrar el contador guardado (o 0 si no existe)
    counterSpan.textContent = cartCounts[id] || 0;

    btnAdd.addEventListener('click', () => {
      cartCounts[id] = (cartCounts[id] || 0) + 1;
      counterSpan.textContent = cartCounts[id];
    });

    btnRemove.addEventListener('click', () => {
      if ((cartCounts[id] || 0) > 0) {
        cartCounts[id]--;
        counterSpan.textContent = cartCounts[id];
      }
    });
  });
}
