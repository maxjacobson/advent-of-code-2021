import * as fs from "fs"
import { parseCommandLine } from "typescript"

interface Direction {
  command: "forward" | "up" | "down"
  amount: number
}

const parseLine = (line: string): Direction => {
  let [command, amount] = line.split(" ")

  if (command === "up" || command === "down" || command === "forward") {
    return {
      command: command,
      amount: parseInt(amount),
    }
  } else {
    throw new Error("bad input")
  }
}

const directions: Direction[] = fs
  .readFileSync("./day-02/input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(parseLine)

const partOne = () => {
  let depth = 0
  let horizontal = 0

  directions.forEach((direction) => {
    if (direction.command === "up") {
      depth -= direction.amount
    } else if (direction.command === "down") {
      depth += direction.amount
    } else if (direction.command === "forward") {
      horizontal += direction.amount
    }
  })

  return depth * horizontal
}

const partTwo = () => {
  let horizontal = 0
  let aim = 0
  let depth = 0

  directions.forEach((direction) => {
    if (direction.command === "up") {
      aim -= direction.amount
    } else if (direction.command === "down") {
      aim += direction.amount
    } else if (direction.command === "forward") {
      horizontal += direction.amount
      depth += aim * direction.amount
    }
  })

  return depth * horizontal
}

console.log("part one", partOne())
console.log("part two", partTwo())
