// --- Day 1: Secret Entrance ---

async function fetchRotations() {
  try {
    const res = await fetch('input.txt')
    const txt = await res.text()
    return txt.split('\n')
  } catch {
    console.warn('No input found')
    return []
  }
}

function dial(startPosition: number, rotation: string) {
  let rotations = Number(rotation.match(/\d+/))
  let position = startPosition
  let zeroCount = 0
  function rotateDial() {
    rotations -= 1
    if (rotation.startsWith('L')) {
      const nextPosition = position - 1
      position = nextPosition < 0 ? 99 : nextPosition
    } else {
      const nextPosition = position + 1
      position = nextPosition > 99 ? 0 : nextPosition
    }
    if (position === 0) zeroCount++
    if (rotations > 0) rotateDial()
    return { position, zeroCount }
  }
  return rotateDial()
}

export const getSecretCode = async () => {
  const rotations = await fetchRotations()

  let dialPosition = 50
  let zeroCount = 0

  console.log(`- The dial starts by pointing at ${dialPosition}.`)

  rotations.map((rotation) => {
    if (!rotation) {
      console.warn(`Invalid rotation: "${rotation}"`)
      return
    }
    const result = dial(dialPosition, rotation)
    console.log(
      `- The dial is rotated ${rotation} to point at ${result.position};`,
      result.position !== 0 && result.zeroCount > 0
        ? `during this rotation it points at "0" ${result.zeroCount} times`
        : ``
    )
    if (result.position === 0 || result.zeroCount > 0) {
      zeroCount += result.zeroCount || 1
    }
    dialPosition = result.position
  })

  console.log(`== Secret code: ${zeroCount} ==`)
}
