import './style.css'
import { getSecretCode } from './day1'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Advent of Code 2025</h1>
  </div>
`

void getSecretCode()
