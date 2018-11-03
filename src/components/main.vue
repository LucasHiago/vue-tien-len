<template>
  <div id="main">
    <template v-if="gameStart">
      <game-arena v-if="gameStart"></game-arena>
    </template>
    <template v-else>
      <div id="main-screen-container">
        <div class="title">13<span>Vietnamese Poker</span></div>
        <div class="link">
          <code>A pure <a href="https://github.com/dinhtq/vue-tien-len">Vue project</a> with a simple Ai.</code>
        </div>
        <div class="controls-container">
          <button @click="play()" type="button" class="btn btn-primary btn-lg btn3d">
            <span class="glyphicon glyphicon-play"></span> Play</button>
          <br/>
          <button type="button" class="btn btn-info btn-sm btn3d">
            <span class="glyphicon glyphicon-info-sign"></span> How to play</button>
        </div>
        <div class="cards-container">
          <card :card-map-key="12"></card>
          <card :card-map-key="25"></card>
          <card :card-map-key="38"></card>
          <card :card-map-key="51"></card>
        </div>
      </div>
    </template>

    <div id="footer">
      Created by <a href="www.jasondinh.me">Jason Dinh</a>
    </div>

    <div class="github-ribbon">
      <a href="https://github.com/dinhtq/vue-tien-len">
        <img style="position: absolute; top: 0; left: 0; border: 0;"
          src="https://s3.amazonaws.com/github/ribbons/forkme_left_gray_6d6d6d.png" alt="Fork me on GitHub" /></a>
    </div>
  </div>
</template>

<script>
import GameArena from './GameArena.vue'
import Card from './Card.vue'
// const CARD_WIDTH = 76;
// const HAND_WIDTH = CARD_WIDTH * 13;

export default {
  name: 'Main',

  components: {
    GameArena,
    Card
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
      setTimeout(() => {
        this.gameStart = true
      }, 1000)
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
    .link
      font-size: 1.5em
    .controls-container
      margin: 50px
      button
        width: 200px
    .cards-container
      position: relative
      width: 180px
      margin: auto
      margin-top: 50px
      div:nth-child(2)
        left: 35px
      div:nth-child(3)
        left: 70px
      div:nth-child(4)
        left: 105px
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
