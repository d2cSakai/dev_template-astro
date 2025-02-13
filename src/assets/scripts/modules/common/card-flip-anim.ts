export class CardFlipAnim {
  constructor() {
    this.init();
  }

  init() {
    const cards = document.querySelectorAll('[data-card-front]');
    cards.forEach((card) => {
      if (!card) return;
      card.addEventListener('click', () => {
        if (card.getAttribute('data-card-front') === 'true') {
          card.setAttribute('data-card-front', 'false');
        } else {
          card.setAttribute('data-card-front', 'true');
        }
      });
    });
  }
}
