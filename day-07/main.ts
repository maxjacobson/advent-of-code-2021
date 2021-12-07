import { readFileSync } from "fs"

let input = readFileSync("./day-07/input.txt")
  .toString()
  .split(",")
  .map((val) => parseInt(val))

input.sort((a, b) => a - b)
let min = input[0]
let max = input[input.length - 1]

const fuelCostForDistance = (distance: number, simple: boolean): number => {
  if (simple) {
    return 1
  } else {
    let ret = 0
    for (let i = 1; i <= distance; i++) {
      ret += i
    }
    return ret
  }
}

const findFuelCost = (simple: boolean): number => {
  let possibleFuelAmounts = []
  for (let candidate = min; candidate <= max; candidate++) {
    let fuel = 0
    input.forEach((val) => {
      let distance = Math.abs(val - candidate)
      fuel += fuelCostForDistance(distance, simple)
    })

    possibleFuelAmounts.push(fuel)
  }

  possibleFuelAmounts.sort((a, b) => a - b)

  return possibleFuelAmounts[0]
}

console.log("part one", findFuelCost(true))
console.log("part one", findFuelCost(false))
