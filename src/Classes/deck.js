
const Constants = require('./constants');
const _ = require('lodash');

class Deck {
  constructor() {
    this.deck = this.generateDeck();
  };

  generateDeck() {
    // returns a random deck of Cards
    let deck = [];
    const CardMap = Constants.CardMap;
    // keep map of cards added (keyed by position index)
    let cardsAdded = {};
    // assign each card a random index position 0 <= index < 52
    for (let c in CardMap) {
      let gotUniqueIndex = false;
      while (!gotUniqueIndex) {
        const randomIndex = this._randomNumber(0, 52);
        if (!cardsAdded[randomIndex]) {
          gotUniqueIndex = true;
          cardsAdded[randomIndex] = CardMap[c];
        }
      }
    }

    // add to deck
    for (let k in cardsAdded) {
      deck[k] = cardsAdded[k];
    }

    return deck;
  }

  // returns a random number between n1 (inclusive) and n2 (exclusive)
  _randomNumber(n1, n2) {
    return Math.floor(Math.random() * (n2 - n1) + n1);
  }
}