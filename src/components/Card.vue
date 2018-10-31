<template>
  <div class="card-container" :style="styleObj">
    <template v-if="playerId && playerProfile.isFake">
      <img width="76px" src="./../assets/back.png" />
    </template>
    <template v-else>
      <div v-html="require(`./../assets/faces/${svgFile}`)">
      </div>
    </template>
  </div>
</template>

<script>
import { CardMap } from '../Constants/CardMap'

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
      required: false
    },
    playerProfile: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      card_width: 76, // width of a card
      card_height: 110 // height of a card
    }
  },

  computed: {
    styleObj () {
      // return player hand styles
      if (this.playerId) {
        const fakePlayerSingleCardDelta = 10
        const isEvenPLayer = this.playerId % 2 === 0

        const oddPlayerDelta = 30
        let evenPlayerDelta = 25

        if (this.playerId === 2) {
          evenPlayerDelta *= -1
        }
        let rotateDeg = 0

        if (isEvenPLayer) {
          rotateDeg = this.playerId === 2 ? -90 : 90
        }

        if (isEvenPLayer) {
          const evenLayoutPosition = {
            top: `${(this.cardHandIndex * fakePlayerSingleCardDelta)}px`,
            transform: `rotate(${rotateDeg}deg)`
          }

          if (this.playerId === 2) {
            evenLayoutPosition.left = this.isSelected ? `${evenPlayerDelta}px` : '0'
          } else {
            evenLayoutPosition.right = this.isSelected ? `-${evenPlayerDelta}px` : '0'
          }

          return evenLayoutPosition
        }

        // odd players cards
        const oddLayoutPosition = {
          left: this.playerId === 1 ? `${this.cardHandIndex * oddPlayerDelta}px` : `${this.cardHandIndex * fakePlayerSingleCardDelta}px`,
          transform: `rotate(${rotateDeg}deg)`
        }

        if (this.isSelected && (this.playerId % 2 !== 0)) {
          if (this.playerId === 1) {
            oddLayoutPosition.top = '50px'
          } else {
            oddLayoutPosition.top = '80px'
          }
        }

        return oddLayoutPosition
      }

      // active cards
      return {
        left: `${this.cardHandIndex * 15}px`
      }
    },

    svgFile () {
      const cardName = CardMap[this.cardMapKey].name

      return `${cardName}.svg`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-container {
  width: 76px;
  height: 110px;
  /* display: inline-block; */
  position: absolute;
}

</style>
