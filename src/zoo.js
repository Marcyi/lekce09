const API_BASE = 'http://localhost:3000/';

export default class Zoo {

  constructor() {

  }


  // načte zvířata z API a zavolá funkci ShowAnimals pro jejich zobrazení
  getAnimals() {
    fetch(API_BASE + 'zvirata')
      .then(response => response.json())
      .then(data => {
        this.showAnimals(data);
      });
  }


  // vezme pole zvířat vrácené z API a předané do funkce jako parametr
  // a vygeneruje pro každé zvíře HTML kód, který se akonec vypíše do stránky
  showAnimals(data) {
    let zvirata = document.querySelector('#zvirata');

    let html = '';

    // vygenerujeme HTML pro každé zvíře v seznamu a přidáme ho do proměnné
    data.forEach(zvire => {
      html += `
        <div class="zvire" data-id="${zvire.id}">
          <div class="zvire__foto">
            <img src="images/${zvire.foto}" alt="${zvire.nazev}">
          </div>
          <div class="zvire__popis">
            <div class="zvire__nazev">${zvire.nazev}</div>
            <div class="zvire__latinsky">${zvire.nazevLatinsky}</div>
          </div>
        </div>
      `;
    });

    // vygenerované HTML zapíšeme do stránky
    zvirata.innerHTML = html;

    // pridame reakci na kliknuti na všechna vytvořená zvířata
    let tlacitka = document.querySelectorAll('.zvire');

    tlacitka.forEach(tlacitko => {
      tlacitko.addEventListener('click', (e) => {
        this.animalClick(e);
      });
    });

  }


  // zavolá se při kliknutí na zvíře
  animalClick(e) {
    let id = e.target.dataset.id;
    this.getAnimal(id);
  }


  // načte z API konkrétní zvíře podle předaného ID
  getAnimal(id) {
   fetch(API_BASE + 'zvirata/' + id)
    .then(response => response.json())
    .then(data => {
      this.showAnimal(data);
    });
  }


  // funkce vezme data konkrétního zvířete získaná z API
  // a předaná do funkce jako parametr a zobrazí je do stránky
  showAnimal(data) {
    console.log(data);
  }


}
