<template>
  <div id="game-arena">
    <!-- active hands area -->
    <template v-if="gameState.active.hand.length > 0">
      <div id="active-hand-container">
        <!-- <div class="activePlayerContainer">
          {{ gameState.active.playerId }}
        </div> -->
        <div class="hand">
          <div v-for="(card, index) in gameState.active.hand" :key="card.rank">
            <card :cardMapKey="parseInt(card.cardKey)" :card-hand-index="index"></card>
          </div>
        </div>
      </div>
    </template>
    <!-- end active hand -->

    <div id="player1" style="position: absolute; left: 32%; bottom: 5%;">
      <div class="hand">
        <template v-for="(card, index) in gameState.players.player1.cards">
          <div @click="cardClickHandler('player1', index)" :key="card.rank">
            <card
              :cardMapKey="parseInt(card.cardKey)"
              :is-selected="card.isSelected"
              :card-hand-index="index"
              :player-id="1"
              :player-profile="gameState.players.player1.profile">
            </card>
          </div>
        </template>
      </div>
    </div>

    <!-- player 1 controls -->
    <div style="position: absolute; right: 0; bottom: 10%;">
      <!-- <span :class="{activePlayer: isActivePlayer('player1')}">{{ gameState.players.player1.profile.username }}</span> -->
      <button @click="submitHand('player1')" :disabled="!canPlayHand('player1')">Play hand</button>
      <button @click="pass('player1')" :disabled="!canPass('player1')">Pass</button>
      <span v-if="gameState.players.player1.isPassed" class="passed">Passed</span>
      <span v-else class="inRound">In Round</span>
      <span v-if="gameState.players.player1.winRank">Win Rank: {{ gameState.players.player1.winRank }}</span>
    </div>

    <div id="player2" style="position: absolute; right: 18%; top: 225px;">
      <div class="hand">
        <template v-for="(card, index) in gameState.players.player2.cards">
          <div @click="cardClickHandler('player2', index)" :key="card.rank">
            <card
              :cardMapKey="parseInt(card.cardKey)"
              :is-selected="card.isSelected"
              :card-hand-index="index"
              :player-id="2"
              :player-profile="gameState.players.player2.profile">
            </card>
          </div>
        </template>
      </div>
    </div>

    <div id="player3" style="position: absolute; left: 500px; top: 0;">
      <div class="hand">
        <template v-for="(card, index) in gameState.players.player3.cards">
          <div @click="cardClickHandler('player3', index)" :key="card.rank">
            <card
              :cardMapKey="parseInt(card.cardKey)"
              :is-selected="card.isSelected"
              :card-hand-index="index"
              :player-id="3"
              :player-profile="gameState.players.player3.profile">
            </card>
          </div>
        </template>
      </div>
    </div>

    <div id="player4" style="position: absolute; left: 166px; top: 225px;">
      <div class="hand">
        <template v-for="(card, index) in gameState.players.player4.cards">
          <div @click="cardClickHandler('player4', index)" :key="card.rank">
            <card
              :cardMapKey="parseInt(card.cardKey)"
              :is-selected="card.isSelected"
              :card-hand-index="index"
              :player-id="4"
              :player-profile="gameState.players.player4.profile">
            </card>
          </div>
        </template>
      </div>
    </div>

    <!-- player avatars -->
    <div id="player1-avatar">
      <avatar
        :name="gameState.players.player1.profile.username"
        :is-active="isActivePlayer('player1')"
        :is-ai="false"
      >
      </avatar>
      <span v-if="gameState.players.player1.isPassed" class="passed">Passed</span>
      <span v-else-if="gameState.active.playerId === 'player1'">Leading Round</span>
      <span v-else class="inRound">In Round</span>
      <span v-if="gameState.players.player1.winRank">Win Rank: {{ gameState.players.player1.winRank }}</span>
    </div>
    <div id="player2-avatar">
      <avatar
        :name="gameState.players.player2.profile.username"
        :is-active="isActivePlayer('player2')"
        :is-thinking="gameState.players.player2.profile.isThinking"
        :player-id="2"
        >
      </avatar>
      <span v-if="gameState.players.player2.isPassed" class="passed">Passed</span>
      <span v-else-if="gameState.active.playerId === 'player2'">Leading Round</span>
      <span v-else class="inRound">In Round</span>
      <span v-if="gameState.players.player2.winRank">Win Rank: {{ gameState.players.player2.winRank }}</span>
    </div>
    <div id="player3-avatar">
      <avatar
        :name="gameState.players.player3.profile.username"
        :is-active="isActivePlayer('player3')"
        :is-thinking="gameState.players.player3.profile.isThinking"
        :player-id="3"
        >
      </avatar>
      <span v-if="gameState.players.player3.isPassed" class="passed">Passed</span>
      <span v-else-if="gameState.active.playerId === 'player3'" class="leadingRound">Leading Round</span>
      <span v-else class="inRound">In Round</span>
      <span v-if="gameState.players.player3.winRank">Win Rank: {{ gameState.players.player3.winRank }}</span>
    </div>
    <div id="player4-avatar">
      <avatar
        :name="gameState.players.player4.profile.username"
        :is-active="isActivePlayer('player4')"
        :is-thinking="gameState.players.player4.profile.isThinking"
        :player-id="4"
        >
      </avatar>
      <span v-if="gameState.players.player4.isPassed" class="passed">Passed</span>
      <span v-else-if="gameState.active.playerId === 'player4'">Leading Round</span>
      <span v-else class="inRound">In Round</span><br />
      <span v-if="gameState.players.player4.winRank">Win Rank: {{ gameState.players.player4.winRank }}</span>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import Card from './Card.vue'
