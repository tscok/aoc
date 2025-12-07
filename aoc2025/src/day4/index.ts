// --- Day 4: Printing Department ---

import { fetchText } from '../utils/fetchText'

const isRoll = (input?: string) => input === '@' || input === 'x'

const rollCount = (input: string[]) =>
  input.reduce((sum, t) => sum + (isRoll(t) ? 1 : 0), 0)

const range = (length: number, start: number = 0) => {
  return Array.from({ length }, (_, i) => start + i)
}

const MAGIC_NUMBER = 4
const isAccessible = (input: string[]) => rollCount(input) < MAGIC_NUMBER

export default async function () {
  const data = await fetchText('src/day4/input.txt')
  const results: string[][] = []

  let accessibleRolls = 0

  data.filter(Boolean).map((row, rowIndex, rows) => {
    const prev = rows[rowIndex - 1]?.split('') ?? []
    const next = rows[rowIndex + 1]?.split('') ?? []

    const result = row.split('').map((col, colIndex, cols) => {
      const adjacentGrid = [
        range(3, colIndex - 1).map((i) => prev[i] ?? ' '),
        range(3, colIndex - 1).map((i) =>
          i === colIndex ? '?' : cols[i] ?? ' '
        ),
        range(3, colIndex - 1).map((i) => next[i] ?? ' '),
      ]

      if (isRoll(col) && isAccessible(adjacentGrid.flat())) {
        accessibleRolls++
        return 'x'
      }

      return col
    })

    results.push(result)
  })

  console.log(results)

  console.log(`=== Accessible rolls: ${accessibleRolls} ===`)
}
