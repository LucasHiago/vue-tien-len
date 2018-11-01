<template>
  <div>
    <vue-circle
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
      @vue-circle-progress="handleProgress"
      @vue-circle-end="handleProgressEnd">
      <!-- Slot -->
      <div :style="{width: isAi ? '65px': '100px'}">
        <div :class="{active: isActive}">{{ name }}</div>
        <div v-html="require(`./../assets/avatars/${this.avatarImage}.svg`)"></div>
      </div>
    </vue-circle>
  </div>
</template>

<script>
import VueCircle from 'vue2-circle-progress'
import { random } from 'lodash'

// const inActiveColor = 'rgba(0, 0, 0, .1)'
const activeColor = '#2ecc71'

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
    }
  },

  data () {
    return {
      progress: 0,
      fill: {
        color: activeColor
      }
    }
  },

  methods: {
    handleProgress (event, progress, stepValue) {
      console.log(stepValue)
    },
    handleProgressEnd (event) {
      console.log('Circle progress end')
      console.log('event', event)
    }
  },

  watch: {
    isActive (val) {}
  }
}
</script>

<style lang="sass" scoped>
  .active
    color: #2ecc71
    font-weight: bold
</style>
