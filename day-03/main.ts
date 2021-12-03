import { readFileSync } from "fs"

const getInput = () =>
  readFileSync("./day-03/input.txt")
    .toString()
    .trim()
    .split("\n")
    .map((line) => line.split("").map((char) => parseInt(char)))

let input = getInput()
let width = input[0].length

const leastCommonInColumn = (input: number[][], column: number): number => {
  let values = input.map((row) => row[column])

  let counts: Record<number, number> = {}

  values.forEach((num) => {
    if (counts[num] === undefined) {
      counts[num] = 1
    } else {
      counts[num] += 1
    }
  })

  if (counts[0] > counts[1]) {
    return 1
  } else if (counts[1] > counts[0]) {
    return 0
  } else {
    return 0
  }
}

const mostCommonInColumn = (input: number[][], column: number): number => {
  let values = input.map((row) => row[column])

  let counts: Record<number, number> = {}

  values.forEach((num) => {
    if (counts[num] === undefined) {
      counts[num] = 1
    } else {
      counts[num] += 1
    }
  })

  if (counts[0] > counts[1]) {
    return 0
  } else if (counts[1] > counts[0]) {
    return 1
  } else {
    return 1
  }
}

const partOne = () => {
  let epsilonRateBits = []
  for (let i = 0; i < width; i++) {
    let mostCommon = leastCommonInColumn(input, i)

    epsilonRateBits.push(mostCommon)
  }

  let epsilonRate = parseInt(epsilonRateBits.join(""), 2)

  let gammaRateBits = []
  for (let i = 0; i < width; i++) {
    let mostCommon = mostCommonInColumn(input, i)

    gammaRateBits.push(mostCommon)
  }

  let gammaRate = parseInt(gammaRateBits.join(""), 2)

  return epsilonRate * gammaRate
}

const partTwo = () => {
  let oxygenContenders = getInput()
  let oxygenBits = []
  for (let i = 0; i < width; i++) {
    if (oxygenContenders.length === 1) {
      oxygenBits.push(oxygenContenders[0][i])
    } else {
      let mostCommon = mostCommonInColumn(oxygenContenders, i)
      oxygenBits.push(mostCommon)

      oxygenContenders = oxygenContenders.filter((contender) => {
        return contender[i] === mostCommon
      })
    }
  }
  let oxygenGeneratorRating = parseInt(oxygenBits.join(""), 2)

  let co2Contenders = getInput()
  let co2Bits = []
  for (let i = 0; i < width; i++) {
    if (co2Contenders.length === 1) {
      co2Bits.push(co2Contenders[0][i])
    } else {
      let leastCommon = leastCommonInColumn(co2Contenders, i)
      co2Bits.push(leastCommon)

      co2Contenders = co2Contenders.filter((contender) => {
        return contender[i] === leastCommon
      })
    }
  }

  let CO2ScrubberRating = parseInt(co2Bits.join(""), 2)

  return oxygenGeneratorRating * CO2ScrubberRating
}

console.log("part one", partOne())
console.log("part two", partTwo())
