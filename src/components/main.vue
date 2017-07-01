<template>
  <div class="hello">
    <div>
      <button @click="play()">Play</button>
    </div>
    <div>
  
      <template v-if="gameState.gameStart">
        <!-- active hands area -->
        <template v-if="gameState.active.hand.length > 0">
          <div class="activePlayerContainer">
            {{ gameState.active.playerId }}
          </div>
          <div class="hand">
            <div v-for="(card, index) in gameState.active.hand" :key="card" class="card-container">
              <card :cardMapKey="parseInt(card.cardKey)"></card>
            </div>
          </div>
        </template>
  
        <h3>
          <span :class="{activePlayer: isActivePlayer('player1')}">Player 1</span>
          <button @click="submitHand('player1')" :disabled="!gameState.players.player1.isTurn">Play hand</button>
          <button @click="pass('player1')" :disabled="!gameState.players.player1.isTurn">Pass</button>
        </h3>
        <div class="hand">
          <div v-for="(card, index) in gameState.players.player1.cards" :key="card" class="card-container">
            <div @click="cardClickHandler('player1', index)">
              <card :cardMapKey="parseInt(card.cardKey)" :is-selected="card.isSelected"></card>
            </div>
          </div>
        </div>
  
        <h3>
          <span :class="{activePlayer: isActivePlayer('player2')}">Player 2</span>
          <button @click="submitHand('player2')" :disabled="!gameState.players.player2.isTurn">Play hand</button>
          <button @click="pass('player2')" :disabled="!gameState.players.player2.isTurn">Pass</button>
        </h3>
        <div class="hand">
          <div v-for="(card, index) in gameState.players.player2.cards" :key="card" class="card-container">
            <div @click="cardClickHandler('player2', index)">
              <card :cardMapKey="parseInt(card.cardKey)" :is-selected="card.isSelected"></card>
            </div>
          </div>
        </div>
  
        <h3>
          <span :class="{activePlayer: isActivePlayer('player3')}">Player 3</span>
          <button @click="submitHand('player3')" :disabled="!gameState.players.player3.isTurn">Play hand</button>
          <button @click="pass('player3')" :disabled="!gameState.players.player3.isTurn">Pass</button>
        </h3>
        <div class="hand">
          <div v-for="(card, index) in gameState.players.player3.cards" :key="card" class="card-container">
            <div @click="cardClickHandler('player3', index)">
              <card :cardMapKey="parseInt(card.cardKey)" :is-selected="card.isSelected"></card>
            </div>
          </div>
        </div>
  
        <h3>
          <span :class="{activePlayer: isActivePlayer('player4')}">Player 4</span>
          <button @click="submitHand('player4')" :disabled="!gameState.players.player4.isTurn">Play hand</button>
          <button @click="pass('player4')" :disabled="!gameState.players.player4.isTurn">Pass</button>
        </h3>
        <div class="hand">
          <div v-for="(card, index) in gameState.players.player4.cards" :key="card" class="card-container">
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
        players: {
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
          }
        },
        gameStart: false,
        active: {
          playerId: null,
          hand: [] // list of cards
        }
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

      // sort players cards'
      this.sortByRank();

      // determine who goes first
      this.setFirstTurnPlayer();
    },
    dealCards(deck) {
      this.gameState.players.player1.cards = deck.deck.slice(0, 13);
      this.gameState.players.player2.cards = deck.deck.slice(13, 26);
      this.gameState.players.player3.cards = deck.deck.slice(26, 39);
      this.gameState.players.player4.cards = deck.deck.slice(39, 52);
    },
    setFirstTurnPlayer() {
      // player with 3S goes first
      const targetRank = 1; // 3S

      let playerFound = null;

      Object.keys(this.gameState.players).forEach((player) => {
        if (_.find(this.gameState.players[player].cards, ['rank', targetRank])) {
          playerFound = player;
        }
      });

      this.gameState.players[playerFound].isTurn = true;
    },
    sortByRank() {
      // sort all players cards by rank
      const playersKeys = Object.keys(this.gameState.players);
      playersKeys.forEach((player) => {
        // sort the player's hand
        let hand = this.gameState.players[player].cards;
        // sort by rank number
        hand = _.sortBy(hand, card => parseInt(card.rank, 10));
        this.gameState.players[player].cards = hand;
      });
    },
    cardClickHandler(player, index) {
      // set isSelected prop on card
      if (this.gameState.players[player].isTurn) {
        // eslint-disable-next-line
        this.gameState.players[player].cards[index].isSelected = !this.gameState.players[player].cards[index].isSelected;
      }
    },
    isActivePlayer(player) {
      return this.gameState.players[player].isTurn || false;
    },
    pass(player) {
      this.setNextActivePlayer(player);
    },
    submitHand(player) {
      // set player selected hand state
      const playerSelectedHand = _.filter(this.gameState.players[player].cards, 'isSelected');
      this.gameState.players[player].selectedHand = playerSelectedHand;

      // TODO: determine player selectedHand can be played or not

      // if true,
      // then set game state active
      this.gameState.active.hand = playerSelectedHand;
      this.gameState.active.playerId = player;

      // removed played cards from player
      this.gameState.players[player].cards = _.filter(this.gameState.players[player].cards, ['isSelected', false]);

      // set next active player
      this.setNextActivePlayer(player);
    },
    setNextActivePlayer(curPlayer) {
      // set current player turn state
      this.gameState.players[curPlayer].isTurn = false;

      // set next player turn state
      let nextPlayerId = parseInt(curPlayer[curPlayer.length - 1], 10) + 1;
      nextPlayerId = nextPlayerId > 4 ? '1' : nextPlayerId.toString();
      const nextPlayer = `player${nextPlayerId}`;
      this.gameState.players[nextPlayer].isTurn = true;
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

.activePlayer {
  color: blue
}

.activePlayerContainer {
  text-align: left;
  margin-left: 137px;
}
</style>
