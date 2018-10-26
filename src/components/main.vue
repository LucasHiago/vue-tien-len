<template>
  <div class="hello">
    <div id="game-controllers-container">
      <template v-if="gameStart">
        <button @click="playAgain()">Play Again</button>
      </template>
      <template v-else>
        <button @click="play()">Play</button>
        <vue-circle
          :progress="50"
          :size="100"
          :reverse="false"
          line-cap="round"
          :fill="fill"
          empty-fill="rgba(0, 0, 0, .1)"
          :animation-start-value="0.0"
          :start-angle="0"
          insert-mode="append"
          :thickness="5"
          :show-percent="true"
          @vue-circle-progress="progress"
          @vue-circle-end="progress_end">
            <p>Play</p>
        </vue-circle>
      </template>
    </div>

    <template v-if="gameStart">
        <game-arena></game-arena>
    </template>

  </div>
</template>

<script>
import VueCircle from 'vue2-circle-progress';
import GameArena from './GameArena.vue';
// const CARD_WIDTH = 76;
// const HAND_WIDTH = CARD_WIDTH * 13;


export default {
  name: 'Main',

  components: {
    VueCircle,
    GameArena
  },

  data() {
    return {
      gameStart: false,
      fill: { gradient: ['red', 'green', 'blue'] },
    };
  },

  mounted() {
    console.log('Main mounted');
  },

  methods: {
    play() {
      this.gameStart = true;
    },

    playAgain() {
      this.gameStart = false;
      this.$nextTick(() => {
        this.gameStart = true;
      });
    },

    progress(event, progress, stepValue) {
      console.log(stepValue);
    },
    progress_end(event) {
      console.log('Circle progress end');
      console.log('event', event);
    }
  },

  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
