import { readFileSync } from "fs"

let rows: number[][] = readFileSync("./day-09/input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    return line.split("").map((val) => parseInt(val))
  })

let neighborsOf = (x: number, y: number): [number, number][] => {
  let neighbors = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]

  let ret: [number, number][] = []
  neighbors.forEach(([xx, yy]) => {
    let row = rows[yy]
    if (row) {
      let height = row[xx]
      if (typeof height !== "undefined") {
        ret.push([xx, yy])
      }
    }
  })

  return ret
}

const findLowPoints = (): [number, number][] => {
  let lowPoints: [number, number][] = []

  for (let y = 0; y < rows.length; y++) {
    let row = rows[y]
    for (let x = 0; x < row.length; x++) {
      let height = row[x]

      let neighbors = neighborsOf(x, y)

      if (
        neighbors.length &&
        neighbors.every(([xx, yy]) => rows[yy][xx] > height)
      ) {
        lowPoints.push([x, y])
      }
    }
  }

  return lowPoints
}

// star one
{
  let answer = 0

  findLowPoints().forEach(([x, y]) => {
    answer += rows[y][x] + 1
  })

  console.log("star one", answer)
}

const findBasinFor = (
  [x, y]: [number, number],
  basin: [number, number][] = []
): [number, number][] => {
  let neighbors = neighborsOf(x, y)

  neighbors.forEach(([xx, yy]) => {
    let neighborHeight = rows[yy][xx]

    if (neighborHeight === 9) {
      // too high, stop exploring
      return
    } else if (
      basin.some((location) => location[0] === xx && location[1] === yy)
    ) {
      // already mapped it
      return
    } else {
      basin.push([xx, yy])
      basin = findBasinFor([xx, yy], basin)
    }
  })

  return basin
}

// star two
{
  let basinLengths: number[] = []

  findLowPoints().forEach(([x, y]) => {
    let basin = findBasinFor([x, y])

    basinLengths.push(basin.length)
  })

  basinLengths.sort((a, b) => b - a)
  console.log(
    "star two",
    basinLengths.splice(0, 3).reduce((acc, len) => acc * len, 1)
  )
}
