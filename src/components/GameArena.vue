<template>
  <div id="game-arena">
    <!-- active hands area -->
    <template v-if="gameState.active.hand.length > 0">
      <div id="active-hand-container">
        <div class="activePlayerContainer">
          {{ gameState.active.playerId }}
        </div>
        <div class="hand">
          <div v-for="(card, index) in gameState.active.hand" :key="card.rank">
            <card :cardMapKey="parseInt(card.cardKey)" :card-hand-index="index"></card>
          </div>
        </div>
      </div>
    </template>
    <!-- end active hand -->

    <div id="player1" :style="getPlayerHandStyleObject(1)">
      <h3 style="position: relative; top: 200px;">
        <span :class="{activePlayer: isActivePlayer('player1')}">{{ gameState.players.player1.profile.username }}</span>
        <button @click="submitHand('player1')" :disabled="!canPlayHand('player1')">Play hand</button>
        <button @click="pass('player1')" :disabled="!canPass('player1')">Pass</button>
        <span v-if="gameState.players.player1.isPassed" class="passed">Passed</span>
        <span v-else class="inRound">In Round</span>
        <span v-if="gameState.players.player1.winRank">Win Rank: {{ gameState.players.player1.winRank }}</span>
        <span v-if="gameState.players.player1.profile.isFake && gameState.players.player1.profile.isThinking">
          <i class="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
        </span>
        Player 1
      </h3>
      <div class="hand">
        <template v-for="(card, index) in gameState.players.player1.cards">
          <div @click="cardClickHandler('player1', index)" :key="card.rank">
            <card
              :cardMapKey="parseInt(card.cardKey)"
              :is-selected="card.isSelected"
              :card-hand-index="index"
              :player-id="1">
            </card>
          </div>
        </template>
      </div>
    </div>

    <div id="player2" :style="getPlayerHandStyleObject(2)">
      <h3 style="position: relative; left: 87px; bottom: 110px;">
        <span :class="{activePlayer: isActivePlayer('player2')}">{{ gameState.players.player2.profile.username }}</span>
        <button @click="submitHand('player2')" :disabled="!canPlayHand('player2')">Play hand</button>
        <button @click="pass('player2')" :disabled="!canPass('player2')">Pass</button>
        <span v-if="gameState.players.player2.isPassed" class="passed">Passed</span>
        <span v-else class="inRound">In Round</span>
        <span v-if="gameState.players.player2.winRank">Win Rank: {{ gameState.players.player2.winRank }}</span>
        <span v-if="gameState.players.player2.profile.isFake && gameState.players.player2.profile.isThinking">
          <i class="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
        </span>
        Player 2
      </h3>
      <div class="hand">
        <template v-for="(card, index) in gameState.players.player2.cards">
          <div @click="cardClickHandler('player2', index)" :key="card.rank">
            <card
              :cardMapKey="parseInt(card.cardKey)"
              :is-selected="card.isSelected"
              :card-hand-index="index"
              :player-id="2">
            </card>
          </div>
        </template>
      </div>
    </div>

    <div id="player3" :style="getPlayerHandStyleObject(3)">
      <h3>
        <span :class="{activePlayer: isActivePlayer('player3')}">{{ gameState.players.player3.profile.username }}</span>
        <button @click="submitHand('player3')" :disabled="!canPlayHand('player3')">Play hand</button>
        <button @click="pass('player3')" :disabled="!canPass('player3')">Pass</button>
        <span v-if="gameState.players.player3.isPassed" class="passed">Passed</span>
        <span v-else class="inRound">In Round</span>
        <span v-if="gameState.players.player3.winRank">Win Rank: {{ gameState.players.player3.winRank }}</span>
        <span v-if="gameState.players.player3.profile.isFake && gameState.players.player3.profile.isThinking">
          <i class="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
        </span>
        Player 3
      </h3>
      <div class="hand">
        <template v-for="(card, index) in gameState.players.player3.cards">
          <div @click="cardClickHandler('player3', index)" :key="card.rank">
            <card
              :cardMapKey="parseInt(card.cardKey)"
              :is-selected="card.isSelected"
              :card-hand-index="index"
              :player-id="3">
            </card>
          </div>
        </template>
      </div>
    </div>

    <div id="player4" :style="getPlayerHandStyleObject(4)">
      <div style="position: relative; right: 120px;">
        <span :class="{activePlayer: isActivePlayer('player4')}">{{ gameState.players.player4.profile.username }}</span><br />
        <button @click="submitHand('player4')" :disabled="!canPlayHand('player4')">Play hand</button><br />
        <button @click="pass('player4')" :disabled="!canPass('player4')">Pass</button><br />
        <span v-if="gameState.players.player4.isPassed" class="passed">Passed</span>
        <span v-else class="inRound">In Round</span><br />
        <span v-if="gameState.players.player4.winRank">Win Rank: {{ gameState.players.player4.winRank }}</span><br />
        <span v-if="gameState.players.player4.profile.isFake && gameState.players.player4.profile.isThinking"><br />
          <i class="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
        </span><br />
        Player 4
      </div>
      <div class="hand">
        <template v-for="(card, index) in gameState.players.player4.cards">
          <div @click="cardClickHandler('player4', index)" :key="card.rank">
            <card
              :cardMapKey="parseInt(card.cardKey)"
              :is-selected="card.isSelected"
              :card-hand-index="index"
              :player-id="4">
            </card>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import Card from './Card.vue';
