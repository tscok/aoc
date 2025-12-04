// --- Day 3: Lobby ---

import { fetchText } from '../utils/fetchText'

function findMax(numbers: number[]) {
  return numbers.reduce((a, b) => Math.max(a, b), -Infinity)
}

function getMaxJoltage(numbers: number[]) {
  let n1: number | undefined
  let n2: number | undefined

  const max = findMax(numbers)
  const index = numbers.indexOf(max)
  const lastIndex = numbers.length - 1

  if (index === lastIndex) {
    n1 = findMax(numbers.slice(0, -1))
    n2 = max
  } else {
    n1 = max
    n2 = findMax(numbers.slice(index + 1))
  }

  return [n1, n2].join('')
}

export default async function () {
  const batteries = await fetchText('/src/day3/input.txt')

  const maxJoltages = batteries.map((sequence, i) => {
    const max = getMaxJoltage(sequence.split('').map(Number))
    console.log(`${i + 1}) In "${sequence}" the largest joltage is ${max}`)
    return max
  })

  console.log(maxJoltages)

  const sum = maxJoltages.reduce((a, b) => a + Number(b), 0)
  console.log(`=== Total output joltage: ${sum} ===`)
}
