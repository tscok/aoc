import './style.css'
import day from './day3'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Advent of Code 2025</h1>
  </div>
`

day()
