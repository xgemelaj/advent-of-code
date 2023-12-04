const fs = require('fs');

function readFileByLines (fileName) {
  let text = fs.readFileSync(`${fileName}.txt`, 'utf-8');
  return text.split('\n');
}

const patternMatch = {
  // First part
  "1": 1, 
  "2": 2, 
  "3": 3, 
  "4": 4, 
  "5": 5, 
  "6": 6, 
  "7": 7, 
  "8": 8, 
  "9": 9,
  // Second part
  "one": 1, 
  "two": 2, 
  "three": 3, 
  "four": 4, 
  "five": 5, 
  "six": 6, 
  "seven": 7, 
  "eight": 8, 
  "nine": 9
}
const patternMatchKeys = Object.keys(patternMatch)


function lineResolver (line) {
  let firstDigit = Number.MAX_SAFE_INTEGER
  let secondDigit = Number.MAX_SAFE_INTEGER

  for (let i = 0; i < line.length; i++) {
    const actualLine = line.slice(i)

    for (const patternMatchKey of patternMatchKeys) {
      if(actualLine.startsWith(patternMatchKey)) {
        if(firstDigit === Number.MAX_SAFE_INTEGER) firstDigit = patternMatch[patternMatchKey]
        else secondDigit = patternMatch[patternMatchKey]
        break
      }
    }
  }
  if (secondDigit === Number.MAX_SAFE_INTEGER) secondDigit = firstDigit

  // console.log(`Line: ${line} First: ${firstDigit} Second: ${secondDigit}`);
  return (firstDigit * 10) + secondDigit
}

async function resolver(fileName) {
  const linesArray = readFileByLines(fileName)
  let totalIncreased = 0
  for (const line of linesArray) {
    totalIncreased = totalIncreased + lineResolver(line)
  }

  console.log(`For file name ${fileName} => total increased: ${totalIncreased}`);
}

resolver('input_1');
resolver('input_2');
