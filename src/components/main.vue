<template>
  <div class="hello">
    <div>
      <template v-if="gameState.gameStart">
        <button @click="playAgain()">Play Again</button>
      </template>
      <template v-else>
        <button @click="play()">Play</button>
      </template>
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
          <button @click="submitHand('player1')" :disabled="!canPlayHand('player1')">Play hand</button>
          <button @click="pass('player1')" :disabled="!canPass('player1')">Pass</button>
          <span v-if="gameState.players.player1.isPassed" class="passed">Passed</span>
          <span v-else class="inRound">In Round</span>
          <span v-if="gameState.players.player1.winRank">Win Rank: {{ gameState.players.player1.winRank }}</span>
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
          <button @click="submitHand('player2')" :disabled="!canPlayHand('player2')">Play hand</button>
          <button @click="pass('player2')" :disabled="!canPass('player2')">Pass</button>
          <span v-if="gameState.players.player2.isPassed" class="passed">Passed</span>
          <span v-else class="inRound">In Round</span>
          <span v-if="gameState.players.player2.winRank">Win Rank: {{ gameState.players.player2.winRank }}</span>
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
          <button @click="submitHand('player3')" :disabled="!canPlayHand('player3')">Play hand</button>
          <button @click="pass('player3')" :disabled="!canPass('player3')">Pass</button>
          <span v-if="gameState.players.player3.isPassed" class="passed">Passed</span>
          <span v-else class="inRound">In Round</span>
          <span v-if="gameState.players.player3.winRank">Win Rank: {{ gameState.players.player3.winRank }}</span>
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
          <button @click="submitHand('player4')" :disabled="!canPlayHand('player4')">Play hand</button>
          <button @click="pass('player4')" :disabled="!canPass('player4')">Pass</button>
          <span v-if="gameState.players.player4.isPassed" class="passed">Passed</span>
          <span v-else class="inRound">In Round</span>
          <span v-if="gameState.players.player4.winRank">Win Rank: {{ gameState.players.player4.winRank }}</span>
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
import { mapGetters } from 'vuex';
import Card from './Card.vue';
import Deck from '../Classes/deck';
import handUtils from '../utils/handUtils';

