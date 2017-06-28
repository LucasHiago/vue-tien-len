<template>
  <div class="hello">
    <div>
      <button @click="play()">Play</button>
      <!--<card :cardMapKey="41"></card>-->
    </div>
    <div>

      <template v-if="gameStart">
        <h3>Player 1 <button @click="sort('player1')">Sort</button></h3>
        <div class="hand">
          <div v-for="card in player1.cards" :key="card" class="card-container">
            <div @click="cardClickHandler(1, card.cardKey)">
              <card :cardMapKey="parseInt(card.cardKey)"></card>
            </div>
          </div>
        </div>
  
        <h3>Player 2</h3>
        <div class="hand">
          <div v-for="card in player2.cards" :key="card" class="card-container">
            <card :cardMapKey="parseInt(card.cardKey)"></card>
          </div>
        </div>
  
        <h3>Player 3</h3>
        <div class="hand">
          <div v-for="card in player3.cards" :key="card" class="card-container">
            <card :cardMapKey="parseInt(card.cardKey)"></card>
          </div>
        </div>
  
        <h3>Player 4</h3>
        <div class="hand">
          <div v-for="card in player4.cards" :key="card" class="card-container">
            <card :cardMapKey="parseInt(card.cardKey)"></card>
          </div>
        </div>
  
      </template>
  
    </div>
  </div>
</template>

<script>

import _ from 'lodash';
import Card from './Card.vue';
import Deck from '../Classes/deck';

export default {

  data() {
    return {
      player1: {
        cards: []
      },
      player2: {
        cards: []
      },
      player3: {
        cards: []
      },
      player4: {
        cards: []
      },
      gameStart: false
    };
  },

  methods: {
    play() {
      this.initializeGame();
    },
    initializeGame() {
      this.gameStart = true;

      // generate deck
      const deck = new Deck();

      // deal cards to players
      this.dealCards(deck);
    },
    dealCards(deck) {
      this.player1.cards = deck.deck.slice(0, 13);
      this.player2.cards = deck.deck.slice(13, 26);
      this.player3.cards = deck.deck.slice(26, 39);
      this.player4.cards = deck.deck.slice(39, 52);
    },
    sort(player) {
      // sort the player's hand
      let hand = this[player].cards;
      // sort by rank number
      hand = _.sortBy(hand, card => parseInt(card.rank, 10));
      console.log(hand);
      this[player].cards = hand;
    },
    cardClickHandler(player, cardKey) {
      console.log(player);
      console.log(cardKey);
    }
  },

  components: {
    Card
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  text-align: left;
  margin-left: 137px;
}

.hand {
  width: 1000px;
  height: 182px;
  margin-left: 200px;
  -ms-transform: rotate(180deg);
  /* IE 9 */
  -webkit-transform: rotate(180deg);
  /* Safari */
  transform: rotate(180deg);
}

.card-container {
  float: right;
  width: 6%;
}
</style>
