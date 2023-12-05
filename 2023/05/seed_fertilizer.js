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

// function createAllLevelsMapper(linesArray) {
//   let allLevelMappers = [[1, 1, Number.MAX_SAFE_INTEGER]]
//   let currentLevelMapper = undefined


//   linesArray = linesArray.slice(1)

//   for (let lineIndex = 0; lineIndex < linesArray.length; lineIndex++) {
//     const line = linesArray[lineIndex]
//     // Empty line means new mapping will begin
//     if (line === '\r' || line === '') {
//       // if(currentLevelMapper !== undefined) {
//       //   // Saved result after remapping
//       //   allLevelMapper = currentLevelMapper
//       // }

//       // TODO
//       // mappedSeeds = Object.fromEntries(resultArray.map(i => [i, i]))
//       lineIndex++
//     }
//     else {
//       const [destRangeStart, sourceRangeStart, rangeLength] = parseStringToIntegers(line)
//       const endRange = sourceRangeStart + rangeLength

//       const newLevelMapper = []
//       for (const allLevelMapper of allLevelMappers) {
//         const [destMapperRangeStart, sourceMapperRangeStart, rangeMapperLength] = allLevelMapper
//         const endMapperRange = sourceMapperRangeStart + rangeMapperLength

//         if (sourceMapperRangeStart <= endRange || endMapperRange >= sourceRangeStart) {
//           // A -> aktualny mapper || N -> novy mapper

//           if ()
//           newLevelMapper.push([destMapperRangeStart, sourceMapperRangeStart ])
//           // A N N A  = result 3 intervaly [destMapperRangeStart
//           // A N A N  = result 3 intervaly
//           // N A N A  = result 3 intervaly
//         } else {
//           newLevelMapper.push([destMapperRangeStart, sourceMapperRangeStart, rangeMapperLength])
//         }

//       }

//       for(const result of resultArray) {
//         if (result >= sourceRangeStart && result < endRange) {
//           mappedSeeds[result] = destRangeStart + (result-sourceRangeStart)
//         }
//       }
//     }
//   }

// }

function resolveSeedFertilizer(linesArray, seeds) {
  let resultArray = seeds
  let mappedSeeds = undefined
  linesArray = linesArray.slice(1)

  // TODO: optimize not going trough all the lines everytime but create one mapper per all levels
  for (let lineIndex = 0; lineIndex < linesArray.length; lineIndex++) {
    const line = linesArray[lineIndex]
    // Empty line means new mapping will begin
    if (line === '\r' || line === '') {
      if(mappedSeeds !== undefined) {
        // Saved result after remapping
        resultArray = Object.values(mappedSeeds)
      }

      // Fill missing ones and skip next description line
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

  return Math.min(...resultArray)
}

async function resolverPart1(fileName) {
  let linesArray = readFileByLines(fileName)
  const seedString = linesArray[0].split(':')[1]

  const seeds = parseStringToIntegers(seedString)
  // const allLevelsMapper = createAllLevelsMapper(linesArray)
  const result = resolveSeedFertilizer(linesArray, seeds)

  console.log(`For file name ${fileName} => min location is: ${result}`);
}

const SEED_MAX_LIMIT = 1000

function resolverPart2(fileName) {
  let overallResult = Number.MAX_SAFE_INTEGER
  let linesArray = readFileByLines(fileName)
  const seedsRange = parseStringToIntegers(linesArray[0].split(':')[1])

  for (let seedsRangeIndex = 0; seedsRangeIndex < seedsRange.length;) {
    let seeds = []
    const seedRangeStart = seedsRange[seedsRangeIndex]
    const seedRangeLength = seedsRange[seedsRangeIndex + 1]
    
    for (let seedsGeneratorIndex = seedRangeStart; seedsGeneratorIndex < seedRangeStart + seedRangeLength; seedsGeneratorIndex++) {
      if(seedsGeneratorIndex % SEED_MAX_LIMIT === 0) {
        const result = resolveSeedFertilizer(linesArray, seeds)
        if(result < overallResult) overallResult = result

        seeds = []
      } else {
        seeds.push(seedsGeneratorIndex)
      }
    }

    if (seeds.length > 0) {
      const result = resolveSeedFertilizer(linesArray, seeds)
      if(result < overallResult) overallResult = result
    }

    seedsRangeIndex = seedsRangeIndex + 2
  }

  console.log(`For file name ${fileName} => min location is: ${overallResult}`);
}

resolverPart1('input_1');
resolverPart2('input_2');