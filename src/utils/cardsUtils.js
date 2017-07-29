
import _ from 'lodash';
import handUtils from './handUtils';

// returns object representing all the possible hands of the list of cards
// function getPossibleHands(cards) {


// }


// returns the number/face part of the card name
function getCardNumeral(card) {
  if (card.name.length > 2) {
    return card.name.substr(0, 2);
  }

  return card.name.substr(0, 1);
}

// return list of possible CTPs hands in specific cards (index pos)
function getCTPS(cards) {
  // modify cards to keep track of original index of input
  const modCards = _.map(cards, (card, index) => {
    const curCard = card;
    curCard.prevIndex = index;
    return curCard;
  });

  const sortedCards = _.sortBy(modCards, 'rank');

  // list of list of cards to return
  const ctps = [];

  // sanitize cards for FOK
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < sortedCards.length; i++) {
    const possibleFOK = sortedCards[i + 3] ? sortedCards.slice(i, i + 4) : null;

    // check if FOK
    if (possibleFOK && possibleFOK.length === 4 && handUtils.isFourOfKind(possibleFOK)) {
      // check if tail and head end of FOK are also FOK
      const tail = sortedCards[i - 4] ? sortedCards.slice(i - 4, i) : null;
      const head = sortedCards[i + 4] ? sortedCards.slice(i + 1, i + 5) : null;
      if (head && tail && handUtils.isFourOfKind(head) && handUtils.isFourOfKind(tail)) {
        // both head and tail are FOK, so return two sets of FOK
        const set1 = [sortedCards[0], sortedCards[1], sortedCards[4], sortedCards[5], sortedCards[8], sortedCards[10]];
        ctps.push(set1);
        const set2 = [sortedCards[2], sortedCards[3], sortedCards[6], sortedCards[7], sortedCards[9], sortedCards[11]];
        ctps.push(set2);
        return ctps;
      }

      // remove two lower pairs from FOK
      sortedCards.splice(i, 2);
    }
  }

  // sanitize cards for triples
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < sortedCards.length; i++) {
    const possibleTriples = sortedCards[i + 2] ? sortedCards.slice(i, i + 3) : null;

    // check if triples
    if (possibleTriples && possibleTriples.length === 3 && handUtils.isSPTF(possibleTriples)) {
      // remove lowest ranked card within triple set
      sortedCards.splice(i, 1);
    }
  }

  // eslint-disable-next-line no-plusplus
  for (let c = 0; c < sortedCards.length; c++) {
    if (c <= (sortedCards.length / 2) - 1) {
      // grab 6 cards and check if CPTS
      const curHand = sortedCards.slice(c, c + 6);
      if (handUtils.isConsecTriplePairs(curHand)) {
        // found hand that is ctp, so grab prevIndex's from curHand cards
        const curCTPindexes = [];
        curHand.forEach((card) => {
          curCTPindexes.push(card.prevIndex);
        });
        ctps.push(curCTPindexes);
      }
    }
  }

  return ctps;
}

module.exports = { getCardNumeral, getCTPS };
