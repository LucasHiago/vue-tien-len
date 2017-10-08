
import _ from 'lodash';
import handUtils from './handUtils';


// returns the number or face part of the card name
function getCardNumeral(card) {
  if (card.name.length > 2) {
    return card.name.substr(0, 2);
  }

  return card.name.substr(0, 1);
}

// return list of possible CTPs hands (of index pos) in list of cards (index pos)
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

// return list of possible CONSECUTIVE hands (of index pos) in list of cards
function getConsecutives(cards) {
  // modify cards to keep track of original index of input
  const modCards = _.map(cards, (card, index) => {
    const curCard = card;
    curCard.prevIndex = index;
    return curCard;
  });
  const sortedCards = _.sortBy(modCards, 'rank');

  // get collection of list of singles
  const singlesCardsCollection = {
    1: [],
    2: [],
    3: [],
    4: []
  };
  sortedCards.forEach((sCard) => {
    if (!_.find(singlesCardsCollection['1'], card => card.number === sCard.number)) {
      singlesCardsCollection['1'].push(sCard);
    } else if (!_.find(singlesCardsCollection['2'], card => card.number === sCard.number)) {
      singlesCardsCollection['2'].push(sCard);
    } else if (!_.find(singlesCardsCollection['3'], card => card.number === sCard.number)) {
      singlesCardsCollection['3'].push(sCard);
    } else {
      singlesCardsCollection['4'].push(sCard);
    }
  });


  // parse collection to find consecutives
  const listOfListConsecs = [];

  Object.keys(singlesCardsCollection).forEach((listKey) => {
    const curCards = singlesCardsCollection[listKey];

    // cur list should be sorted
    curCards.forEach((startCard, startIndex) => {
      const curHand = [startCard];
      curCards.forEach((card, index) => {
        if (index > startIndex) {
          curHand.push(card);

          if (handUtils.isConsecutive(curHand)) {
            const consecHand = _.cloneDeep(curHand).map(curCard => curCard.prevIndex);
            listOfListConsecs.push(consecHand);
          }
        }
      });
    });
  });

  return listOfListConsecs;
}

// return list of possible FOK hands (of index pos) in list of cards
function getFOKs(cards) {
  // modify cards to keep track of original index of input
  const modCards = _.map(cards, (card, index) => {
    const curCard = card;
    curCard.prevIndex = index;
    return curCard;
  });
  const sortedCards = _.sortBy(modCards, 'rank');

  const listOfFOKs = [];
  Object.keys(sortedCards).forEach((card, index) => {
    if (index < 10) {
      const hand = sortedCards.slice(index, index + 4);
      if (handUtils.isFourOfKind(hand)) {
        listOfFOKs.push(hand.map(c => c.prevIndex));
      }
    }
  });


  return listOfFOKs;
}

// return list of possible triples hands (of index pos) in list of cards
function getTriples(cards) {
  // modify cards to keep track of original index of input
  const modCards = _.map(cards, (card, index) => {
    const curCard = card;
    curCard.prevIndex = index;
    return curCard;
  });
  const sortedCards = _.sortBy(modCards, 'rank');

  const listOfTriples = [];
  Object.keys(sortedCards).forEach((card, index) => {
    if (index < 11) {
      // TODO: FOKs can yield combinations of triples out of order
      // i.e. 3S, 3C, 3D, 3H -> [3S, 3C, 3D], [3C, 3D, 3H], [3D, 3H, 3S]
      // shouldn't be too big of a deal since we're mostly concerned with just fetching
      // any triples right now

      const hand = sortedCards.slice(index, index + 3);
      if (handUtils.isTriple(hand)) {
        listOfTriples.push(hand.map(c => c.prevIndex));
      }
    }
  });


  return listOfTriples;
}

// return list of possible pairs hands (of index pos) in list of cards
function getPairs(cards) {
  // modify cards to keep track of original index of input
  const modCards = _.map(cards, (card, index) => {
    const curCard = card;
    curCard.prevIndex = index;
    return curCard;
  });
  const sortedCards = _.sortBy(modCards, 'rank');

  const listOfPairs = [];
  Object.keys(sortedCards).forEach((card, index) => {
    if (index < 12) {
      // TODO: Triples can yield combinations of pairs out of order
      // i.e. 3S, 3C, 3D -> [3S, 3C], [3C, 3D], [3D, 3S]
      // shouldn't be too big of a deal since we're mostly concerned with just fetching
      // any pairs right now

      const hand = sortedCards.slice(index, index + 2);
      if (handUtils.isPair(hand)) {
        listOfPairs.push(hand.map(c => c.prevIndex));
      }
    }
  });


  return listOfPairs;
}

