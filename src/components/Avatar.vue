<template>
  <div>
    <vue-circle
      :progress="progress"
      :size="150"
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
      <div class="avatar">
        <div :class="{active: isActive}">{{ name }}</div>
        <div v-html="require('./../assets/avatars/man-1.svg')"></div>
      </div>
    </vue-circle>
  </div>
</template>

<script>
import VueCircle from 'vue2-circle-progress'

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
    }
  },

  data () {
    return {
      progress: 0,
      fill: { gradient: ['red', 'green', 'blue'] }
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
    isActive (val) {
      if (!val) {
        this.progress = 0
      }
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 100px;
}

.avatar .active {
  color: red;
  font-weight: bold;
}
</style>
