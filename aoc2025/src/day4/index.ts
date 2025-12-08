// --- Day 4: Printing Department ---

import { fetchText } from '../utils/fetchText'

const isRoll = (input?: string) => input === '@' || input === 'x'

const strMatch = (input: string, char: string) =>
  input.match(new RegExp(char, 'g'))?.length ?? 0

const rollCount = (input: string[]) =>
  input.reduce((sum, t) => sum + (isRoll(t) ? 1 : 0), 0)

const xCount = (input: string[]) =>
  input.reduce((sum, s) => sum + strMatch(s, 'x'), 0)

const MAGIC_NUMBER = 4
const isAccessible = (input: string[]) => rollCount(input) < MAGIC_NUMBER

function markAccessibleRolls(data: string[]) {
  return data.map((row, rowIndex, rows) => {
    const prev = rows[rowIndex - 1]?.split('') ?? []
    const next = rows[rowIndex + 1]?.split('') ?? []
    return row
      .split('')
      .map((column, colIndex, cols) => {
        const val = (r: string[], n: number) => r[colIndex + n] ?? ' '
        const grid = [
          [val(prev, -1), val(prev, 0), val(prev, 1)],
          [val(cols, -1), /**/ '?' /**/, val(cols, 1)],
          [val(next, -1), val(next, 0), val(next, 1)],
        ]
        if (isRoll(column) && isAccessible(grid.flat())) {
          return 'x'
        }
        return column
      })
      .join('')
  })
}

function deleteMarkedRolls(data: string[]) {
  return data.map((row) => row.replaceAll('x', '.'))
}

export default async function () {
  const input = await fetchText('src/day4/input.txt')

  let removeCount = 0

  console.log('Initial state', input)

  function getResults(data: string[]) {
    const marked = markAccessibleRolls(data)
    const count = xCount(marked)
    if (count > 0) {
      console.log(`Remove ${count} rolls of paper:`)
      console.log(marked)
      removeCount += count
      return getResults(deleteMarkedRolls(marked))
    } else {
      console.log(`== Removed ${removeCount} rolls of paper`)
    }
  }

  getResults(input)
}
