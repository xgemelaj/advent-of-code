const fs = require('fs');

function readFileByLines (fileName) {
  let text = fs.readFileSync(`${fileName}.txt`, 'utf-8');
  return text.split('\n');
}

function parseStringToIntegers (numbersString) {
  const numberArray = []

  const separatedNumbersString = numbersString.split(' ')
  for (const numberString of separatedNumbersString) {
    if (parseInt(numberString)) numberArray.push(parseInt(numberString))
  }

  return numberArray
}

function lineResolver (line) {
  let points = 0
  
  const [cardInfo, numbers] = line.split(': ')
  const [winningNumbersString, selectedNumbersString] = numbers.split('|')

  // TODO: optimize by sorting both arrays
  const winningNumbers = parseStringToIntegers(winningNumbersString)
  const selectedNumbers = parseStringToIntegers(selectedNumbersString)

  for (const winningNumber of winningNumbers) {
    for (const selectedNumber of selectedNumbers) {
      if(winningNumber === selectedNumber) points = points + 1
    }
  }

  // const cardNumber = parseInt(cardInfo.split(' ')[1])
  // console.log(`Card: ${cardNumber} MatchedWinnings: ${points}`);
  return points
}

async function resolverPart1(fileName) {
  const linesArray = readFileByLines(fileName)
  let totalIncreased = 0

  for (const line of linesArray) {
    const linePoints = lineResolver(line)
    if (linePoints !== 0) {
      const linePointsSquared = Math.pow(2, linePoints - 1)
      totalIncreased = totalIncreased + linePointsSquared
    }
  }

  console.log(`For file name ${fileName} => total points: ${totalIncreased}`);
}

async function resolverPart2(fileName) {
  const linesArray = readFileByLines(fileName)
  const cardResults = { }

  for (let lineIndex = 0; lineIndex < linesArray.length; lineIndex++) {
    const line = linesArray[lineIndex]
    const linePoints = lineResolver(line)

    // Insert default card you have
    if (cardResults[lineIndex] === undefined) cardResults[lineIndex] = 1

    // Get how much copies of card you have
    const cardMultiplier = cardResults[lineIndex]

    // Mark new copies for next cards
    for (let cardCopy = 1; cardCopy <= linePoints; cardCopy++) {
      const cardIndexToAdjust = cardCopy + lineIndex
      const cardIndexValue = cardResults[cardIndexToAdjust] === undefined ? 1 : cardResults[cardIndexToAdjust]
      const newCardIndexValue = cardIndexValue + cardMultiplier

      cardResults[cardIndexToAdjust] = newCardIndexValue
    }
  }

  console.log(`For file name ${fileName} => total points: ${Object.values(cardResults).reduce((a, b) => a + b, 0)}`);
}

resolverPart1('input_1');
resolverPart2('input_2');