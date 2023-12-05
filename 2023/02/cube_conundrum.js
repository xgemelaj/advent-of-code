const fs = require('fs');

function readFileByLines (fileName) {
  let text = fs.readFileSync(`${fileName}.txt`, 'utf-8');
  return text.split('\n');
}

const MAX_RED_CUBES = 12
const MAX_GREEN_CUBES = 13 
const MAX_BLUE_CUBES = 14


function lineResolver (line) {
  let blue = 0
  let red = 0
  let green = 0
  
  const [gameInfo, turnsInfo] = line.split(': ')

  const gameNumber = parseInt(gameInfo.split(' ')[1])
  const turns = turnsInfo.replaceAll(',','').replaceAll('\r','').split('; ')

  console.log(turns)

  for (const turn of turns) {
    const turnBalls = turn.split(' ')
    for (let i = 0; i < turnBalls.length; i = i + 2) {
      const count = parseInt(turnBalls[i])
      const color = turnBalls[i+1].toString()

      switch(color) {
        case 'blue': {
          if (count > blue) blue = count
          break
        }
        case 'red': {
          if (count > red) red = count
          break
        }
        case 'green': {
          if (count > green) green = count
          break
        }
        default: {
          console.log(`'${color}' not matched`)
        }
      }
    }
  }


  return [gameNumber, blue, red, green]
}

async function resolve(fileName) {
  const linesArray = readFileByLines(fileName)
  let totalIncreased = 0
  let multipliedCubes = 0

  for (const line of linesArray) {
    const [gameNumber, blue, red, green] = lineResolver(line)

    const isImpossible = blue > MAX_BLUE_CUBES || red > MAX_RED_CUBES || green > MAX_GREEN_CUBES

    // console.log(`Game ${gameNumber}: B ${blue} // R ${red} // G ${green} // Result: ${isImpossible}`);
    if (!isImpossible) totalIncreased = totalIncreased + gameNumber

    multipliedCubes = multipliedCubes + ( blue * red * green )
  }

  console.log(`For file name ${fileName}`);
  console.log(`sum of possible gameNumber is ${totalIncreased}`);
  console.log(`sum of multiplied minimum number of cubes is ${multipliedCubes}`);
}

resolve('input_1');
