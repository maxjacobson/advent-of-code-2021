import { readFileSync } from "fs"

let [dotLocationsRaw, foldInstructionsRaw] = readFileSync("./day-13/input.txt")
  .toString()
  .trim()
  .split("\n\n")

let dotLocations: [number, number][] = dotLocationsRaw
  .split("\n")
  .map((line) => line.split(",").map((val) => parseInt(val)))
  .map(([a, b]) => [a, b])

type Instruction = { direction: "x" | "y"; line: number }
let foldPattern = /^fold along (x|y)=(\d+)$/
let foldInstructions: Instruction[] = foldInstructionsRaw
  .split("\n")
  .map((line) => {
    let match = line.match(foldPattern)

    if (match) {
      return {
        direction: match[1] as "x" | "y",
        line: parseInt(match[2]),
      }
    } else {
      throw new Error("bad input")
    }
  })

let maxX = dotLocations.map(([x, _]) => x).sort((a, b) => b - a)[0]
let maxY = dotLocations.map(([_, y]) => y).sort((a, b) => b - a)[0]

type Paper = boolean[][]
let paper: Paper = []
for (let i = 0; i <= maxY; i++) {
  let row: boolean[] = new Array(maxX + 1).fill(false)
  paper.push(row)
}

dotLocations.forEach(([x, y]) => {
  paper[y][x] = true
})

const fold = (paper: Paper, instruction: Instruction): Paper => {
  let newPaper: Paper = []

  if (instruction.direction === "x") {
    // folding left
    paper.forEach((row) => {
      let newRow: boolean[] = []

      row.forEach((value, x) => {
        if (x < instruction.line) {
          newRow.push(value)
        } else if (x > instruction.line && value === true) {
          newRow[instruction.line - (x - instruction.line)] = true
        }
      })

      newPaper.push(newRow)
    })
  } else {
    // folding up

    paper.forEach((row, y) => {
      if (y < instruction.line) {
        newPaper.push(row.slice())
      } else if (y > instruction.line) {
        row.forEach((value, x) => {
          if (value === true) {
            // need to update the paper above

            newPaper[instruction.line - (y - instruction.line)][x] = true
          }
        })
      }
    })
  }

  return newPaper
}

const display = (paper: Paper) => {
  console.log(
    paper
      .map((line) => line.map((value) => (value ? "#" : ".")).join(""))
      .join("\n")
  )
}

// star one
{
  let foldedPaper = fold(paper, foldInstructions[0])

  let count = 0
  foldedPaper.forEach((row) => {
    row.forEach((value) => {
      if (value) count++
    })
  })

  console.log("star one", count) // 708
}

// star 2
{
  let fullyFolded = foldInstructions.reduce(
    (acc, instruction) => fold(acc, instruction),
    paper
  )

  console.log("star two")
  display(fullyFolded) // EBLUBRFH
}
