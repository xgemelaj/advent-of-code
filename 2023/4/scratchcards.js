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

  const cardNumber = parseInt(cardInfo.split(' ')[1])

  // TODO: optimize by sorting both arrays
  const winningNumbers = parseStringToIntegers(winningNumbersString)
  const selectedNumbers = parseStringToIntegers(selectedNumbersString)

  for (const winningNumber of winningNumbers) {
    for (const selectedNumber of selectedNumbers) {
      if(winningNumber === selectedNumber) points = points + 1
    }
  }

  console.log(`Card: ${cardNumber} MatchedWinnings: ${points}`);
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

resolver('input_1');
