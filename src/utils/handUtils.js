
import _ from 'lodash';

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

// determines if a hand is a consecutive triple pairs
function isConsecTriplePairs(hand) {
  if (hand.length !== 6) return false;

  // getlist of numerals
  const numeralsList = getSortedNumerals(hand);

  // check for pairs
  if (numeralsList[0] !== numeralsList[1]) return false;
  if (numeralsList[2] !== numeralsList[3]) return false;
  if (numeralsList[4] !== numeralsList[5]) return false;

  // check for consecutive pairs
  if (numeralsList[0] + 1 !== numeralsList[2]) return false;
  if (numeralsList[2] + 1 !== numeralsList[4]) return false;

  return true;
}

// determines if a hand is a valid hand in tien len
function isValidHand(hand, isFirstHand) {
  if (!Array.isArray(hand)) throw new Error('hand must be array');

  const length = hand.length;

  if (length === 0) return false;

  // if first hand played, then hand must contain a 3S
  if (isFirstHand) {
    const foundIndex = _.findIndex(hand, c => c.name === '3S');
    if (foundIndex === -1) return false;
  }

  let isValid = true;
  if (length < 5) {
    if (!isSPTF(hand) && !isConsecutive(hand)) isValid = false;
  } else if (length === 6) {
    // could be triple pairs
    if (!isConsecutive(hand) && !isConsecTriplePairs(hand)) isValid = false;
  } else {
    isValid = isConsecutive(hand) || false;
  }

  return isValid;
}

export default { isValidHand, isSPTF, isConsecutive, isConsecTriplePairs };
