import { fetchText } from '../utils/fetchText'

const inRange = (id: string) => (range: string) => {
  const [start, end] = range.split('-')
  return Number(id) >= Number(start) && Number(id) <= Number(end)
}

function findFreshIngredients(ingredients: string[], ranges: string[]) {
  return ingredients.filter((id) => {
    if (!id) return
    const isFresh = ranges.some(inRange(id))
    const label = isFresh ? 'fresh' : 'spolied'
    console.log(`Ingredient ID ${id} is ${label}`)
    return isFresh
  })
}

export default async function () {
  const input = await fetchText('src/day5/input.txt')
  const blankIndex = input.indexOf('')

  const ranges = input.slice(0, blankIndex)
  const ingredients = input.slice(blankIndex + 1)

  console.log({ ranges, ingredients })

  const fresh = findFreshIngredients(ingredients, ranges)

  console.log(`== Fresh ingredients: ${fresh.length} ==`)
}
