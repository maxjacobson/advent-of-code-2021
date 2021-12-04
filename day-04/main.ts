import { readFileSync } from "fs"

let input = readFileSync("./day-04/input.txt").toString()

let guesses: number[] = input
  .trim()
  .split("\n")[0]
  .trim()
  .split(",")
  .map((guess) => parseInt(guess))

type Board = number[][]

let boards: Board[] = input
  .trim()
  .split("\n")
  .splice(2)
  .join("\n")
  .split("\n\n")
  .map((board) => {
    return board.split("\n").map((row) =>
      row
        .trim()
        .split(/\s+/)
        .map((value) => parseInt(value))
    )
  })

const boardHasWinner = (board: Board): boolean => {
  let hasWinner = false

  board.forEach((row) => {
    if (row.filter((value) => value === -1).length === row.length) {
      hasWinner = true
    }
  })

  for (let i = 0; i < board[0].length; i++) {
    let columnValues: number[] = []
    board.forEach((row) => {
      columnValues.push(row[i])
    })

    if (
      columnValues.filter((value) => value === -1).length ===
      columnValues.length
    ) {
      hasWinner = true
    }
  }

  return hasWinner
}

const calculateScore = (board: Board, guess: number): number => {
  let sum = 0
  board.forEach((row) => {
    row.forEach((value) => {
      if (value > -1) {
        sum += value
      }
    })
  })

  return sum * guess
}

const main = () => {
  let winningBoards: number[] = []

  guesses.forEach((guess) => {
    boards.forEach((board, boardIndex) => {
      board.forEach((row, rowIndex) => {
        row.forEach((value, valueIndex) => {
          if (value === guess) {
            row[valueIndex] = -1
          }
        })
      })

      if (boardHasWinner(board) && winningBoards.indexOf(boardIndex) === -1) {
        let score = calculateScore(board, guess)
        winningBoards.push(boardIndex)

        if (winningBoards.length === 1) {
          console.log("part one -", score)
        } else if (winningBoards.length === boards.length) {
          console.log("part two -", score)
        }
      }
    })
  })
}

main()
