<template>
  <div>
    <vue-circle :ref="`player${playerId}Avatar`"
      :progress="progress"
      :size="isAi ? 120 : 150"
      :reverse="false"
      line-cap="round"
      :fill="fill"
      empty-fill="rgba(0, 0, 0, .1)"
      :animation-start-value="0.0"
      :start-angle="0"
      insert-mode="append"
      :thickness="5"
      :show-percent="false"
      :animation="{ duration: 5000, easing: 'circleProgressEasing' }"
      @vue-circle-progress="handleProgress"
      @vue-circle-end="handleProgressEnd">
      <!-- Slot -->
      <div :style="{width: isAi ? '65px': '100px'}">
        <div :class="{
          active: isActive,
          flashit: isActive
          }">{{ name }}</div>
        <div v-html="require(`./../assets/avatars/${this.avatarImage}.svg`)"></div>
      </div>
    </vue-circle>
  </div>
</template>

<script>
import VueCircle from 'vue2-circle-progress'
import { random } from 'lodash'

const inActiveFill = 'rgba(0, 0, 0, .1)'
const activeFill = '#2ecc71'

const avatarMap = {
  1: 'man-1',
  2: 'man-2',
  3: 'man-3',
  4: 'man-4',
  5: 'man',
  6: 'girl',
  7: 'girl-1',
  8: 'boy',
  9: 'boy-1'
}

export default {
  name: 'Avatar',
  components: {
    VueCircle
  },

  props: {
    name: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    avatarSize: {
      type: Number,
      default () {
        return 150
      }
    },
    isAi: {
      type: Boolean,
      default () {
        return true
      }
    },
    avatarImage: {
      type: String,
      default () {
        return avatarMap[random(1, 9)]
      }
    },
    isThinking: {
      type: Boolean,
      required: false
    },
    playerId: {
      type: Number,
      default () {
        return 1
      }
    }
  },

  computed: {
    refsKey () {
      return `player${this.playerId}Avatar`
    }
  },

  data () {
    return {
      progress: 0,
      fill: {
        color: activeFill
      }
    }
  },

  methods: {
    renderPlayerThinking () {
      if (this.playerId !== 1) {
        const ref = this.$refs[this.refsKey]
        ref.updateFill(activeFill)
        ref.updateProgress(100)
      }
    },

    renderPlayerDefaultState () {
      if (this.playerId !== 1) {
        const ref = this.$refs[this.refsKey]
        ref.updateProgress(0)
        ref.updateFill(inActiveFill)
      }
    },

    handleProgress (event, progress, stepValue) {
      // console.log(stepValue)
    },
    handleProgressEnd (event) {
      console.log('Circle progress end')
      // console.log('event', event)
    }
  },

  watch: {
    isThinking (val) {
      if (val) {
        if (this.playerId !== 1) {
          this.renderPlayerThinking()
        }
      }
    },
    isActive (val) {
      if (!val) {
        if (this.playerId !== 1) {
          this.renderPlayerDefaultState()
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .active
    color: #2ecc71
    font-weight: bold

  .flashit
    -webkit-animation: flash linear 1s infinite
    animation: flash linear 1s infinite
  @-webkit-keyframes flash
    0%
      opacity: 1
    50%
      opacity: .1
    100%
      opacity: 1
  @keyframes flash
    0%
      opacity: 1
    50%
      opacity: .1
    100%
      opacity: 1
</style>
