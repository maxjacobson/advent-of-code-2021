import * as fs from "fs"

let numbers: number[] = fs
  .readFileSync("./day-01/input.txt")
  .toString()
  .split("\n")
  .map((line) => parseInt(line))

let previous: number | undefined
let count = 0

numbers.forEach((num) => {
  if (previous && num > previous) {
    count++
  }

  previous = num
})

console.log("star one:", count)

//////

type Triplet = [number, number, number]
let triplets: Triplet[] = []

for (let i = 0; i < numbers.length; i++) {
  let a = numbers[i],
    b = numbers[i + 1],
    c = numbers[i + 2]

  if (a && b && c) {
    triplets.push([a, b, c])
  }
}

const sum = (triplet: Triplet): number => {
  return triplet.reduce((acc, item) => acc + item, 0)
}

const tripletIncreased = (newer: Triplet, older: Triplet): boolean => {
  return sum(newer) > sum(older)
}

let previousTriplet: Triplet | undefined
let tripletsCount = 0

triplets.forEach((triplet) => {
  if (previousTriplet && tripletIncreased(triplet, previousTriplet)) {
    tripletsCount++
  }

  previousTriplet = triplet
})

console.log("star 2:", tripletsCount)
