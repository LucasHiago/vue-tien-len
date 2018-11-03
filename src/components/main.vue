<template>
  <div id="main">
    <template v-if="gameStart">
      <game-arena v-if="gameStart"></game-arena>
    </template>
    <template v-else>
      <div id="main-screen-container">
        <div class="title">13<span>Vietnamese Poker</span></div>
        <button @click="play()">Play</button>
        <button>How to play</button>
      </div>
    </template>

    <div id="footer">
      Created by <a href="www.jasondinh.me">Jason Dinh</a>
    </div>
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
<style scoped lang="sass">
#main
  width: 100%
  height: 100%
  #main-screen-container
    position: relative
    top: 10%
    min-width: 50%
    height: 200px
    margin: auto

    .title
      font-size: 7em
      font-weight: bold
      margin-bottom: 5px
      span
        font-weight: normal
        font-size: .5em
        font-style: italic
  #footer
    position: absolute
    bottom: 0
    width: 100%
    background-color: #ecf0f1
    text-align: left
    padding: 5px 20px

    a
      text-decoration: none
      color: #3498db
</style>
