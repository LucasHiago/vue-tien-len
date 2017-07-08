import handUtils from '../../../src/utils/handUtils';

describe('handUtils', () => {
  describe('isSPTF()', () => {
    it('should return true for singles', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        }
      ];

      expect(handUtils.isSPTF(hand)).to.be.eq(true);
    });
    it('should return true for pairs', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isSPTF(hand)).to.be.eq(true);
    });
    it('should return true for triples', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          isSelected: false
        }
      ];

      expect(handUtils.isSPTF(hand)).to.be.eq(true);
    });
    it('should return true for four of a kind', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          isSelected: false
        },
        {
          name: '4S',
          rank: 5,
          isSelected: false
        }
      ];

      expect(handUtils.isSPTF(hand)).to.be.eq(true);
    });
    it('should return false for a single diff numeral', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        },
        {
          name: '5S',
          rank: 9,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          isSelected: false
        },
        {
          name: '4S',
          rank: 5,
          isSelected: false
        }
      ];

      expect(handUtils.isSPTF(hand)).to.be.eq(false);
    });
  });
  describe('isConsecutive()', () => {
    it('should return false for presence of 2', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        },
        {
          name: '5H',
          rank: 8,
          isSelected: false
        },
        {
          name: '6D',
          rank: 7,
          isSelected: false
        },
        {
          name: '2H',
          rank: 52,
          isSelected: false
        }
      ];

      expect(handUtils.isConsecutive(hand)).to.be.eq(false);
    });
    it('should return false for less than 3 cards', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        },
        {
          name: '5H',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isConsecutive(hand)).to.be.eq(false);
    });
    it('should return true for consecutive sequence with number and face cards', () => {
      const hand = [
        {
          name: '8H',
          rank: 24,
          isSelected: false
        },
        {
          name: '9H',
          rank: 28,
          isSelected: false
        },
        {
          name: '10H',
          rank: 32,
          isSelected: false
        },
        {
          name: 'JH',
          rank: 36,
          isSelected: false
        },
        {
          name: 'QH',
          rank: 40,
          isSelected: false
        }];

      expect(handUtils.isConsecutive(hand)).to.be.eq(true);
    });
  });
  describe('isConsecTriplePairs()', () => {
    it('should return false for less than 6 cards', () => {
      const hand = [
        {
          name: '5S',
          rank: 9,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          isSelected: false
        },
        {
          name: '4S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          isSelected: false
        },
        {
          name: '4S',
          rank: 5,
          isSelected: false
        }
      ];

      expect(handUtils.isConsecTriplePairs(hand)).to.be.eq(false);
    });
    it('should return false for non-pairs', () => {
      const hand = [
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
          name: '6S',
          rank: 13,
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
        }
      ];

      expect(handUtils.isConsecTriplePairs(hand)).to.be.eq(false);
    });
    it('should return false for non-consecutive pairs', () => {
      const hand = [
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
        }
      ];

      expect(handUtils.isConsecTriplePairs(hand)).to.be.eq(false);
    });
    it('should return true for consecutive pairs with face cards', () => {
      const hand = [
        {
          name: '9D',
          rank: 27,
          isSelected: false
        },
        {
          name: '9H',
          rank: 28,
          isSelected: false
        },
        {
          name: '10H',
          rank: 32,
          isSelected: false
        },
        {
          name: '10D',
          rank: 31,
          isSelected: false
        },
        {
          name: 'JS',
          rank: 33,
          isSelected: false
        },
        {
          name: 'JD',
          rank: 35,
          isSelected: false
        }
      ];

      expect(handUtils.isConsecTriplePairs(hand)).to.be.eq(true);
    });
  });
  describe('isValidHand()', () => {
    it('should return true if first hand contains a 3S and is valid', () => {
      const hand = [
        {
          name: '3S',
          rank: 1,
          isSelected: false
        },
        {
          name: '3H',
          rank: 4,
          isSelected: false
        }
      ];

      expect(handUtils.isValidHand(hand, true)).to.be.eq(true);
    });
    it('should return false if first hand does NOT contain a 3S and is valid', () => {
      const hand = [
        {
          name: '4S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isValidHand(hand, true)).to.be.eq(false);
    });
    it('should return false if first hand does contain a 3S but is NOT valid', () => {
      const hand = [
        {
          name: '3S',
          rank: 1,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isValidHand(hand, true)).to.be.eq(false);
    });
    it('should return false for empty hand', () => {
      const hand = [];

      expect(handUtils.isValidHand(hand)).to.be.eq(false);
    });
    it('should return true for singles', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        }
      ];

      expect(handUtils.isValidHand(hand)).to.be.eq(true);
    });
    it('should return true for pairs', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isValidHand(hand)).to.be.eq(true);
    });
    it('should return true for triples', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          isSelected: false
        }
      ];

      expect(handUtils.isValidHand(hand)).to.be.eq(true);
    });
    it('should return true for four of a kind', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          isSelected: false
        },
        {
          name: '4S',
          rank: 5,
          isSelected: false
        }
      ];

      expect(handUtils.isValidHand(hand)).to.be.eq(true);
    });
    it('should return false for a single diff numeral for consec', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        },
        {
          name: '5S',
          rank: 9,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          isSelected: false
        },
        {
          name: '4S',
          rank: 5,
          isSelected: false
        }
      ];

      expect(handUtils.isValidHand(hand)).to.be.eq(false);
    });
    it('should return false for presence of 2 for consec', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        },
        {
          name: '5H',
          rank: 8,
          isSelected: false
        },
        {
          name: '6D',
          rank: 7,
          isSelected: false
        },
        {
          name: '2H',
          rank: 52,
          isSelected: false
        }
      ];

      expect(handUtils.isValidHand(hand)).to.be.eq(false);
    });
    it('should return false for less than 3 cards for consec', () => {
      const hand = [
        {
          name: '4C',
          rank: 6,
          isSelected: false
        },
        {
          name: '5H',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isValidHand(hand)).to.be.eq(false);
    });
    it('should return true for consecutive sequence with number and face cards', () => {
      const hand = [
        {
          name: '8H',
          rank: 24,
          isSelected: false
        },
        {
          name: '9H',
          rank: 28,
          isSelected: false
        },
        {
          name: '10H',
          rank: 32,
          isSelected: false
        },
        {
          name: 'JH',
          rank: 36,
          isSelected: false
        },
        {
          name: 'QH',
          rank: 40,
          isSelected: false
        }];

      expect(handUtils.isValidHand(hand)).to.be.eq(true);
    });
    it('should return false for less than 6 cards for consecutve triple pairs', () => {
      const hand = [
        {
          name: '5S',
          rank: 9,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          isSelected: false
        },
        {
          name: '4S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4D',
          rank: 7,
          isSelected: false
        },
        {
          name: '4S',
          rank: 5,
          isSelected: false
        }
      ];

      expect(handUtils.isValidHand(hand)).to.be.eq(false);
    });
    it('should return false for non-pairs consecutve triple pairs', () => {
      const hand = [
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
          name: '6S',
          rank: 13,
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
        }
      ];

      expect(handUtils.isValidHand(hand)).to.be.eq(false);
    });
    it('should return false for non-consecutive pairs consecutve triple pairs', () => {
      const hand = [
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
        }
      ];

      expect(handUtils.isValidHand(hand)).to.be.eq(false);
    });
    it('should return true for consecutve triple pairs with face cards', () => {
      const hand = [
        {
          name: '9D',
          rank: 27,
          isSelected: false
        },
        {
          name: '9H',
          rank: 28,
          isSelected: false
        },
        {
          name: '10H',
          rank: 32,
          isSelected: false
        },
        {
          name: '10D',
          rank: 31,
          isSelected: false
        },
        {
          name: 'JS',
          rank: 33,
          isSelected: false
        },
        {
          name: 'JD',
          rank: 35,
          isSelected: false
        }
      ];

      expect(handUtils.isValidHand(hand)).to.be.eq(true);
    });
  });
  describe('isSameType()', () => {
    it('should return true for singles', () => {
      const hand = [
        {
          name: '4S',
          rank: 5,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '4H',
          rank: 8,
          isSelected: false
        }];

      expect(handUtils.isSameType(hand, activeHand)).to.be.eq(true);
    });
    it('should return true for pairs', () => {
      const hand = [
        {
          name: '4S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '3S',
          rank: 5,
          isSelected: false
        },
        {
          name: '3H',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isSameType(hand, activeHand)).to.be.eq(true);
    });
    it('should return true for triples', () => {
      const hand = [
        {
          name: '4S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '4D',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '3S',
          rank: 5,
          isSelected: false
        },
        {
          name: '3H',
          rank: 8,
          isSelected: false
        },
        {
          name: '3D',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isSameType(hand, activeHand)).to.be.eq(true);
    });
    it('should return true for four of kind', () => {
      const hand = [
        {
          name: '4S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '4D',
          rank: 8,
          isSelected: false
        },
        {
          name: '4C',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '3S',
          rank: 5,
          isSelected: false
        },
        {
          name: '3H',
          rank: 8,
          isSelected: false
        },
        {
          name: '3D',
          rank: 8,
          isSelected: false
        },
        {
          name: '3C',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isSameType(hand, activeHand)).to.be.eq(true);
    });
    it('should return true for consecutives', () => {
      const hand = [
        {
          name: '3S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '5D',
          rank: 8,
          isSelected: false
        },
        {
          name: '6C',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '5S',
          rank: 5,
          isSelected: false
        },
        {
          name: '6H',
          rank: 8,
          isSelected: false
        },
        {
          name: '7D',
          rank: 8,
          isSelected: false
        },
        {
          name: '8C',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isSameType(hand, activeHand)).to.be.eq(true);
    });
    it('should return true for consec triple pairs', () => {
      const hand = [
        {
          name: '4S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '5D',
          rank: 8,
          isSelected: false
        },
        {
          name: '5C',
          rank: 8,
          isSelected: false
        },
        {
          name: '6D',
          rank: 8,
          isSelected: false
        },
        {
          name: '6C',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '5S',
          rank: 5,
          isSelected: false
        },
        {
          name: '5H',
          rank: 8,
          isSelected: false
        },
        {
          name: '6D',
          rank: 8,
          isSelected: false
        },
        {
          name: '6C',
          rank: 8,
          isSelected: false
        },
        {
          name: '7D',
          rank: 8,
          isSelected: false
        },
        {
          name: '7C',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isSameType(hand, activeHand)).to.be.eq(true);
    });
    it('should return false for not equal hands lengths', () => {
      const hand = [
        {
          name: '3S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '5D',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '5S',
          rank: 5,
          isSelected: false
        },
        {
          name: '6H',
          rank: 8,
          isSelected: false
        },
        {
          name: '7D',
          rank: 8,
          isSelected: false
        },
        {
          name: '8C',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isSameType(hand, activeHand)).to.be.eq(false);
    });
    it('should return false for consec 6 and consec triple pairs', () => {
      const hand = [
        {
          name: '3S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '5D',
          rank: 8,
          isSelected: false
        },
        {
          name: '6C',
          rank: 8,
          isSelected: false
        },
        {
          name: '7D',
          rank: 8,
          isSelected: false
        },
        {
          name: '8C',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '5S',
          rank: 5,
          isSelected: false
        },
        {
          name: '5H',
          rank: 8,
          isSelected: false
        },
        {
          name: '6D',
          rank: 8,
          isSelected: false
        },
        {
          name: '6C',
          rank: 8,
          isSelected: false
        },
        {
          name: '7D',
          rank: 8,
          isSelected: false
        },
        {
          name: '7C',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isSameType(hand, activeHand)).to.be.eq(false);
    });
    it('should return false for triples and consec 3s', () => {
      const hand = [
        {
          name: '3S',
          rank: 5,
          isSelected: false
        },
        {
          name: '3H',
          rank: 8,
          isSelected: false
        },
        {
          name: '3D',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '5S',
          rank: 5,
          isSelected: false
        },
        {
          name: '6H',
          rank: 8,
          isSelected: false
        },
        {
          name: '7D',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.isSameType(hand, activeHand)).to.be.eq(false);
    });
  });
  describe.only('whichType()', () => {
    it('should return SPTF for singles', () => {
      const hand = [
        {
          name: '4S',
          rank: 5,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '4H',
          rank: 8,
          isSelected: false
        }];

      expect(handUtils.whichType(hand, activeHand)).to.be.eq('SPTF');
    });
    it('should return SPTF for pairs', () => {
      const hand = [
        {
          name: '4S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '3S',
          rank: 5,
          isSelected: false
        },
        {
          name: '3H',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.whichType(hand, activeHand)).to.be.eq('SPTF');
    });
    it('should return SPTF for triples', () => {
      const hand = [
        {
          name: '4S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '4D',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '3S',
          rank: 5,
          isSelected: false
        },
        {
          name: '3H',
          rank: 8,
          isSelected: false
        },
        {
          name: '3D',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.whichType(hand, activeHand)).to.be.eq('SPTF');
    });
    it('should return SPTF for four of kind', () => {
      const hand = [
        {
          name: '4S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '4D',
          rank: 8,
          isSelected: false
        },
        {
          name: '4C',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '3S',
          rank: 5,
          isSelected: false
        },
        {
          name: '3H',
          rank: 8,
          isSelected: false
        },
        {
          name: '3D',
          rank: 8,
          isSelected: false
        },
        {
          name: '3C',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.whichType(hand, activeHand)).to.be.eq('SPTF');
    });
    it('should return CONSECUTIVE for consecutives', () => {
      const hand = [
        {
          name: '3S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '5D',
          rank: 8,
          isSelected: false
        },
        {
          name: '6C',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '5S',
          rank: 5,
          isSelected: false
        },
        {
          name: '6H',
          rank: 8,
          isSelected: false
        },
        {
          name: '7D',
          rank: 8,
          isSelected: false
        },
        {
          name: '8C',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.whichType(hand, activeHand)).to.be.eq('CONSECUTIVE');
    });
    it('should return CTP for consec triple pairs', () => {
      const hand = [
        {
          name: '4S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '5D',
          rank: 8,
          isSelected: false
        },
        {
          name: '5C',
          rank: 8,
          isSelected: false
        },
        {
          name: '6D',
          rank: 8,
          isSelected: false
        },
        {
          name: '6C',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '5S',
          rank: 5,
          isSelected: false
        },
        {
          name: '5H',
          rank: 8,
          isSelected: false
        },
        {
          name: '6D',
          rank: 8,
          isSelected: false
        },
        {
          name: '6C',
          rank: 8,
          isSelected: false
        },
        {
          name: '7D',
          rank: 8,
          isSelected: false
        },
        {
          name: '7C',
          rank: 8,
          isSelected: false
        }
      ];

      expect(handUtils.whichType(hand, activeHand)).to.be.eq('CTP');
    });
    it('should throw error for not equal hands lengths', () => {
      const hand = [
        {
          name: '3S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '5D',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '5S',
          rank: 5,
          isSelected: false
        },
        {
          name: '6H',
          rank: 8,
          isSelected: false
        },
        {
          name: '7D',
          rank: 8,
          isSelected: false
        },
        {
          name: '8C',
          rank: 8,
          isSelected: false
        }
      ];
      try {
        handUtils.whichType(hand, activeHand);
      } catch (error) {
        expect(error.message).to.be.eq('hand and active hand must be same length!');
      }
    });
    it('should throw error if both hands are not same type', () => {
      const hand = [
        {
          name: '3S',
          rank: 5,
          isSelected: false
        },
        {
          name: '4H',
          rank: 8,
          isSelected: false
        },
        {
          name: '5D',
          rank: 8,
          isSelected: false
        },
        {
          name: '6C',
          rank: 8,
          isSelected: false
        },
        {
          name: '7D',
          rank: 8,
          isSelected: false
        },
        {
          name: '8C',
          rank: 8,
          isSelected: false
        }
      ];

      const activeHand = [
        {
          name: '5S',
          rank: 5,
          isSelected: false
        },
        {
          name: '5H',
          rank: 8,
          isSelected: false
        },
        {
          name: '6D',
          rank: 8,
          isSelected: false
        },
        {
          name: '6C',
          rank: 8,
          isSelected: false
        },
        {
          name: '7D',
          rank: 8,
          isSelected: false
        },
        {
          name: '7C',
          rank: 8,
          isSelected: false
        }
      ];

      try {
        handUtils.whichType(hand, activeHand);
      } catch (error) {
        expect(error.message).to.be.eq('hand and active hand are not same type!');
      }
    });
  });
});
