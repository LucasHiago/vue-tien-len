import cardsUtils from '../../../src/utils/cardsUtils';
import { getMappedCards } from '../../utils/getMappedCards';

describe.only('cardsUtils', () => {
  describe('getCardNumeral()', () => {
    it('should return number/face that is not 10', () => {
      const card = {
        name: '3C',
        rank: 2,
        isSelected: false
      };


      expect(cardsUtils.getCardNumeral(card)).to.be.eq('3');
    });
    it('should return number that is 10', () => {
      const card = {
        name: '10C',
        rank: 2,
        isSelected: false
      };


      expect(cardsUtils.getCardNumeral(card)).to.be.eq('10');
    });
  });
  describe('getCTPS()', () => {
    it('should return back one CTPs hand for all 13 cards set', () => {
      const cards = [
        {
          name: '6S',
          rank: 13,
          isSelected: false
        },
        {
          name: '6D',
          rank: 15,
          isSelected: false
        },
        // should be removed
        {
          name: '7S',
          rank: 17,
          isSelected: false
        },
        {
          name: '7D',
          rank: 19,
          isSelected: false
        },
        {
          name: '8S',
          rank: 21,
          isSelected: false
        },
        {
          name: '8D',
          rank: 23,
          isSelected: false
        },
        {
          name: '7H',
          rank: 20,
          isSelected: false
        },
        {
          name: 'JH',
          rank: 36,
          isSelected: false
        },
        {
          name: '3S',
          rank: 1,
          isSelected: false
        },
        {
          name: 'QD',
          rank: 39,
          isSelected: false
        },
        {
          name: 'AD',
          rank: 47,
          isSelected: false
        },
        {
          name: '9H',
          rank: 28,
          isSelected: false
        },
        {
          name: '2H',
          rank: 52,
          isSelected: false
        }
      ];

      const expectedListOfHands = [[0, 1, 3, 6, 4, 5]];
      const actualListOfHands = cardsUtils.getCTPS(cards);
      expect(actualListOfHands).to.be.deep.eq(expectedListOfHands);
    });
    it('should return back two CTPs hand for all 13 cards set', () => {
      const cards = [
        {
          name: '6S',
          rank: 13,
          isSelected: false
        },
        {
          name: '6D',
          rank: 15,
          isSelected: false
        },
        {
          name: '7S',
          rank: 17,
          isSelected: false
        },
        {
          name: '7D',
          rank: 19,
          isSelected: false
        },
        {
          name: '8S',
          rank: 21,
          isSelected: false
        },
        {
          name: '8D',
          rank: 23,
          isSelected: false
        },
        {
          name: '5S',
          rank: 9,
          isSelected: false
        },
        {
          name: '5D',
          rank: 11,
          isSelected: false
        },
        {
          name: '3S',
          rank: 1,
          isSelected: false
        },
        {
          name: 'QD',
          rank: 39,
          isSelected: false
        },
        {
          name: 'AD',
          rank: 47,
          isSelected: false
        },
        {
          name: '9H',
          rank: 28,
          isSelected: false
        },
        {
          name: '2H',
          rank: 52,
          isSelected: false
        }
      ];

      const expectedListOfHands = [[6, 7, 0, 1, 2, 3], [0, 1, 2, 3, 4, 5]];
      const actualListOfHands = cardsUtils.getCTPS(cards);
      expect(actualListOfHands).to.be.deep.eq(expectedListOfHands);
    });
  });
  describe('getConsecutives()', () => {
    it('should return consecutives for non-pairs, no overlaps', () => {
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

      const actualListOfHands = cardsUtils.getConsecutives(cards);
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

      expect(actualListOfHands).to.be.deep.eq(expectedListOfHands);
    });
    it('should return consecutives for pairs', () => {
      const cards = [
        {
          name: '9H',
          rank: 28,
          number: 9,
          isSelected: false
        },
        {
          name: 'KD',
          rank: 43,
          number: 13,
          isSelected: false
        },
        {
          name: 'QH',
          rank: 40,
          number: 12,
          isSelected: false
        },
        {
          name: '3D',
          rank: 3,
          number: 3,
          isSelected: false
        },
        {
          name: '8S',
          rank: 21,
          number: 8,
          isSelected: false
        },
        {
          name: '9C',
          rank: 26,
          number: 9,
          isSelected: false
        },
        {
          name: 'QD',
          rank: 39,
          number: 12,
          isSelected: false
        },
        {
          name: 'QS',
          rank: 37,
          number: 12,
          isSelected: false
        },
        {
          name: 'AH',
          rank: 48,
          number: 14,
          isSelected: false
        },
        {
          name: '3H',
          rank: 4,
          number: 3,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          number: 4,
          isSelected: false
        },
        {
          name: '3S',
          rank: 1,
          number: 3,
          isSelected: false
        },
        {
          name: 'AD',
          rank: 47,
          number: 14,
          isSelected: false
        }
      ];

      const actualListOfHands = cardsUtils.getConsecutives(cards);
      const expectedListOfHands = [
        [7, 1, 12],
      ];

      expect(actualListOfHands).to.be.deep.eq(expectedListOfHands);
    });
  });
  describe('getFOKs()', () => {
    it('should return FOKs', () => {
      const cards = [
        {
          name: '10C',
          rank: 30,
          number: 10,
          isSelected: false
        },
        {
          name: 'AS',
          rank: 45,
          number: 14,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
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
          name: '9C',
          rank: 26,
          number: 9,
          isSelected: false
        },
        {
          name: '4C',
          rank: 6,
          number: 4,
          isSelected: false
        },
        {
          name: '10H',
          rank: 32,
          number: 10,
          isSelected: false
        },
        {
          name: 'AD',
          rank: 47,
          number: 14,
          isSelected: false
        },
        {
          name: 'AH',
          rank: 48,
          number: 14,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          number: 4,
          isSelected: false
        },
        {
          name: '10D',
          rank: 31,
          number: 10,
          isSelected: false
        },
        {
          name: '4S',
          rank: 5,
          number: 4,
          isSelected: false
        }
      ];

      const actualListOfHands = cardsUtils.getFOKs(cards);
      const expectedListOfHands = [
        [12, 6, 10, 2],
        [4, 0, 11, 7],
      ];

      expect(actualListOfHands).to.be.deep.eq(expectedListOfHands);
    });
  });
  describe('getTriples()', () => {
    it('should return triples', () => {
      const cards = [
        {
          name: '10C',
          rank: 30,
          number: 10,
          isSelected: false
        },
        {
          name: 'AS',
          rank: 45,
          number: 14,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
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
          name: '9C',
          rank: 26,
          number: 9,
          isSelected: false
        },
        {
          name: '4C',
          rank: 6,
          number: 4,
          isSelected: false
        },
        {
          name: '10H',
          rank: 32,
          number: 10,
          isSelected: false
        },
        {
          name: 'AD',
          rank: 47,
          number: 14,
          isSelected: false
        },
        {
          name: 'AH',
          rank: 48,
          number: 14,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          number: 4,
          isSelected: false
        },
        {
          name: '10D',
          rank: 31,
          number: 10,
          isSelected: false
        },
        {
          name: '4S',
          rank: 5,
          number: 4,
          isSelected: false
        }
      ];

      const actualListOfHands = cardsUtils.getTriples(cards);
      const expectedListOfHands = [
        [12, 6, 10],
        [6, 10, 2],
        [4, 0, 11],
        [0, 11, 7],
        [1, 8, 9]
      ];

      expect(actualListOfHands).to.be.deep.eq(expectedListOfHands);
    });
  });
  describe('getPairs()', () => {
    it('should return pairs', () => {
      const cards = [
        {
          name: '10C',
          rank: 30,
          number: 10,
          isSelected: false
        },
        {
          name: 'AS',
          rank: 45,
          number: 14,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
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
          name: '9C',
          rank: 26,
          number: 9,
          isSelected: false
        },
        {
          name: '4C',
          rank: 6,
          number: 4,
          isSelected: false
        },
        {
          name: '10H',
          rank: 32,
          number: 10,
          isSelected: false
        },
        {
          name: 'AD',
          rank: 47,
          number: 14,
          isSelected: false
        },
        {
          name: 'AH',
          rank: 48,
          number: 14,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          number: 4,
          isSelected: false
        },
        {
          name: '10D',
          rank: 31,
          number: 10,
          isSelected: false
        },
        {
          name: '4S',
          rank: 5,
          number: 4,
          isSelected: false
        }
      ];

      const actualListOfHands = cardsUtils.getPairs(cards);
      const expectedListOfHands = [
        [12, 6],
        [6, 10],
        [10, 2],
        [4, 0],
        [0, 11],
        [11, 7],
        [1, 8],
        [8, 9]
      ];

      expect(actualListOfHands).to.be.deep.eq(expectedListOfHands);
    });
  });
  describe('getPossibleHands()', () => {
    it('should return correct possible hands with all possible hands', () => {
      const cards = [
        {
          name: '10S',
          rank: 29,
          number: 10
        },
        {
          name: '10H',
          rank: 32,
          number: 10,
          isSelected: false
        },
        {
          name: '2D',
          rank: 51,
          number: 2,
          isSelected: false
        },
        {
          name: 'JS',
          rank: 33,
          number: 11,
          isSelected: false
        },
        {//
          name: '7S',
          rank: 17,
          number: 7,
          isSelected: false
        },
        {
          name: '8C',
          rank: 22,
          number: 8,
          isSelected: false
        },
        {
          name: '10D',
          rank: 31,
          number: 10,
          isSelected: false
        },
        {
          name: '7C',
          rank: 18,
          number: 7,
          isSelected: false
        },
        {
          name: '6S',
          rank: 13,
          number: 6,
          isSelected: false
        },
        {
          name: 'QS',
          rank: 37,
          number: 12,
          isSelected: false
        },
        {
          name: '6C',
          rank: 14,
          number: 6,
          isSelected: false
        },
        {
          name: '8S',
          rank: 21,
          number: 8,
          isSelected: false
        },
        {
          name: '10C',
          rank: 30,
          number: 10,
          isSelected: false
        }
      ];

      const expectedPossibleHands = {
        CTPS: [[8, 10, 4, 7, 11, 5]],
        CONSECUTIVE: [[8, 4, 11], [0, 3, 9], [10, 7, 5]],
        FOKS: [[0, 12, 6, 1]],
        TRIPLES: [[0, 12, 6], [12, 6, 1]],
        PAIRS: [[8, 10], [4, 7], [11, 5], [0, 12], [12, 6], [6, 1]]
      };


      const actualListOfHands = cardsUtils.getPossibleHands(cards);
      expect(actualListOfHands.CTPS).to.be.deep.eq(expectedPossibleHands.CTPS);
      expect(actualListOfHands.CONSECUTIVE).to.be.deep.eq(expectedPossibleHands.CONSECUTIVE);
      expect(actualListOfHands.FOKS).to.be.deep.eq(expectedPossibleHands.FOKS);
      expect(actualListOfHands.TRIPLES).to.be.deep.eq(expectedPossibleHands.TRIPLES);
      expect(actualListOfHands.PAIRS).to.be.deep.eq(expectedPossibleHands.PAIRS);
    });
    it('should return correct possible hands with all possible hands with no CTPS nor FOKS', () => {
      const cards = [
        {
          name: 'QS',
          rank: 37,
          number: 12
        },
        {
          name: 'KD',
          rank: 43,
          number: 13,
          isSelected: false
        },
        {
          name: 'AH',
          rank: 48,
          number: 14,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          number: 4,
          isSelected: false
        },
        {//
          name: '4D',
          rank: 7,
          number: 4,
          isSelected: false
        },
        {
          name: '6D',
          rank: 15,
          number: 6,
          isSelected: false
        },
        {
          name: '5C',
          rank: 10,
          number: 5,
          isSelected: false
        },
        {
          name: '3S',
          rank: 1,
          number: 3,
          isSelected: false
        },
        {
          name: '10S',
          rank: 29,
          number: 10,
          isSelected: false
        },
        {
          name: '10C',
          rank: 30,
          number: 10,
          isSelected: false
        },
        {
          name: 'QH',
          rank: 40,
          number: 12,
          isSelected: false
        },
        {
          name: 'QC',
          rank: 38,
          number: 12,
          isSelected: false
        },
        {
          name: 'JS',
          rank: 33,
          number: 11,
          isSelected: false
        }
      ];

      const expectedPossibleHands = {
        CTPS: [],
        CONSECUTIVE: [[7, 4, 6], [7, 4, 6, 5], [4, 6, 5], [8, 12, 0], [8, 12, 0, 1], [8, 12, 0, 1, 2], [12, 0, 1], [12, 0, 1, 2], [0, 1, 2]],
        FOKS: [],
        TRIPLES: [[0, 11, 10]],
        PAIRS: [[4, 3], [8, 9], [0, 11], [11, 10]]
      };


      const actualListOfHands = cardsUtils.getPossibleHands(cards);
      expect(actualListOfHands.CTPS).to.be.deep.eq(expectedPossibleHands.CTPS);
      expect(actualListOfHands.CONSECUTIVE).to.be.deep.eq(expectedPossibleHands.CONSECUTIVE);
      expect(actualListOfHands.FOKS).to.be.deep.eq(expectedPossibleHands.FOKS);
      expect(actualListOfHands.TRIPLES).to.be.deep.eq(expectedPossibleHands.TRIPLES);
      expect(actualListOfHands.PAIRS).to.be.deep.eq(expectedPossibleHands.PAIRS);
    });
  });
  describe('getMappedCards()', () => {
    it('should get the mapped cards in order', () => {
      const cardNames = ['QS', 'KD', 'AH', '4H'];

      const expectedCards = [
        {
          name: 'QS',
          rank: 37,
          isSelected: false,
          number: 12,
          suit: 'S'
        },
        {
          name: 'KD',
          rank: 43,
          isSelected: false,
          number: 13,
          suit: 'D'
        },
        {
          name: 'AH',
          rank: 48,
          isSelected: false,
          number: 14,
          suit: 'H'
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false,
          number: 4,
          suit: 'H'
        }
      ];

      const cards = getMappedCards(cardNames);

      expect(cards).to.deep.equal(expectedCards);
    });
  });
  describe('getHigherHand()', () => {
    it('should return a higher hand for a single active card', () => {
      const activeHandName = ['4S'];
      const cardsName = ['QS', 'KD', 'AH', '4H', '4D', '6D', '5C', '3S', '10S', '10C', 'QH', 'QC', 'JS'];

      const activeHand = getMappedCards(activeHandName);
      const cards = getMappedCards(cardsName);

      const higherHand = cardsUtils.getHigherHand(activeHand, cards);

      expect(higherHand).to.be.deep.equal([4]);
    });
    it('should return a CTPS hand for a single active card that is a 2', () => {
      const activeHandName = ['2S'];
      const cardsName = ['6S', '6D', '7H', '7D', '8D', '8C', '3C', '3S', '10S', '10C', 'QH', 'QC', '2D'];

      const activeHand = getMappedCards(activeHandName);
      const cards = getMappedCards(cardsName);

      const higherHand = cardsUtils.getHigherHand(activeHand, cards);

      expect(higherHand).to.be.deep.equal([0, 1, 3, 2, 5, 4]);
    });
    it('should return a higher consecutive hand', () => {
      const activeHandName = ['4S', '5D', '6D'];
      const cardsName = ['6S', '6D', '7H', '7D', '8D', '8C', '3C', '3S', '10S', '10C', 'QH', 'QC', '2D'];

      const activeHand = getMappedCards(activeHandName);
      const cards = getMappedCards(cardsName);

      const higherHand = cardsUtils.getHigherHand(activeHand, cards);

      expect(higherHand).to.be.deep.equal([0, 3, 5]);
    });
    it('should return a higher pair hand', () => {
      const activeHandName = ['4S', '4D'];
      const cardsName = ['7H', '7D', '8D', '8C', '3C', '4C', '4H', '3S', '10S', '10C', 'QH', 'QC', '2D'];

      const activeHand = getMappedCards(activeHandName);
      const cards = getMappedCards(cardsName);

      const higherHand = cardsUtils.getHigherHand(activeHand, cards);

      expect(higherHand).to.be.deep.equal([5, 6]);
    });
    it('should return a higher triple hand', () => {
      const activeHandName = ['4S', '4D', '4H'];
      const cardsName = ['7H', '7D', '8D', '8C', '3C', '4C', '3S', '10S', '10C', '10H', 'QC', '2D'];

      const activeHand = getMappedCards(activeHandName);
      const cards = getMappedCards(cardsName);

      const higherHand = cardsUtils.getHigherHand(activeHand, cards);

      expect(higherHand).to.be.deep.equal([7, 8, 9]);
    });
    it('should return nothing if AI does not have a higher hand', () => {
      const activeHandName = ['4S', '4D'];
      const cardsName = ['7D', '8D', '3C', '4C', '3S', '10S', 'QC', '2D'];

      const activeHand = getMappedCards(activeHandName);
      const cards = getMappedCards(cardsName);

      const higherHand = cardsUtils.getHigherHand(activeHand, cards);
      expect(higherHand).to.be.deep.equal([]);
    });
  });
  describe.only('getLowestHand()', () => {
    it('should return the lowest hand with most amount of cards', () => {
      const cardsName = ['QS', 'KH', 'AH', '4H', '4D', '6D', '5C', '3S', '10S', '10D', 'QH', 'QC', 'JS'];
      const cards = getMappedCards(cardsName);

      const lowestHand = cardsUtils.getLowestHand(cards);

      expect(lowestHand).to.be.deep.equal([8, 12, 0, 1, 2]);
    });
    it('should return lowest single for single-only cards', () => {

      const cardsName = ['6D', '8D', '3C', '10S', '2D'];

      const cards = getMappedCards(cardsName);

      const lowestHand = cardsUtils.getLowestHand(cards);

      expect(lowestHand).to.be.deep.equal([2]);
    });
  });
});
