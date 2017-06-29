<template>
  <div class="hello">
    <div>
      <button @click="play()">Play</button>
    </div>
    <div>

      <template v-if="gameStart">
        <h3>Player 1 <button @click="sortByRank('player1')">Sort by rank</button></h3>
        <div class="hand">
          <div v-for="(card, index) in player1.cards" :key="card" class="card-container">
            <div @click="cardClickHandler('player1', index)">
              <card :cardMapKey="parseInt(card.cardKey)" :is-selected="card.isSelected"></card>
            </div>
          </div>
        </div>
  
        <h3>Player 2 <button @click="sortByRank('player2')">Sort by rank</button></h3>
        <div class="hand">
          <div v-for="card in player2.cards" :key="card" class="card-container">
            <div @click="cardClickHandler('player2', index)">
              <card :cardMapKey="parseInt(card.cardKey)" :is-selected="card.isSelected"></card>
            </div>
          </div>
        </div>
  
        <h3>Player 3 <button @click="sortByRank('player3')">Sort by rank</button></h3>
        <div class="hand">
          <div v-for="card in player3.cards" :key="card" class="card-container">
            <div @click="cardClickHandler('player3', index)">
              <card :cardMapKey="parseInt(card.cardKey)" :is-selected="card.isSelected"></card>
            </div>
          </div>
        </div>
  
        <h3>Player 4 <button @click="sortByRank('player4')">Sort by rank</button></h3>
        <div class="hand">
          <div v-for="card in player4.cards" :key="card" class="card-container">
            <div @click="cardClickHandler('player4', index)">
              <card :cardMapKey="parseInt(card.cardKey)" :is-selected="card.isSelected"></card>
            </div>
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
    sortByRank(player) {
      // sort the player's hand
      let hand = this[player].cards;
      // sort by rank number
      hand = _.sortBy(hand, card => parseInt(card.rank, 10));
      this[player].cards = hand;
    },
    cardClickHandler(player, index) {
      // set isSelected prop on card
      this[player].cards[index].isSelected = !this[player].cards[index].isSelected;
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