// returns object representing all the possible hands of the list of cards
function getPossibleHands(cards) {
  // parse cards list and return object showing all possible hands
  const ctps = getCTPS(cards);
  const consecutive = getConsecutives(cards);
  const foks = getFOKs(cards);
  const triples = getTriples(cards);
  const pairs = getPairs(cards);

  return {
    CTPS: ctps,
    CONSECUTIVE: consecutive,
    FOKS: foks,
    TRIPLES: triples,
    PAIRS: pairs
  };
}

// returns a hand from a list of cards that is next highest than active hand
// strategy -> the defensive function for when AI is not starting the round...
// ... we want to play the next higher hand that can beat the active hand
function getHigherHand(gameActiveHand, playerCards) {
  const cards = _.cloneDeep(playerCards);
  const activeHand = _.cloneDeep(gameActiveHand);
  // console.log('getHigherHand()');
  // console.log('activeHand:');
  // console.log(activeHand);
  // console.log('cards:');
  // console.log(cards);
  let higherHand = [];

  if (activeHand.length === 0 || cards.length === 0) {
    throw new Error('activeHand and cards must be non-zero length');
  }

  // get list of hands that are same type as active
  if (activeHand.length > 1 || activeHand[0].number === 2) {
    const posHandsTypes = getPossibleHands(cards);
    /* posHandsTypes obj
      {
        CTPS: [[...]],
        CONSECUTIVE: [[...]],
        FOKS: [[...]],
        TRIPLES: [[...]],
        PAIRS: [[...]]
      }
    */

    const posHands = [];
    Object.keys(posHandsTypes).forEach((handType) => {
      // iterate each hand type
      const typePosHands = posHandsTypes[handType];

      // strategy -> we want to play lowest ranked hand of the same type
      //    i.e. [[0,3,5],[1,2,4]] --> we want to play [0,3,5]
      let gotPosHand = false;
      typePosHands.forEach((posHand) => {
        // convert list of list of orig pos index to collection of cards
        const realPosHand = posHand.map(cardIndex => cards[cardIndex]);
        if (!gotPosHand && handUtils.canBeatHand(realPosHand, activeHand)) {
          posHands.push(posHand);
          gotPosHand = true;
        }
      });
    });

    // strategy ->
    // - we want to get rid of as many cards as possible, so in a situation between CTPS or FOKS to beat a 2,
    //      we want to play the CTPS because it has the most number of cards
    higherHand = posHands.length > 0 ? _.max(posHands) : posHands;
  }

  if (activeHand.length === 1 && higherHand.length === 0) {
    // modify cards to keep track of original index of input
    const modCards = _.map(cards, (card, index) => {
      const curCard = card;
      curCard.prevIndex = index;
      return curCard;
    });

    const sortedCards = _.sortBy(modCards, 'rank');

    const foundHigher = _.find(sortedCards, card => card.rank > activeHand[0].rank);
    higherHand = foundHigher ? [foundHigher.prevIndex] : higherHand;
  }

  // console.log('return higherHand:');
  // console.log(higherHand);

  return higherHand;
}

// returns a hand from a list of cards that is 'lowest' but highest number of cards
function getLowestHand(playerCards) {
  const cards = _.cloneDeep(playerCards);
  if (cards.length === 0) {
    return [];
  }

  const posHandsTypes = getPossibleHands(cards);

  /* posHandsTypes obj
    {
      CTPS: [[...]],
      CONSECUTIVE: [[...]],
      FOKS: [[...]],
      TRIPLES: [[...]],
      PAIRS: [[...]]
    }
  */

  // we want the lowest hand but also get rid of the most amount of cards
  let lowestHand = null;
  Object.keys(posHandsTypes).forEach((handType) => {
    // iterate each hand type
    const typePosHands = posHandsTypes[handType];

    typePosHands.forEach((posHand) => {
      if (lowestHand === null) {
        lowestHand = posHand;
      } else if (posHand.length > lowestHand.length) {
        lowestHand = posHand;
      }
    });
  });

  // TDO: strategy -> should AI play singles when there is a non-single
  // lowestHand

  // if lowestHand is still null or empty, then we only have singles left
  if (lowestHand === null || lowestHand.length === 0) {
    // modify cards to keep track of original index of input
    const modCards = _.map(cards, (card, index) => {
      const curCard = card;
      curCard.prevIndex = index;
      return curCard;
    });

    const sortedCards = _.sortBy(modCards, 'rank');
    lowestHand = [sortedCards[0].prevIndex];
  }

  return lowestHand;
}

export default {
  getCardNumeral,
  getCTPS,
  getConsecutives,
  getFOKs,
  getTriples,
  getPairs,
  getPossibleHands,
  getHigherHand,
  getLowestHand
};