export default {

  mounted() {
    console.log('mounted');

    this.$store.dispatch('getAllUsers');
  },

  data() {
    return {
      gameState: {
        players: {
          player1: {
            cards: [],
            isTurn: false,
            isFirstTurn: false,
            selectedHand: [],
            canPlayHand: false, // result of evaulating selectedHand,
            isPassed: false,
            winRank: undefined
          },
          player2: {
            cards: [],
            isTurn: false,
            isFirstTurn: false,
            selectedHand: [],
            canPlayHand: false, // result of evaulating selectedHand
            isPassed: false,
            winRank: undefined
          },
          player3: {
            cards: [],
            isTurn: false,
            isFirstTurn: false,
            selectedHand: [],
            canPlayHand: false, // result of evaulating selectedHand
            isPassed: false,
            winRank: undefined
          },
          player4: {
            cards: [],
            isTurn: false,
            isFirstTurn: false,
            selectedHand: [],
            canPlayHand: false, // result of evaulating selectedHand
            isPassed: false,
            winRank: undefined
          }
        },
        // prob can move to Store
        gameStart: false,
        active: {
          playerId: null,
          hand: [], // list of cards
        }
      },
      winRank: 1,
      passCounter: 0
    };
  },

  methods: {
    play() {
      this.initializeGame();
    },
    playAgain() {
      this.resetGame();
    },
    initializeGame() {
      this.gameState.gameStart = true;

      // generate deck
      const deck = new Deck();

      // deal cards to players
      this.dealCards(deck);

      // sort players cards'
      this.sortByRank();

      // bug fixing - reduce to n cards
      this.minimizeCards(2);

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
      this.gameState.players[playerFound].isFirstTurn = true;
      this.gameState.active.playerId = playerFound;
    },
    sortByRank() {
      // TODO: move sortByRank to Deck class
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
      // set player selected hand state
      const playerSelectedHand = _.filter(this.gameState.players[player].cards, 'isSelected');
      this.gameState.players[player].selectedHand = playerSelectedHand;
    },
    isActivePlayer(player) {
      return this.gameState.players[player].isTurn || false;
    },
    canPass(player) {
      // player can only pass if it is their turn and there are active hands

      return this.gameState.players[player].isTurn && this.gameState.active.hand.length > 0;
    },
    pass(player) {
      this.gameState.players[player].isPassed = true;
      this.passCounter = this.passCounter + 1;
      this.setNextActivePlayer(player);
    },
    submitHand(player) {
      // get player selected hand state
      const playerSelectedHand = this.gameState.players[player].selectedHand;
      const activeHand = this.gameState.active.hand;
      const isFirstHand = this.gameState.players[player].isFirstTurn;

      // player can submit hand if starting round, or has a hand that can beat active hand
      if (handUtils.canBeatHand(playerSelectedHand, activeHand) || isFirstHand ||
        activeHand.length === 0) {
        // set game state active
        this.gameState.active.hand = playerSelectedHand;
        this.gameState.active.playerId = player;

        // removed played cards from player
        this.gameState.players[player].cards = _.filter(this.gameState.players[player].cards, ['isSelected', false]);

        // if player has no more cards, then assign player win rank
        if (this.gameState.players[player].cards.length === 0) {
          // player won
          this.gameState.players[player].winRank = this.winRank;
          this.winRank = this.winRank + 1;
        }

        // set next active player
        const nextActivePlayer = this.setNextActivePlayer(player);

        // check if game is over -> if second to last place has already been assigned
        if (this.winRank === 4) {
          this.gameState.players[nextActivePlayer].winRank = this.winRank;
          // disable players area
          this.freezePlayersArea();
        }
      }
    },
    setNextActivePlayer(curPlayer) {
      // console.log('setNextActivePlayer');
      // console.log('current player:');
      // console.log(curPlayer);
      // reset current player turn state
      this.gameState.players[curPlayer].isTurn = false;
      this.gameState.players[curPlayer].isFirstTurn = false;

      // determine next player
      let isNextPlayerActive = false;
      let curNextPlayer = this.getNextPlayer(curPlayer);
      while (!isNextPlayerActive) {
        // console.log('curNextPlayer:');
        // console.log(curNextPlayer);
        // make next player active if
        // 1. next player has not won AND has not passed
        // 2. next player has passed AND we're in a reset state AND there's no other active players in round
        // console.log(`curNextPlayer has NOT passed: ${!this.gameState.players[curNextPlayer].isPassed}`);
        // console.log(`curNextPlayer has NOT won: ${!this.gameState.players[curNextPlayer].winRank}`);
        if ((!this.gameState.players[curNextPlayer].winRank && !this.gameState.players[curNextPlayer].isPassed) ||
          (this.gameState.players[curNextPlayer].isPassed && this.shouldResetPlayersState() &&
            !this.isOtherPlayersInRound())) {
          isNextPlayerActive = true;
        } else {
          curNextPlayer = this.getNextPlayer(curNextPlayer);
        }
      }
      // console.log('final next player:');
      // console.log(curNextPlayer);
      this.gameState.players[curNextPlayer].isTurn = true;
      return curNextPlayer;
    },
    canPlayHand(player) {
      // if not player's turn
      if (!this.gameState.players[player].isTurn) {
        return false;
      }

      // check if valid hand
      const playerSelectedHand = this.gameState.players[player].selectedHand;
      const isFirstHand = this.gameState.players[player].isFirstTurn;

      return handUtils.isValidHand(playerSelectedHand, isFirstHand);
    },
    getNextPlayer(curPlayer) {
      // returns the next player in the sequence
      let nextPlayerId = parseInt(curPlayer[curPlayer.length - 1], 10) + 1;
      nextPlayerId = nextPlayerId > 4 ? '1' : nextPlayerId.toString();
      const nextPlayer = `player${nextPlayerId}`;

      return nextPlayer;
    },
    shouldResetPlayersState() {
      // console.log('shouldResetPlayersState()');
      // get total active players ()
      let activePlayers = 0;
      Object.keys(this.gameState.players).forEach((player) => {
        if (!this.gameState.players[player].winRank ||
          (this.gameState.players[player].winRank && this.gameState.active.playerId === player)) {
          activePlayers += 1;
        }
      });

      // console.log('passCounter');
      // console.log(this.passCounter);
      // console.log('activePlayers');
      // console.log(activePlayers);

      return this.passCounter === activePlayers - 1 || false;
    },
    isOtherPlayersInRound() {
      // console.log('isOtherPlayersInRound()');
      // checks if other players who have NOT won are still in the round
      // default case - no other active players are in round
      let otherPlayersStillInRound = false;
      // eslint-disable-next-line consistent-return
      Object.keys(this.gameState.players).forEach((player) => {
        if (!this.gameState.players[player].winRank &&
          !this.gameState.players[player].isPassed) {
          // console.log(`player:${player}`);
          // console.log(this.gameState.players[player].winRank);
          // console.log(this.gameState.players[player].isPassed);
          otherPlayersStillInRound = true;
        }
      });

      // console.log(`return otherPlayersStillInRound: ${otherPlayersStillInRound}`);
      return otherPlayersStillInRound;
    },
    resetPlayersState() {
      console.log('resetPlayersState()');
      console.log(this.gameState.players);
      // console.log('*****');
      // reset players game state
      Object.assign(this.gameState.players, this.defaultPlayersState);
      console.log(this.gameState.players);
    },
    resetGame() {
      // reset the game
      this.gameState = this.defaultGameState;
      this.initializeGame();
    },
    freezePlayersArea() {
      // freezes the players play area
      Object.keys(this.gameState.players).forEach((player) => {
        this.gameState.players[player].isTurn = false;
      });
    },
    minimizeCards(n) {
      // reduce every players cards to n cards each
      Object.keys(this.gameState.players).forEach((player) => {
        this.gameState.players[player].cards = this.gameState.players[player].cards.slice(0, n);
      });
    }
  },

  components: {
    Card
  },

  computed: {
    ...mapGetters({
      users: 'users'
    }),
    defaultPlayersState() {
      return {
        player1: {
          cards: this.gameState.players.player1.cards,
          isTurn: this.gameState.players.player1.isTurn,
          isFirstTurn: false,
          selectedHand: [],
          canPlayHand: false, // result of evaulating selectedHand,
          isPassed: false,
          winRank: this.gameState.players.player1.winRank || undefined
        },
        player2: {
          cards: this.gameState.players.player2.cards,
          isTurn: this.gameState.players.player2.isTurn,
          isFirstTurn: false,
          selectedHand: [],
          canPlayHand: false, // result of evaulating selectedHand
          isPassed: false,
          winRank: this.gameState.players.player2.winRank || undefined
        },
        player3: {
          cards: this.gameState.players.player3.cards,
          isTurn: this.gameState.players.player3.isTurn,
          isFirstTurn: false,
          selectedHand: [],
          canPlayHand: false, // result of evaulating selectedHand
          isPassed: false,
          winRank: this.gameState.players.player3.winRank || undefined
        },
        player4: {
          cards: this.gameState.players.player4.cards,
          isTurn: this.gameState.players.player4.isTurn,
          isFirstTurn: false,
          selectedHand: [],
          canPlayHand: false, // result of evaulating selectedHand
          isPassed: false,
          winRank: this.gameState.players.player4.winRank || undefined
        }
      };
    },

    defaultGameState() {
      return {
        players: {
          player1: {
            cards: [],
            isTurn: false,
            isFirstTurn: false,
            selectedHand: [],
            canPlayHand: false, // result of evaulating selectedHand,
            isPassed: false,
            winRank: undefined
          },
          player2: {
            cards: [],
            isTurn: false,
            isFirstTurn: false,
            selectedHand: [],
            canPlayHand: false, // result of evaulating selectedHand
            isPassed: false,
            winRank: undefined
          },
          player3: {
            cards: [],
            isTurn: false,
            isFirstTurn: false,
            selectedHand: [],
            canPlayHand: false, // result of evaulating selectedHand
            isPassed: false,
            winRank: undefined
          },
          player4: {
            cards: [],
            isTurn: false,
            isFirstTurn: false,
            selectedHand: [],
            canPlayHand: false, // result of evaulating selectedHand
            isPassed: false,
            winRank: undefined
          }
        },
        // prob can move to Store
        gameStart: false,
        active: {
          playerId: null,
          hand: [], // list of cards
          passCounter: 0
        }
      };
    }
  },

  watch: {
    passCounter(newPC) {
      if (newPC) {
        // console.log('new PC');
        // console.log(newPC);
        if (this.shouldResetPlayersState()) {
          // keep curent state and rset othe rplayers state
          const curPlayer = this.gameState.active.playerId;
          const curPlayerGameState = this.gameState.players[curPlayer];
          this.resetPlayersState();
          // apply cur player state
          this.gameState.players[curPlayer] = curPlayerGameState;
          // reset pass counter
          this.passCounter = 0;
          // reset active
          this.gameState.active.hand = [];
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  text-align: left;
  margin-left: 137px;
  margin-bottom: 15px;
}

.hand {
  width: 1000px;
  height: 110px;
  margin-left: 152px;
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

.inRound {
  color: #1BBC9B;
}

.passed {
  color: #CF000F;
}
</style>
