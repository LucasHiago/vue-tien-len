<template>
  <div class="card" v-bind:style="styleObject">
  </div>
</template>

<script>
import _ from 'lodash';
import { CardMap } from '../Constants/CardMap';

export default {
  props: {
    cardMapKey: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      width: 125, // width of a card
      height: 182 // height of a card
    };
  },

  mounted() {
    console.log('mounted');
  },

  computed: {
    left() {
      return CardMap[this.cardMapKey].left;
    },
    top() {
      return CardMap[this.cardMapKey].top;
    },
    styleObject() {
      const card = this.cardMapKey;
      const cardName = CardMap[this.cardMapKey].name;
      const ROW_1_CUTOFF = 13;
      const ROW_2_CUTOFF = 26;
      const ROW_3_CUTOFF = 39;

      // calculate column factor
      // default is 2S, 2C, 2D, 2H cols
      const col = _.includes(cardName, '2') ? 0 : card + 1;

      // calculate row
      let row = 0;
      if (card >= ROW_3_CUTOFF) {
        row = 1;
      } else if (card >= ROW_2_CUTOFF) {
        row = 2;
      } else if (card >= ROW_1_CUTOFF) {
        row = 3;
      }

      const left = col === 0 ? col : -(125 * col);
      const top = 182 * row;

      if (card === 41) {
        console.log(`row: ${row}`);
        console.log(`cardKey: ${card}`);
        console.log(`cardName: ${cardName}`);
        console.log(`left: ${left}`);
        console.log(`top: ${top}`);
      }

      return {
        backgroundPosition: `${left}px ${top}px`
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 125px;
  height: 182px;
  background: url('../assets/deck.png');
}

.cardPosition {
  background-position: -125px 0px;
}
</style>
