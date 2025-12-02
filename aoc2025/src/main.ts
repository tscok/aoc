import './style.css'
import day2 from './day2'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Advent of Code 2025</h1>
  </div>
`

day2()
