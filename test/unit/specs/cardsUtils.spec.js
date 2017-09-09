import cardsUtils from '../../../src/utils/cardsUtils';

describe('cardsUtils', () => {
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
  });
});
