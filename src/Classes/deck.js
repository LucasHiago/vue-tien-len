
import { cloneDeep } from 'lodash';

const { CardMap } = require('../Constants/CardMap');

class Deck {
  constructor() {
    this.deck = this.generateDeck();
  }

  generateDeck() {
    // returns a random deck of Cards
    const deck = [];
    // keep map of cards added (keyed by position index)
    const cardsAdded = {};

    const clonedCardMap = cloneDeep(CardMap);
    // assign each card a random index position 0 <= index < 52
    Object.keys(clonedCardMap).forEach((cardKey) => {
      let gotUniqueIndex = false;
      while (!gotUniqueIndex) {
        // eslint-disable-next-line no-underscore-dangle
        const randomIndex = this._randomNumber(0, 52);
        if (!cardsAdded[randomIndex]) {
          gotUniqueIndex = true;
          cardsAdded[randomIndex] = clonedCardMap[cardKey];
          cardsAdded[randomIndex].cardKey = cardKey;
        }
      }
    });

    // add to deck
    Object.keys(cardsAdded).forEach((k) => {
      deck[k] = cardsAdded[k];
    });

    return deck;
  }

  // returns a random number between n1 (inclusive) and n2 (exclusive)
  // eslint-disable-next-line
  _randomNumber(n1, n2) {
    // eslint-disable-next-line
    return Math.floor(Math.random() * (n2 - n1) + n1);
  }
}

export default Deck;
