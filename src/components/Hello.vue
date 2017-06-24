<template>
  <div class="hello">
    <button @click="play()">Play</button>
      <card :cardMapKey="11"></card>
  </div>
</template>

<script>

import Card from './Card.vue';


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
      console.log('play');
      this.players[1].cards.push(1111);
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
