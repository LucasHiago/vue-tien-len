<template>
  <div class="card" :class="{ selected: isSelected }">
    <div v-html="require(`./../assets/faces/${svgFile}`)">
    </div>
  </div>
</template>

<script>
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

  computed: {
    svgFile() {
      const cardName = CardMap[this.cardMapKey].name;

      return `${cardName}.svg`;
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
}

.selected {
  top: 12px;
}

.card div svg {
  width: 10em;
}
</style>
