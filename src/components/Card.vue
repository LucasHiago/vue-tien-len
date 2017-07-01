<template>
  <div class="card" v-bind:style="styleObject" :class="{ selected: isSelected }">
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
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      card_width: 76, // width of a card
      card_height: 110 // height of a card
    };
  },

  mounted() {
    console.log('mounted');
  },

  computed: {
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

      const left = col === 0 ? col : -(this.card_width * col);
      const top = this.card_height * row;

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
  position: relative;
  width: 76px;
  height: 110px;
  background: url('../assets/deck.png');
}

.cardPosition {
  background-position: -76px 0px;
}

.selected {
  top: 25px;
}
</style>
