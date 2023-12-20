const fs = require('fs');

function readFileByLines (fileName) {
  let text = fs.readFileSync(`${fileName}.txt`, 'utf-8');
  return text.split('\n');
}

function createInstructionMap(instructions) {
  const instructionMap = {}

  for(const instruction of instructions) {
    const [element, elementInstruction] = instruction.replaceAll(' ', '').split('=')
    const [left, right] = elementInstruction.replace('(', '').replace(')', '').replace('\r', '').split(',')

    instructionMap[element] = {
      "L": left,
      "R": right
    }
  }

  return instructionMap
}

function findAllNodesEndingWithCharacter(instructions, character) {
  const nodes = []

  for(const instruction of Object.keys(instructions))
    if(instruction.endsWith(character)) nodes.push(instruction)

  return nodes
}

function allNodesEndsWithCharacter(nodes, character) {
  for(const node of nodes)
    if(!node.endsWith(character)) return false

  return true
}

async function resolverPart1(fileName) {
  const [directions, __, ...instructions] = readFileByLines(fileName)

  const directionsTrimmed = directions.trim()
  const instructionMap = createInstructionMap(instructions)

  let counter = 0
  let currentNode = 'AAA' 

  while (currentNode !== 'ZZZ') {
    const currentDirectionIndex = counter % directionsTrimmed.length
    const currentDirection = directionsTrimmed[currentDirectionIndex]
    currentNode = instructionMap[currentNode][currentDirection]

    counter++
  }
  
  console.log(`For file name ${fileName} total counter is ${counter}`);
}

async function resolverPart2(fileName) {
  const [directions, __, ...instructions] = readFileByLines(fileName)

  const directionsTrimmed = directions.trim()
  // TODO cycle for all inputnodes
  const instructionMap = createInstructionMap(instructions)

  let counter = 0
  let currentNodes = findAllNodesEndingWithCharacter(instructionMap, 'A')

  while (!allNodesEndsWithCharacter(currentNodes, 'Z')) {
    const newNodes = []

    for (const node of currentNodes) {
      const currentDirectionIndex = counter % directionsTrimmed.length
      const currentDirection = directionsTrimmed[currentDirectionIndex]
      newNodes.push(instructionMap[node][currentDirection])
    }

    currentNodes = newNodes
    counter++
  }
  
  console.log(`For file name ${fileName} total counter is ${counter}`);
}

// resolverPart1('input');
resolverPart2('input2');