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

function adjustPoints (points) {
  if(points === 0) return 1

  return points * 2
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
      if(winningNumber === selectedNumber) points = adjustPoints(points)
    }
  }

  // console.log(`Card: ${cardNumber} Points: ${points}`);
  return points
}

async function resolver(fileName) {
  const linesArray = readFileByLines(fileName)
  let totalIncreased = 0

  for (const line of linesArray) {
    totalIncreased = totalIncreased + lineResolver(line)
  }

  console.log(`For file name ${fileName} => total points: ${totalIncreased}`);
}

resolver('input_1');
