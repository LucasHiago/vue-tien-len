const _ = require('lodash');

// returns list of sorted numerals with face swapped
function getSortedNumerals(hand) {
  const faceMap = {
    J: 11,
    Q: 12,
    K: 13,
    A: 14
  };

  // sort hand by rank in case its not sorted
  const sortedHand = _.sortBy(hand, 'rank');
  // getlist of numerals
  const numeralsList = _.map(sortedHand, (c) => {
    const cardName = c.name;
    let num = null;
    if (cardName.length > 2) {
      num = cardName[0] + cardName[1];
      return parseInt(num, 10);
    }

    num = cardName[0];
    num = faceMap[num] || num;
    return parseInt(num, 10);
  });

  return numeralsList;
}

// determines if a hand has all the same cards
function isSPTF(hand) {
  let isValidSPTF = true;

  // check every card for first instance of diff numeral
  let numerals = null;
  Object.keys(hand).forEach((c) => {
    const cardName = hand[c].name;
    if (!numerals) {
      numerals = cardName[0];
    }

    if (numerals !== cardName[0]) {
      isValidSPTF = false;
    }
  });

  return isValidSPTF;
}

// determines if a hand is a valid consecutive hand
function isConsecutive(hand) {
  if (isSPTF(hand)) return false;
  if (hand.length < 3) return false;

  // check if there is a 2
  if (_.findIndex(hand, c => c.rank > 48) > -1) return false;

  const numeralsList = getSortedNumerals(hand);
  let isConsec = true;
  Object.keys(numeralsList).forEach((n) => {
    const num = numeralsList[n];
    if (numeralsList[parseInt(n, 10) + 1]) {
      if (numeralsList[parseInt(n, 10) + 1] !== num + 1) isConsec = false;
    }
  });

  return isConsec;
}

// return list of possible CONSECUTIVE hands in list of cards (index pos)
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

          if (isConsecutive(curHand)) {
            const consecHand = _.cloneDeep(curHand).map(curCard => curCard.prevIndex);
            listOfListConsecs.push(consecHand);
          }
        }
      });
    });
  });

  return listOfListConsecs;
}

const cards = [
  {
    name: '4S',
    rank: 5,
    number: 4,
    isSelected: false
  },
  {
    name: '8D',
    rank: 23,
    number: 8,
    isSelected: false
  },
  {
    name: '10S',
    rank: 29,
    number: 10,
    isSelected: false
  },
  {
    name: 'QD',
    rank: 39,
    number: 12,
    isSelected: false
  },
  {
    name: 'AS',
    rank: 45,
    number: 14,
    isSelected: false
  },
  {
    name: '2D',
    rank: 51,
    number: 2,
    isSelected: false
  },
  {
    name: '2H',
    rank: 52,
    number: 2,
    isSelected: false
  },
  {
    name: 'KH',
    rank: 44,
    number: 13,
    isSelected: false
  },
  {
    name: '9S',
    rank: 25,
    number: 9,
    isSelected: false
  },
  {
    name: '5D',
    rank: 11,
    number: 5,
    isSelected: false
  },
  {
    name: '3D',
    rank: 3,
    number: 3,
    isSelected: false
  },
  {
    name: '7H',
    rank: 20,
    number: 7,
    isSelected: false
  },
  {
    name: '6H',
    rank: 16,
    number: 6,
    isSelected: false
  }
];

const actualListOfHands = getConsecutives(cards);

const expectedListOfHands = [
  [10, 0, 9], // 0
  [10, 0, 9, 12], // 1
  [10, 0, 9, 12, 11], // 2
  [10, 0, 9, 12, 11, 1], // 3
  [10, 0, 9, 12, 11, 1, 8], // 4
  [10, 0, 9, 12, 11, 1, 8, 2], // 5
  [0, 9, 12], // 6
  [0, 9, 12, 11], // 7
  [0, 9, 12, 11, 1], // 8
  [0, 9, 12, 11, 1, 8], // 9
  [0, 9, 12, 11, 1, 8, 2], // 10
  [9, 12, 11], // 11
  [9, 12, 11, 1], // 12
  [9, 12, 11, 1, 8], // 13
  [9, 12, 11, 1, 8, 2], // 14
  [12, 11, 1], // 15
  [12, 11, 1, 8], // 16
  [12, 11, 1, 8, 2], // 17
  [11, 1, 8], // 18,
  [11, 1, 8, 2], // 19
  [1, 8, 2], // 20
  [3, 7, 4] // 21
];

