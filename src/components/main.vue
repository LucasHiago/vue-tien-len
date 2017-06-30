<template>
  <div class="hello">
    <div>
      <button @click="play()">Play</button>
    </div>
    <div>
  
      <template v-if="gameState.gameStart">
        <!-- active hands area -->
  
        <h3>Player 1
          <button @click="sortByRank('player1')">Sort by rank</button>
          <button @click="submitHand('player1')" :disabled="!gameState.player1.isTurn">Play hand</button>
        </h3>
        <div class="hand">
          <div v-for="(card, index) in gameState.player1.cards" :key="card" class="card-container">
            <div @click="cardClickHandler('player1', index)">
              <card :cardMapKey="parseInt(card.cardKey)" :is-selected="card.isSelected"></card>
            </div>
          </div>
        </div>
  
        <h3>Player 2
          <button @click="sortByRank('player2')">Sort by rank</button>
          <button @click="submitHand('player2')" :disabled="!gameState.player2.isTurn">Play hand</button>
        </h3>
        <div class="hand">
          <div v-for="card in gameState.player2.cards" :key="card" class="card-container">
            <div @click="cardClickHandler('player2', index)">
              <card :cardMapKey="parseInt(card.cardKey)" :is-selected="card.isSelected"></card>
            </div>
          </div>
        </div>
  
        <h3>Player 3
          <button @click="sortByRank('player3')">Sort by rank</button>
          <button @click="submitHand('player3')" :disabled="!gameState.player3.isTurn">Play hand</button>
        </h3>
        <div class="hand">
          <div v-for="card in gameState.player3.cards" :key="card" class="card-container">
            <div @click="cardClickHandler('player3', index)">
              <card :cardMapKey="parseInt(card.cardKey)" :is-selected="card.isSelected"></card>
            </div>
          </div>
        </div>
  
        <h3>Player 4
          <button @click="sortByRank('player4')">Sort by rank</button>
          <button @click="submitHand('player4')" :disabled="!gameState.player4.isTurn">Play hand</button>
        </h3>
        <div class="hand">
          <div v-for="card in gameState.player4.cards" :key="card" class="card-container">
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
      gameState: {
        player1: {
          cards: [],
          isTurn: false,
          selectedHand: [],
          canPlayHand: false // result of evaulating selectedHand
        },
        player2: {
          cards: [],
          isTurn: false,
          selectedHand: [],
          canPlayHand: false // result of evaulating selectedHand
        },
        player3: {
          cards: [],
          isTurn: false,
          selectedHand: [],
          canPlayHand: false // result of evaulating selectedHand
        },
        player4: {
          cards: [],
          isTurn: false,
          selectedHand: [],
          canPlayHand: false // result of evaulating selectedHand
        },
        gameStart: false
      }
    };
  },

  methods: {
    play() {
      this.initializeGame();
    },
    initializeGame() {
      this.gameState.gameStart = true;

      // generate deck
      const deck = new Deck();

      // deal cards to players
      this.dealCards(deck);

      // determine who goes first
      this.setFirstTurnPlayer();
    },
    dealCards(deck) {
      this.gameState.player1.cards = deck.deck.slice(0, 13);
      this.gameState.player2.cards = deck.deck.slice(13, 26);
      this.gameState.player3.cards = deck.deck.slice(26, 39);
      this.gameState.player4.cards = deck.deck.slice(39, 52);
    },
    setFirstTurnPlayer() {
      // player with 3S goes first
      const targetRank = 1; // 3S

      let playerFound = null;

      Object.keys(this.gameState).forEach((player) => {
        if (_.find(this.gameState[player].cards, ['rank', targetRank])) {
          playerFound = player;
        }
      });

      this.gameState[playerFound].isTurn = true;
    },
    sortByRank(player) {
      // sort the player's hand
      let hand = this.gameState[player].cards;
      // sort by rank number
      hand = _.sortBy(hand, card => parseInt(card.rank, 10));
      this.gameState[player].cards = hand;
    },
    cardClickHandler(player, index) {
      // set isSelected prop on card
      // eslint-disable-next-line
      this.gameState[player].cards[index].isSelected = !this.gameState[player].cards[index].isSelected;
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
