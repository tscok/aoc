// --- Day 3: Lobby ---

import { fetchText } from '../utils/fetchText'

function getBatteries(data: string, length: number) {
  const bank = data.split('').map(Number)
  const batteries: number[] = []
  let start = 0

  Array.from({ length }, (_, i) => {
    const remaining = length - i
    const end = bank.length - remaining + 1
    const value = Math.max(...bank.slice(start, end))
    start = bank.indexOf(value, start) + 1
    batteries.push(value)
  })

  return batteries.join('')
}

export default async function () {
  const banks = await fetchText('/src/day3/input.txt')

  const joltages = banks.map((bank, i) => {
    const value = getBatteries(bank, 12)
    console.log(`${i + 1}) In "${bank}" the largest joltage is ${value}`)
    return value
  })

  console.log(joltages)

  const sum = joltages.reduce((a, b) => a + Number(b), 0)
  console.log(`=== Total output joltage: ${sum} ===`)
}
