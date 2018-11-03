<template>
  <div class="hello">
    <div id="game-controllers-container">
      <template v-if="gameStart">
        <button @click="playAgain()">Play Again</button>
      </template>
      <template v-else>
        <button @click="play()">Play</button>
        <div class="flashit"></div>
      </template>
    </div>

    <template v-if="gameStart">
        <game-arena></game-arena>
    </template>

  </div>
</template>

<script>
import GameArena from './GameArena.vue'
// const CARD_WIDTH = 76;
// const HAND_WIDTH = CARD_WIDTH * 13;

export default {
  name: 'Main',

  components: {
    GameArena
  },

  data () {
    return {
      gameStart: false,
      fill: { gradient: ['red', 'green', 'blue'] }
    }
  },

  mounted () {
    console.log('Main mounted')
  },

  methods: {
    play () {
      this.gameStart = true
    },

    playAgain () {
      this.gameStart = false
      this.$nextTick(() => {
        this.gameStart = true
      })
    }
  },

  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#game-controllers-container {
  position: absolute;
  left: 0px;
}

/* Flash class and keyframe animation */
.flashit{
  background-color: red;
  width: 50px;
  height: 50px;
  -webkit-animation: flash linear 1s infinite;
  animation: flash linear 1s infinite;
}
@-webkit-keyframes flash {
  0% { opacity: 1; }
  50% { opacity: .1; }
  100% { opacity: 1; }
}
@keyframes flash {
  0% { opacity: 1; }
  50% { opacity: .1; }
  100% { opacity: 1; }
}

</style>
