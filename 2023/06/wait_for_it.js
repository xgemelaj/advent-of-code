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

function resolveRaces(times, distances) {
  let globalWinCounter = 1

  for(let index = 0; index < times.length; index++) {
    let firstRaceWinIndex = undefined
    const time = times[index]
    const distance = distances[index]

    for(let testHoldTime = 1; testHoldTime < time; testHoldTime++) {
      const finalDistance = testHoldTime * (time - testHoldTime)
      if(finalDistance > distance) {
        firstRaceWinIndex = testHoldTime
        break
      }
    }

    const finalWinCounter = (time + 1) - (2 * firstRaceWinIndex)
    // console.log(`Race ${index} WinIndex ${firstRaceWinIndex} WinCounter ${finalWinCounter}`)
    globalWinCounter = globalWinCounter * finalWinCounter
  }

  return globalWinCounter
}

async function resolvePart1(fileName) {
  const [timeLine, distanceLine] = readFileByLines(fileName)

  const times = parseStringToIntegers(timeLine.split(':')[1])
  const distances = parseStringToIntegers(distanceLine.split(':')[1])

  const globalWinCounter = resolveRaces(times, distances)

  console.log(`For file name ${fileName} win counter is ${globalWinCounter}`);
}

async function resolvePart2(fileName) {
  const [timeLine, distanceLine] = readFileByLines(fileName)

  const times = parseStringToIntegers(timeLine.split(':')[1].replaceAll(' ', ''))
  const distances = parseStringToIntegers(distanceLine.split(':')[1].replaceAll(' ', ''))

  const globalWinCounter = resolveRaces(times, distances)

  console.log(`For file name ${fileName} win counter is ${globalWinCounter}`);
}

resolvePart1('input');
resolvePart2('input');
