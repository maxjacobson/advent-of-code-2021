import { readFileSync } from "fs"

let input = readFileSync("./day-06/input.txt").toString()

type Fishes = Record<number, number>
const countFishes = (fishes: Fishes): number => {
  let count = 0

  for (const [_, value] of Object.entries(fishes)) {
    count += value
  }
  return count
}

let countForDays = (days: number): number => {
  let fishes: Fishes = input
    .split(",")
    .map((val) => parseInt(val))
    .reduce((acc: Fishes, val: number) => {
      if (acc[val]) {
        acc[val] += 1
      } else {
        acc[val] = 1
      }

      return acc
    }, {})

  for (let day = 1; day <= days; day++) {
    let newFishes: Record<number, number> = {}

    for (let timer = 8; timer > 0; timer--) {
      if (fishes[timer]) {
        newFishes[timer - 1] = fishes[timer]
      }
    }

    if (!newFishes[6]) {
      newFishes[6] = 0
    }

    if (!newFishes[8]) {
      newFishes[8] = 0
    }

    if (fishes[0]) {
      newFishes[6] += fishes[0]
      newFishes[8] += fishes[0]
    }

    fishes = newFishes
  }
  return countFishes(fishes)
}

console.log("part one", countForDays(80))
console.log("part two", countForDays(256))
