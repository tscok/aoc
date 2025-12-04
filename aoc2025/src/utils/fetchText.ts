export async function fetchText(path: string) {
  try {
    const res = await fetch(path)
    const txt = await res.text()
    return txt.split('\n')
  } catch {
    console.warn('No input found')
    return []
  }
}
