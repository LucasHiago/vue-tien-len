<template>
  <div class="hello">
    <button @click="play()">Play</button>
      <card :cardMapKey="11"></card>
  </div>
</template>

<script>

import Card from './Card.vue';
import Deck from '../Classes/deck';

export default {

  data() {
    return {
      players: {
        1: {
          cards: []
        },
        2: {
          cards: []
        },
        3: {
          cards: []
        },
        4: {
          cards: []
        }
      },
      name: ''
    };
  },

  methods: {
    play() {
      this.inittializeGame();
    },
    inittializeGame() {
      // generate deck
      const deck = new Deck();
      console.log(deck);
    }
  },

  components: {
    Card
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
