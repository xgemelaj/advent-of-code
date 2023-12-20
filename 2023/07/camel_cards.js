const fs = require('fs');

function readFileByLines (fileName) {
  let text = fs.readFileSync(`${fileName}.txt`, 'utf-8');
  return text.split('\n');
}

const cardMatchMapper = {
  '5_kind': 6,
  '4_kind': 5,
  'full_house': 4,
  '3_kind': 3,
  '2_pair': 2,
  '1_pair': 1,
  'high_card': 0
}

function getCardValueMapper() { 
  return{
    "A": 13, 
    "K": 12, 
    "Q": 11, 
    "J": 10, 
    "T": 9,
    "9": 8,
    "8": 7,
    "7": 6,
    "6": 5,
    "5": 4,
    "4": 3,
    "3": 2,
    "2": 1
  }
}

function getCardMatchValue(maxCount, secondMaxCount) {
  if(maxCount === 5) return cardMatchMapper['5_kind']
  if(maxCount === 4) return cardMatchMapper['4_kind']
  if(maxCount === 3) {
    if(secondMaxCount === 2) return cardMatchMapper['full_house']
    else return cardMatchMapper['3_kind']
  }
  if(maxCount === 2) {
    if(secondMaxCount === 2) return cardMatchMapper['2_pair']
    else return cardMatchMapper['1_pair']
  }

  return cardMatchMapper['high_card']
}

function calculateCardMatch(cards, wildcard) {
  const cardsMatched = {}
  let wildcardBonus = 0
  
  for(const card of cards) {
    if(cardsMatched[card] === undefined) cardsMatched[card] = 1
    else cardsMatched[card] = cardsMatched[card] + 1
  }

  if(wildcard !== undefined && cardsMatched[wildcard] !== undefined) {
    wildcardBonus = cardsMatched[wildcard]
    cardsMatched[wildcard] = 0
  }

  const matchedCounts = Object.values(cardsMatched).sort( function(a,b) { return b-a } )
  const maxCount = matchedCounts[0]
  const secondMaxCount = matchedCounts[1]

  return getCardMatchValue(maxCount + wildcardBonus, secondMaxCount)
}

function sortProcessedHands(hand1, hand2, cardValueMapper) {
  if(hand2.cardMatch !== hand1.cardMatch) return hand2.cardMatch-hand1.cardMatch

  for(let cardIndex = 0; cardIndex< hand2.cards.length; cardIndex++) {
    if(hand2.cards[cardIndex] !== hand1.cards[cardIndex]) 
      return cardValueMapper[hand2.cards[cardIndex]] - cardValueMapper[hand1.cards[cardIndex]]
  }
}

function getTotalWinnings(processedHands, cardValueMapper) {
  const sortedHands = processedHands.sort((hand1, hand2) => sortProcessedHands(hand1, hand2, cardValueMapper))
  let totalWinnings = 0
  for(let sortedHandIndex = 0; sortedHandIndex < sortedHands.length; sortedHandIndex++) {
    const sortedHand = sortedHands[sortedHandIndex]
    const rankingMultiplier = sortedHands.length - sortedHandIndex
    totalWinnings = totalWinnings + (sortedHand.bid * rankingMultiplier)
  }

  return totalWinnings
}


async function resolver(fileName, wildcard) {
  const handLines = readFileByLines(fileName)

  const cardValueMapper = getCardValueMapper()
  cardValueMapper[wildcard] = 0
  const processedHands = []
  for(const handLine of handLines) {
    const [cards, bid] = handLine.split(' ')
    processedHands.push({ cards, bid: parseInt(bid), cardMatch: calculateCardMatch(cards, wildcard) })
  }
  
  let totalWinnings = getTotalWinnings(processedHands, cardValueMapper)
  
  console.log(`For file name ${fileName} total winnings points is ${totalWinnings}`);
}

resolver('input', undefined);
resolver('input', 'J');