import Avatar from './Avatar.vue'
import Deck from '../Classes/deck'
import handUtils from '../utils/handUtils'
import cardsUtils from '../utils/cardsUtils'

const LATENCY_TURN = 4000
const LATENCY_DECISION = 500

export default {
  components: {
    Card,
    Avatar
  },

  mounted () {
    // fetch fake users from data store queue
    this.getUsers().then(() => {
      this.initializeGame()
    })
  },

  data () {
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
          hand: [] // list of cards
        }
      },
      winRank: 1,
      passCounter: 0
    }
  },

  methods: {
    ...mapActions(['getUsers']),

    initializeGame () {
      // generate deck
      const deck = new Deck()

      // deal cards to players
      this.dealCards(deck)

      // sort players cards'
      this.sortByRank()

      // bug fixing - reduce to n cards
      // this.minimizeCards(2)

      // TODO: initialize real player and fake players
      this.initializePlayers()
    },
    initializePlayers () {
      // determine who goes first
      const firstTurnPlayer = this.setFirstTurnPlayer()

      // set player 1 to be real player
      this.gameState.players.player1.profile.userId = '1'
      this.gameState.players.player1.profile.username = 'YOU'

      // set fake players profile
      const fakeUsers = _.cloneDeep(this.fakeUsers)
      Object.keys(this.gameState.players).forEach((player) => {
        if (player !== 'player1') {
          const fakeUser = fakeUsers.shift()
          this.gameState.players[player].profile = fakeUser
        }
      })

      // if firstTurnPlayer is AI, then hand control over to AI
      if (this.gameState.players[firstTurnPlayer].profile.isFake) {
        this.aiController(firstTurnPlayer, true)
      }
    },
    setFirstTurnPlayer () {
      // player with 3S goes first
      const targetRank = 1 // 3S

      // find player with 3S
      let playerFound = null
      Object.keys(this.gameState.players).forEach((player) => {
        if (_.find(this.gameState.players[player].cards, ['rank', targetRank])) {
          playerFound = player
        }
      })

      // assign found player to go first
      this.gameState.players[playerFound].isTurn = true
      this.gameState.players[playerFound].isFirstTurn = true
      this.gameState.active.playerId = playerFound

      return playerFound
    },
    dealCards (deck) {
      this.gameState.players.player1.cards = deck.deck.slice(0, 13)
      this.gameState.players.player2.cards = deck.deck.slice(13, 26)
      this.gameState.players.player3.cards = deck.deck.slice(26, 39)
      this.gameState.players.player4.cards = deck.deck.slice(39, 52)
    },
    sortByRank () {
      // TODO: move sortByRank to Deck class
      // sort all players cards by rank
      const playersKeys = Object.keys(this.gameState.players)
      playersKeys.forEach((player) => {
        // sort the player's hand
        let hand = this.gameState.players[player].cards
        // sort by rank number
        hand = _.sortBy(hand, card => parseInt(card.rank, 10))
        this.gameState.players[player].cards = hand
      })
    },
    freezePlayersArea () {
      // freezes the players play area
      Object.keys(this.gameState.players).forEach((player) => {
        this.gameState.players[player].isTurn = false
      })
    },

    // AI controller
    aiController (curAIplayer, isFirstTurn) {
      // TODO: add loaders to make illusion that AI is thinking
      this.gameState.players[curAIplayer].profile.isThinking = true

      // const curAIplayerUsername = this.gameState.players[curAIplayer].profile.username
      const playerCards = _.cloneDeep(this.gameState.players[curAIplayer].cards)
      // determine AI player selected hand
      let handToPlay = null

      if (isFirstTurn) {
        // should play 3S
        handToPlay = cardsUtils.getLowestHandWith3S(playerCards)
      } else {
        const activeHand = _.cloneDeep(this.gameState.active.hand)

        /*
        STRATEGY ->
          If AI is not leading the round, then play highest hand
          ... else, AI is leading the round so play lowest hand
        */
        const isLeadingRound = this.shouldResetPlayersState
        if (isLeadingRound) {
          // leading round
          handToPlay = cardsUtils.getLowestHand(playerCards)
        } else {
          // not leading round, so try to get higher hand
          handToPlay = cardsUtils.getHigherHand(activeHand, playerCards)
        }
      }

      if (handToPlay.length > 0) {
        setTimeout(() => {
          // may be unecessary, but set ai player selected hand animations
          handToPlay.forEach((cardIndex) => {
            this.gameState.players[curAIplayer].cards[cardIndex].isSelected = true
          })
          setTimeout(() => {
            this.gameState.players[curAIplayer].profile.isThinking = false
            // prep selectedHand and submit hand
            const realHandToPlay = _.map(handToPlay, cardIndex => playerCards[cardIndex])
            this.gameState.players[curAIplayer].selectedHand = realHandToPlay
            this.submitHand(curAIplayer)
          }, LATENCY_DECISION)
        }, LATENCY_TURN)
      } else {
        // try to pass
        setTimeout(() => {
          this.gameState.players[curAIplayer].profile.isThinking = false
          this.pass(curAIplayer)
        }, LATENCY_TURN)
      }
    },

    // handlers - players actions
    cardClickHandler (player, index) {
      // set isSelected prop on card
      if (this.gameState.players[player].isTurn) {
        // eslint-disable-next-line
        this.gameState.players[player].cards[index].isSelected = !this.gameState.players[player].cards[index].isSelected
      }
      // set player selected hand state
      const playerSelectedHand = _.filter(this.gameState.players[player].cards, 'isSelected')
      this.gameState.players[player].selectedHand = playerSelectedHand
    },
    submitHand (player) {
      // get player selected hand state
      const players = this.gameState.players
      const playerSelectedHand = players[player].selectedHand
      const activeHand = this.gameState.active.hand
      const isFirstHand = players[player].isFirstTurn

      // player can submit hand if starting round, or has a hand that can beat active hand
      if (handUtils.canBeatHand(playerSelectedHand, activeHand) || isFirstHand ||
        activeHand.length === 0) {
        // set game state active
        this.gameState.active.hand = playerSelectedHand
        this.gameState.active.playerId = player

        // removed played cards from player
        players[player].cards = _.filter(players[player].cards, ['isSelected', false])

        // if player has no more cards, then assign player win rank
        if (players[player].cards.length === 0) {
          // player won
          players[player].winRank = this.winRank
          this.winRank = this.winRank + 1
        }

        // set next active player
        const nextActivePlayer = this.setNextActivePlayer(player)

        // check if game is over -> if second to last place has already been assigned
        const isGameOver = this.winRank === 4 || false
        if (isGameOver) {
          console.log('**************GAME OVER!************')
          players[nextActivePlayer].winRank = this.winRank
          // disable players area
          this.freezePlayersArea()
        }

        // control player if next player is AI
        if (!isGameOver && players[nextActivePlayer].profile.isFake) {
          this.aiController(nextActivePlayer)
        }
      }
    },
    pass (player) {
      this.gameState.players[player].isPassed = true
      this.passCounter = this.passCounter + 1
      const nextActivePlayer = this.setNextActivePlayer(player)

      // invoke ai controller if next player is AI
      if (this.gameState.players[nextActivePlayer].profile.isFake) {
        this.aiController(nextActivePlayer)
      }
    },

    // each player computed props
    canPass (player) {
      // player can only pass if it is their turn and there are active hands

      return this.gameState.players[player].isTurn && this.gameState.active.hand.length > 0
    },
    canPlayHand (player) {
      // if not player's turn
      if (!this.gameState.players[player].isTurn) {
        return false
      }

      // check if valid hand
      const playerSelectedHand = this.gameState.players[player].selectedHand
      const isFirstHand = this.gameState.players[player].isFirstTurn

      return handUtils.isValidHand(playerSelectedHand, isFirstHand)
    },
    isActivePlayer (player) {
      return this.gameState.players[player].isTurn || false
    },

    setNextActivePlayer (curPlayer) {
      // reset current player turn state
      this.gameState.players[curPlayer].isTurn = false
      this.gameState.players[curPlayer].isFirstTurn = false

      // determine next player
      let isNextPlayerActive = false
      let curNextPlayer = this.getNextPlayer(curPlayer)
      while (!isNextPlayerActive) {
        // make next player active if
        // 1. next player has not won AND has not passed
        // 2. next player has passed AND we're in a reset state AND there's no other active players in round
        if ((!this.gameState.players[curNextPlayer].winRank && !this.gameState.players[curNextPlayer].isPassed) ||
          (this.gameState.players[curNextPlayer].isPassed && this.shouldResetPlayersState &&
            !this.isOtherPlayersInRound)) {
          isNextPlayerActive = true
        } else {
          curNextPlayer = this.getNextPlayer(curNextPlayer)
        }
      }
      this.gameState.players[curNextPlayer].isTurn = true
      return curNextPlayer
    },

    // helper functions
    getNextPlayer (curPlayer) {
      // returns the next player in the sequence
      let nextPlayerId = parseInt(curPlayer[curPlayer.length - 1], 10) + 1
      nextPlayerId = nextPlayerId > 4 ? '1' : nextPlayerId.toString()
      const nextPlayer = `player${nextPlayerId}`

      return nextPlayer
    },
    minimizeCards (n) {
      // helper debug method to reduce every players cards to n cards each
      Object.keys(this.gameState.players).forEach((player) => {
        this.gameState.players[player].cards = this.gameState.players[player].cards.slice(0, n)
      })
    },
    resetPlayersState () {
      // reset players game state
      Object.assign(this.gameState.players, this.defaultPlayersState)
    }
  },

  computed: {
    ...mapGetters({
      fakeUsers: 'users'
    }),

    shouldResetPlayersState () {
      // get total active players ()
      let activePlayers = 0
      Object.keys(this.gameState.players).forEach((player) => {
        if (!this.gameState.players[player].winRank ||
          (this.gameState.players[player].winRank && this.gameState.active.playerId === player)) {
          activePlayers += 1
        }
      })

      return this.passCounter === activePlayers - 1 || false
    },

    isOtherPlayersInRound () {
      // checks if other players who have NOT won are still in the round
      // default case - no other active players are in round
      let otherPlayersStillInRound = false
      // eslint-disable-next-line consistent-return
      Object.keys(this.gameState.players).forEach((player) => {
        if (!this.gameState.players[player].winRank &&
          !this.gameState.players[player].isPassed) {
          otherPlayersStillInRound = true
        }
      })

      return otherPlayersStillInRound
    },

    defaultPlayersState () {
      return {
        player1: {
          cards: this.gameState.players.player1.cards,
          isTurn: this.gameState.players.player1.isTurn,
          isFirstTurn: false,
          selectedHand: [],
          canPlayHand: false, // result of evaulating selectedHand,
          isPassed: false,
          winRank: this.gameState.players.player1.winRank || undefined,
          profile: this.gameState.players.player1.profile || false
        },
        player2: {
          cards: this.gameState.players.player2.cards,
          isTurn: this.gameState.players.player2.isTurn,
          isFirstTurn: false,
          selectedHand: [],
          canPlayHand: false, // result of evaulating selectedHand
          isPassed: false,
          winRank: this.gameState.players.player2.winRank || undefined,
          profile: this.gameState.players.player2.profile || false
        },
        player3: {
          cards: this.gameState.players.player3.cards,
          isTurn: this.gameState.players.player3.isTurn,
          isFirstTurn: false,
          selectedHand: [],
          canPlayHand: false, // result of evaulating selectedHand
          isPassed: false,
          winRank: this.gameState.players.player3.winRank || undefined,
          profile: this.gameState.players.player3.profile || false
        },
        player4: {
          cards: this.gameState.players.player4.cards,
          isTurn: this.gameState.players.player4.isTurn,
          isFirstTurn: false,
          selectedHand: [],
          canPlayHand: false, // result of evaulating selectedHand
          isPassed: false,
          winRank: this.gameState.players.player4.winRank || undefined,
          profile: this.gameState.players.player4.profile || false
        }
      }
    }
  },

  watch: {
    passCounter (newPC) {
      if (newPC) {
        if (this.shouldResetPlayersState) {
          // keep curent state and rset othe rplayers state
          const curPlayer = this.gameState.active.playerId
          const curPlayerGameState = this.gameState.players[curPlayer]
          this.resetPlayersState()
          // apply cur player state
          this.gameState.players[curPlayer] = curPlayerGameState
          // reset pass counter
          this.passCounter = 0
          // reset active
          this.gameState.active.hand = []
        }
      }
    }
  }
}

</script>

<style lang="sass" scoped>

#game-arena
  position: relative
  width: 1200px
  height: 600px
  margin: auto
  #player1-avatar
    position: absolute
    left: 17%
    bottom: -17%
  #player2-avatar
    position: absolute
    right: -2%
    top: 263px
  #player3-avatar
    position: absolute
    left: 29%
    top: 0
  #player4-avatar
    position: absolute
    left: -6%
    top: 263px
  #active-hand-container
    width: 400px
    position: relative
    top: 280px
    margin: auto
  .passed
    color: #e74c3c
    font-weight: bold
  .inRound
    color: #2ecc71
    font-weight: bold
  .leadingRound
    color: #2980b9
    font-weight: bold

</style>
