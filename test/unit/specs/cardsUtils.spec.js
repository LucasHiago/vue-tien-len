import cardsUtils from '../../../src/utils/cardsUtils';

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
    it('should bring back one CTPs hand for all 13 cards set', () => {
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
    it('should bring back two CTPs hand for all 13 cards set', () => {
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
});
