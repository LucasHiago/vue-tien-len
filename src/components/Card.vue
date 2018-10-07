<template>
  <div class="card-container" :style="styleObj" :class="{ selected: isSelected }">
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
    cardHandIndex: {
      type: Number,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: false
    },
    playerId: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      card_width: 76, // width of a card
      card_height: 110 // height of a card
    };
  },

  computed: {
    styleObj() {
      const isEvenPLayer = this.playerId % 2 === 0;

      let delta = 30;

      if (this.playerId === 2) {
        delta *= -1;
      }
      let rotateDeg = 0;

      if (isEvenPLayer) {
        rotateDeg = this.playerId === 2 ? -90 : 90;
      }

      if (isEvenPLayer) {
        return {
          top: `${this.cardHandIndex * delta}px`,
          transform: `rotate(${rotateDeg}deg)`
        };
      }

      return {
        left: `${this.cardHandIndex * delta}px`,
        transform: `rotate(${rotateDeg}deg)`
      };
    },

    svgFile() {
      const cardName = CardMap[this.cardMapKey].name;

      return `${cardName}.svg`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-container {
  width: 76px;
  height: 110px;
  display: inline-block;
  position: absolute;
}

.selected {
  top: 12px;
}

</style>
