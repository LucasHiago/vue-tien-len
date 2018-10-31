<template>
  <div>
    <vue-circle
      :progress="50"
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
      @vue-circle-progress="progress"
      @vue-circle-end="progress_end">
      <!-- Slot -->
      <div class="avatar">
        <div class="name">{{ name }}</div>
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
    }
  },

  data () {
    return {
      fill: { gradient: ['red', 'green', 'blue'] }
    }
  },

  methods: {
    progress (event, progress, stepValue) {
      console.log(stepValue)
    },
    progress_end (event) {
      console.log('Circle progress end')
      console.log('event', event)
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 100px;
}

.avatar .name {
  color: red;
  font-weight: bold;
}
</style>
