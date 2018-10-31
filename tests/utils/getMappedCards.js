
import _ from 'lodash'
import { CardMap } from '../../src/Constants/CardMap'

// returns a collection of cards mapped from list of card names
// i.e. cardsNameList = ['4s', '7S', etc...]
function getMappedCards (cardsNameList) {
  const CardMapCards = _.values(CardMap)
  const CardMapGroupedByName = _.groupBy(CardMapCards, 'name')

  return cardsNameList.map(cardName => CardMapGroupedByName[cardName][0])
}

module.exports = { getMappedCards }
