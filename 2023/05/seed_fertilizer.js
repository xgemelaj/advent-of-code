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

async function resolverPart1(fileName) {
  let linesArray = readFileByLines(fileName)
  const seeds = parseStringToIntegers(linesArray[0].split(':')[1])
  let resultArray = seeds
  let mappedSeeds = undefined
  linesArray = linesArray.slice(1)

  for (let lineIndex = 0; lineIndex < linesArray.length; lineIndex++) {
    const line = linesArray[lineIndex]
    if (line === '\r') {
      // When finding empty line then do remap
      if(mappedSeeds !== undefined) {
        // Fill missing ones
        resultArray = Object.values(mappedSeeds)
      }
      // Skip next string line
      mappedSeeds = Object.fromEntries(resultArray.map(i => [i, i]))
      lineIndex++
    }
    else {
      const [destRangeStart, sourceRangeStart, rangeLength] = parseStringToIntegers(line)
      const endRange = sourceRangeStart + rangeLength

      for(const result of resultArray) {
        if (result >= sourceRangeStart && result < endRange) {
          mappedSeeds[result] = destRangeStart + (result-sourceRangeStart)
        }
      }
    }
  }

  resultArray = Object.values(mappedSeeds)

  console.log(`For file name ${fileName} => locations are: ${resultArray} and min is: ${Math.min(...resultArray)}`);
}

resolverPart1('input_1');
// resolverPart2('input_2');