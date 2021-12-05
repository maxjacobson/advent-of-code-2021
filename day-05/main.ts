import { readFileSync } from "fs"

let input = readFileSync("./day-05/input.txt").toString()

interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
}

let pattern = /(\d+),(\d+) \-\> (\d+),(\d+)/

let parseLine = (line: string): Line => {
  let match = line.match(pattern)
  if (match) {
    return {
      x1: parseInt(match[1]),
      y1: parseInt(match[2]),
      x2: parseInt(match[3]),
      y2: parseInt(match[4]),
    }
  } else {
    throw new Error(`bad input ${line}`)
  }
}

let lines: Line[] = input
  .trim()
  .split("\n")
  .map((line) => {
    return parseLine(line.trim())
  })

let maxX = lines.reduce((acc, line) => {
  let values = [acc, line.x1, line.x2]
  values.sort()
  return values.reverse()[0]
}, 0)

let maxY = lines.reduce((acc, line) => {
  let values = [acc, line.y1, line.y2]
  values = values.sort((a, b) => a - b).reverse()
  return values[0]
}, 0)

type Grid = number[][]

const buildGrid = (): Grid => {
  let grid: Grid = []

  for (let y = 0; y <= maxY; y++) {
    let row = []

    for (let x = 0; x <= maxX; x++) {
      row.push(0)
    }

    grid.push(row)
  }

  return grid
}

const displayGrid = (grid: number[][]): string => {
  let ret = ""

  grid.forEach((line) => {
    ret += line.map((val) => (val === 0 ? "." : val.toString())).join("")
    ret += "\n"
  })

  return ret
}

const countDangerZones = (grid: Grid, includeDiagonals = false): number => {
  lines.forEach((line) => {
    let isDiagonal = line.x1 !== line.x2 && line.y1 !== line.y2

    if (isDiagonal && !includeDiagonals) {
      return
    }

    if (isDiagonal) {
      let xLength = Math.abs(line.x1 - line.x2)

      for (let i = 0; i <= xLength; i++) {
        let x, y

        if (line.x1 > line.x2) {
          x = line.x1 - i
        } else {
          x = line.x1 + i
        }

        if (line.y1 > line.y2) {
          y = line.y1 - i
        } else {
          y = line.y1 + i
        }

        if (grid[y][x]) {
          grid[y][x] += 1
        } else {
          grid[y][x] = 1
        }
      }
    } else {
      let startingX
      let endingX
      let startingY
      let endingY
      if (line.x1 > line.x2) {
        startingX = line.x2
        endingX = line.x1
      } else {
        startingX = line.x1
        endingX = line.x2
      }

      if (line.y1 > line.y2) {
        startingY = line.y2
        endingY = line.y1
      } else {
        startingY = line.y1
        endingY = line.y2
      }
      for (let x = startingX; x <= endingX; x++) {
        for (let y = startingY; y <= endingY; y++) {
          if (grid[y][x]) {
            grid[y][x] += 1
          } else {
            grid[y][x] = 1
          }
        }
      }
    }
  })

  let count = 0
  grid.forEach((row) => {
    row.forEach((value) => {
      if (value >= 2) {
        count += 1
      }
    })
  })

  return count
}

const partOne = () => {
  let grid = buildGrid()

  console.log("part one", countDangerZones(grid))
}

const partTwo = () => {
  let grid = buildGrid()

  console.log("part two", countDangerZones(grid, true))
}

partOne()
partTwo()
