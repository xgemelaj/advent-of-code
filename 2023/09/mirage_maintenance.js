const fs = require('fs');

function readFileByLines (fileName) {
  let text = fs.readFileSync(`${fileName}.txt`, 'utf-8');
  return text.split('\n');
}

function parseStringToIntegers (numbersString) {
  const numberArray = []

  const separatedNumbersString = numbersString.split(' ')
  for (const numberString of separatedNumbersString) {
    if (!isNaN(parseInt(numberString))) numberArray.push(parseInt(numberString))
  }

  return numberArray
}

function createExtrapolateDictionary(splittedHistory) {
  const extrapolateDictionary = { 0: splittedHistory }
  let extrapolateIndex = 0

  // Create extrapolate dictionary level by level
  while(extrapolateDictionary[extrapolateIndex].find(item => item !== 0)) {
    const newExtrapolateLevel = []

    for(let index = 1;  index < extrapolateDictionary[extrapolateIndex].length; index++) {
      newExtrapolateLevel.push(extrapolateDictionary[extrapolateIndex][index] - extrapolateDictionary[extrapolateIndex][index - 1])
    }

    extrapolateIndex++
    extrapolateDictionary[extrapolateIndex] = newExtrapolateLevel
  }

  return extrapolateDictionary
}

function calculateNextItem(extrapolateDictionary) {
  let historySum = 0
  let extrapolateIndex = Object.keys(extrapolateDictionary).length - 1

  // Count sum of last items in reverse
  while(extrapolateIndex >= 0) {
    const lastItemIndex = extrapolateDictionary[extrapolateIndex].length - 1
    historySum = historySum + extrapolateDictionary[extrapolateIndex][lastItemIndex]
    extrapolateIndex--
  }

  return historySum
}

function calculatePreviousItem(extrapolateDictionary) {
  let historySum = 0
  let extrapolateIndex = Object.keys(extrapolateDictionary).length - 1

  // Count difference of first items in reverse
  while(extrapolateIndex >= 0) {
    historySum = extrapolateDictionary[extrapolateIndex][0] - historySum
    extrapolateIndex--
  }

  return historySum
}

async function resolverPart1(fileName) {
  const histories = readFileByLines(fileName)
  let historyNextValuesSum = 0

  for(const history of histories) {
    const splittedHistory = parseStringToIntegers(history)
    const extrapolateDictionary = createExtrapolateDictionary(splittedHistory)
    historyNextValuesSum = historyNextValuesSum + calculateNextItem(extrapolateDictionary) 
  }

   console.log(`For file name ${fileName} total counter is ${historyNextValuesSum}`);
}

async function resolverPart2(fileName) {
  const histories = readFileByLines(fileName)
  let historyNextValuesSum = 0

  for(const history of histories) {
    const splittedHistory = parseStringToIntegers(history)
    const extrapolateDictionary = createExtrapolateDictionary(splittedHistory)
    historyNextValuesSum = historyNextValuesSum + calculatePreviousItem(extrapolateDictionary) 
  }

   console.log(`For file name ${fileName} total counter is ${historyNextValuesSum}`);
}

resolverPart1('input');
resolverPart2('input');