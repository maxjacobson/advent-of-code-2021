import { readFileSync } from "fs"

type Cave = (number | null)[][]

let input = (): Cave =>
  readFileSync("./day-11/input.txt")
    .toString()
    .trim()
    .split("\n")
    .map((line) => {
      return line.split("").map((val) => parseInt(val))
    })

const incrementAllByOne = (octopuses: Cave): Cave => {
  return octopuses.map((row) =>
    row.map((octopus) => {
      if (octopus === null) {
        throw new Error("cave in weird state")
      } else {
        return octopus + 1
      }
    })
  )
}

const triggerFlashes = (octopuses: Cave): number => {
  let count = 0
  for (let rowIndex = 0; rowIndex < octopuses.length; rowIndex++) {
    let row = octopuses[rowIndex]

    for (let octopusIndex = 0; octopusIndex < row.length; octopusIndex++) {
      let octopus = row[octopusIndex]

      if (octopus && octopus > 9) {
        octopuses[rowIndex][octopusIndex] = null
        count += 1
        ;[
          [rowIndex - 1, octopusIndex - 1],
          [rowIndex - 1, octopusIndex],
          [rowIndex - 1, octopusIndex + 1],
          [rowIndex, octopusIndex - 1],
          [rowIndex, octopusIndex + 1],
          [rowIndex + 1, octopusIndex - 1],
          [rowIndex + 1, octopusIndex],
          [rowIndex + 1, octopusIndex + 1],
        ].forEach(([xx, yy]) => {
          if (octopuses[xx] && octopuses[xx][yy] !== null) {
            ;(octopuses[xx][yy] as number) += 1
          }
        })
      }
    }
  }

  return count
}

const resetZeros = (octopuses: Cave) => {
  for (let rowIndex = 0; rowIndex < octopuses.length; rowIndex++) {
    let row = octopuses[rowIndex]

    for (let octopusIndex = 0; octopusIndex < row.length; octopusIndex++) {
      let octopus = row[octopusIndex]

      if (octopus === null) {
        octopuses[rowIndex][octopusIndex] = 0
      }
    }
  }
}

// star one
{
  let flashCount = 0
  let octopuses: Cave = input()

  for (let i = 1; i <= 100; i++) {
    let newFlashes = 0
    octopuses = incrementAllByOne(octopuses)
    do {
      newFlashes = triggerFlashes(octopuses)
      flashCount += newFlashes
    } while (newFlashes > 0)

    resetZeros(octopuses)
  }

  console.log("star one", flashCount) // 1721
}

// star two
{
  let octopuses: Cave = input()
  let i = 1
  while (true) {
    let flashCount = 0
    let newFlashes = 0
    octopuses = incrementAllByOne(octopuses)
    do {
      newFlashes = triggerFlashes(octopuses)
      flashCount += newFlashes
    } while (newFlashes > 0)

    resetZeros(octopuses)

    if (flashCount === 100) {
      console.log("star two", i) // 298
      break
    }

    i++
  }
}