import Deck from '../Classes/deck';
import handUtils from '../utils/handUtils';
import cardsUtils from '../utils/cardsUtils';

const GAME_ARENA_WIDTH = 1200;
const GAME_ARENA_HEIGHT = 600;
const CARD_WIDTH = 76;
const CARD_DELTA = 30;

export default {
  mounted() {
    // fetch fake users from data store queue
    this.getAllUsers().then(() => {
      this.initializeGame();
    });
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
            winRank: undefined,
            profile: {
              userId: '',
              username: '',
              isFake: false,
              isThinking: false
            }
          },
          player2: {
            cards: [],
            isTurn: false,
            isFirstTurn: false,
            selectedHand: [],
            canPlayHand: false, // result of evaulating selectedHand
            isPassed: false,
            winRank: undefined,
            profile: {
              userId: '',
              username: '',
              isFake: false,
              isThinking: false
            }
          },
          player3: {
            cards: [],
            isTurn: false,
            isFirstTurn: false,
            selectedHand: [],
            canPlayHand: false, // result of evaulating selectedHand
            isPassed: false,
            winRank: undefined,
            profile: {
              userId: '',
              username: '',
              isFake: false,
              isThinking: false
            }
          },
          player4: {
            cards: [],
            isTurn: false,
            isFirstTurn: false,
            selectedHand: [],
            canPlayHand: false, // result of evaulating selectedHand
            isPassed: false,
            winRank: undefined,
            profile: {
              userId: '',
              username: '',
              isFake: false,
              isThinking: false
            }
          }
        },
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
    ...mapActions(['getAllUsers']),

    initializeGame() {
      // generate deck
      const deck = new Deck();

      // deal cards to players
      this.dealCards(deck);

      // sort players cards'
      this.sortByRank();

      // bug fixing - reduce to n cards
      // this.minimizeCards(2);

      // TODO: initialize real player and fake players
      this.initializePlayers();
    },
    initializePlayers() {
      // determine who goes first
      const firstTurnPlayer = this.setFirstTurnPlayer();

      // set player 1 to be real player
      this.gameState.players.player1.profile.userId = '1';
      this.gameState.players.player1.profile.username = 'YOU';

      // set fake players profile
      const fakeUsers = _.cloneDeep(this.fakeUsers);
      Object.keys(this.gameState.players).forEach((player) => {
        if (player !== 'player1') {
          const fakeUser = fakeUsers.shift();
          this.gameState.players[player].profile = fakeUser;
        }
      });

      // if firstTurnPlayer is AI, then hand control over to AI
      if (this.gameState.players[firstTurnPlayer].profile.isFake) {
        this.aiController(firstTurnPlayer, true);
      }
    },
    setFirstTurnPlayer() {
      // player with 3S goes first
      const targetRank = 1; // 3S

      // find player with 3S
      let playerFound = null;
      Object.keys(this.gameState.players).forEach((player) => {
        if (_.find(this.gameState.players[player].cards, ['rank', targetRank])) {
          playerFound = player;
        }
      });

      // assign found player to go first
      this.gameState.players[playerFound].isTurn = true;
      this.gameState.players[playerFound].isFirstTurn = true;
      this.gameState.active.playerId = playerFound;

      return playerFound;
    },
    dealCards(deck) {
      this.gameState.players.player1.cards = deck.deck.slice(0, 13);
      this.gameState.players.player2.cards = deck.deck.slice(13, 26);
      this.gameState.players.player3.cards = deck.deck.slice(26, 39);
      this.gameState.players.player4.cards = deck.deck.slice(39, 52);
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
    freezePlayersArea() {
      // freezes the players play area
      Object.keys(this.gameState.players).forEach((player) => {
        this.gameState.players[player].isTurn = false;
      });
    },

    // AI controller
    aiController(curAIplayer, isFirstTurn) {
      // TODO: add loaders to make illusion that AI is thinking
      this.gameState.players[curAIplayer].profile.isThinking = true;

      const LATENCY_TURN = 4000;
      const LATENCY_DECISION = 500;

      // const curAIplayerUsername = this.gameState.players[curAIplayer].profile.username;
      const playerCards = _.cloneDeep(this.gameState.players[curAIplayer].cards);
      // determine AI player selected hand
      let handToPlay = null;

      if (isFirstTurn) {
        // should play 3S
        handToPlay = cardsUtils.getLowestHand(playerCards);
      } else {
        const activeHand = _.cloneDeep(this.gameState.active.hand);

        /*
        STRATEGY ->
          If AI is not leading the round, then play highest hand
          ... else, AI is leading the round so play lowest hand
        */
        const isLeadingRound = this.shouldResetPlayersState;
        if (isLeadingRound) {
          // leading round
          handToPlay = cardsUtils.getLowestHand(playerCards);
        } else {
          // not leading round, so try to get higher hand
          handToPlay = cardsUtils.getHigherHand(activeHand, playerCards);
        }
      }

      if (handToPlay.length > 0) {
        setTimeout(() => {
          // may be unecessary, but set ai player selected hand animations
          handToPlay.forEach((cardIndex) => {
            this.gameState.players[curAIplayer].cards[cardIndex].isSelected = true;
          });
          setTimeout(() => {
            this.gameState.players[curAIplayer].profile.isThinking = false;
            // prep selectedHand and submit hand
            const realHandToPlay = _.map(handToPlay, cardIndex => playerCards[cardIndex]);
            this.gameState.players[curAIplayer].selectedHand = realHandToPlay;
            this.submitHand(curAIplayer);
          }, LATENCY_DECISION);
        }, LATENCY_TURN);
      } else {
        // try to pass
        setTimeout(() => {
          this.gameState.players[curAIplayer].profile.isThinking = false;
          this.pass(curAIplayer);
        }, LATENCY_TURN);
      }
    },

    // handlers - players actions
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
    submitHand(player) {
      // get player selected hand state
      const players = this.gameState.players;
      const playerSelectedHand = players[player].selectedHand;
      const activeHand = this.gameState.active.hand;
      const isFirstHand = players[player].isFirstTurn;

      // player can submit hand if starting round, or has a hand that can beat active hand
      if (handUtils.canBeatHand(playerSelectedHand, activeHand) || isFirstHand ||
        activeHand.length === 0) {
        // set game state active
        this.gameState.active.hand = playerSelectedHand;
        this.gameState.active.playerId = player;

        // removed played cards from player
        players[player].cards = _.filter(players[player].cards, ['isSelected', false]);

        // if player has no more cards, then assign player win rank
        if (players[player].cards.length === 0) {
          // player won
          players[player].winRank = this.winRank;
          this.winRank = this.winRank + 1;
        }

        // set next active player
        const nextActivePlayer = this.setNextActivePlayer(player);

        // check if game is over -> if second to last place has already been assigned
        const isGameOver = this.winRank === 4 || false;
        if (isGameOver) {
          players[nextActivePlayer].winRank = this.winRank;
          // disable players area
          this.freezePlayersArea();
        }

        // control player if next player is AI
        if (!isGameOver && players[nextActivePlayer].profile.isFake) {
          this.aiController(nextActivePlayer);
        }
      }
    },
    pass(player) {
      this.gameState.players[player].isPassed = true;
      this.passCounter = this.passCounter + 1;
      const nextActivePlayer = this.setNextActivePlayer(player);

      // invoke ai controller if next player is AI
      if (this.gameState.players[nextActivePlayer].profile.isFake) {
        this.aiController(nextActivePlayer);
      }
    },

    // each player computed props
    canPass(player) {
      // player can only pass if it is their turn and there are active hands

      return this.gameState.players[player].isTurn && this.gameState.active.hand.length > 0;
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
    isActivePlayer(player) {
      return this.gameState.players[player].isTurn || false;
    },

    setNextActivePlayer(curPlayer) {
      // reset current player turn state
      this.gameState.players[curPlayer].isTurn = false;
      this.gameState.players[curPlayer].isFirstTurn = false;

      // determine next player
      let isNextPlayerActive = false;
      let curNextPlayer = this.getNextPlayer(curPlayer);
      while (!isNextPlayerActive) {
        // make next player active if
        // 1. next player has not won AND has not passed
        // 2. next player has passed AND we're in a reset state AND there's no other active players in round
        if ((!this.gameState.players[curNextPlayer].winRank && !this.gameState.players[curNextPlayer].isPassed) ||
          (this.gameState.players[curNextPlayer].isPassed && this.shouldResetPlayersState &&
            !this.isOtherPlayersInRound)) {
          isNextPlayerActive = true;
        } else {
          curNextPlayer = this.getNextPlayer(curNextPlayer);
        }
      }
      this.gameState.players[curNextPlayer].isTurn = true;
      return curNextPlayer;
    },

    // helper functions
    getNextPlayer(curPlayer) {
      // returns the next player in the sequence
      let nextPlayerId = parseInt(curPlayer[curPlayer.length - 1], 10) + 1;
      nextPlayerId = nextPlayerId > 4 ? '1' : nextPlayerId.toString();
      const nextPlayer = `player${nextPlayerId}`;

      return nextPlayer;
    },
    minimizeCards(n) {
      // helper debug method to reduce every players cards to n cards each
      Object.keys(this.gameState.players).forEach((player) => {
        this.gameState.players[player].cards = this.gameState.players[player].cards.slice(0, n);
      });
    },
    getPlayerHandStyleObject(player) {
      // approximation of length of hand with cards
      // const halfOfHand = HAND_WIDTH / 6.5;
      const handWidth = (13 * CARD_WIDTH) - (13 * (CARD_WIDTH - CARD_DELTA));
      const playerControlsHeight = 60;

      // const isEvenPlayer = player % 2 === 0;

      const map = {
        1: {
          left: (GAME_ARENA_WIDTH - handWidth) / 2,
          top: (GAME_ARENA_HEIGHT / 2) + playerControlsHeight
        },
        2: {
          left: GAME_ARENA_WIDTH * (7 / 8),
          top: handWidth + 12
        },
        3: {
          left: (GAME_ARENA_WIDTH - handWidth) / 2,
          top: 0
        },
        4: {
          left: GAME_ARENA_WIDTH / 8,
          top: 100
        }
      };

      // default is odd number players
      // const left = isEvenPlayer ? width * (3 / 4) : (width / 2) - halfOfHand;

      // const top = isEvenPlayer ? height / 2 : (height / 3);

      return {
        position: 'absolute', // can move to a class
        left: `${map[player].left}px`,
        top: `${map[player].top}px`
      };
    }
  },

  components: {
    Card
  },

  computed: {
    ...mapGetters({
      fakeUsers: 'users'
    }),

    shouldResetPlayersState() {
      // get total active players ()
      let activePlayers = 0;
      Object.keys(this.gameState.players).forEach((player) => {
        if (!this.gameState.players[player].winRank ||
          (this.gameState.players[player].winRank && this.gameState.active.playerId === player)) {
          activePlayers += 1;
        }
      });

      return this.passCounter === activePlayers - 1 || false;
    },

    isOtherPlayersInRound() {
      // checks if other players who have NOT won are still in the round
      // default case - no other active players are in round
      let otherPlayersStillInRound = false;
      // eslint-disable-next-line consistent-return
      Object.keys(this.gameState.players).forEach((player) => {
        if (!this.gameState.players[player].winRank &&
          !this.gameState.players[player].isPassed) {
          otherPlayersStillInRound = true;
        }
      });

      return otherPlayersStillInRound;
    }
  },

  watch: {
    passCounter(newPC) {
      if (newPC) {
        if (this.shouldResetPlayersState) {
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

<style scoped>
/* h3 {
  text-align: left;
  margin-left: 137px;
  margin-bottom: 15px;
} */

#game-arena {
  position: relative;
  width: 1200px;
  height: 600px;
  /* border: 1px solid blue; */
  margin: auto;
}

#active-hand-container {
  width: 400px;
  position: relative;
  /* left: 450px; */
  top: 215px;
  border: 1px solid blue;
  margin: auto;
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

