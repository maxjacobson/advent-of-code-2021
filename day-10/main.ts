import { readFileSync } from "fs"

let input = readFileSync("./day-10/input.txt").toString().trim().split("\n")

type OpeningBrace = "(" | "<" | "{" | "["
type ClosingBrace = ")" | ">" | "}" | "]"

type ValidationResult =
  | { valid: true }
  | {
      valid: false
      firstInvalidCharacter: ClosingBrace
    }

const errorScoreFor = (character: ")" | "]" | "}" | ">"): number => {
  if (character === ")") {
    return 3
  } else if (character === "]") {
    return 57
  } else if (character === "}") {
    return 1197
  } else if (character === ">") {
    return 25137
  } else {
    throw new Error("no bueno")
  }
}

const isOpeningBrace = (token: string): boolean => {
  return ["{", "[", "(", "<"].includes(token)
}

const isClosingBrace = (token: string): boolean => {
  return ["}", "]", ")", ">"].includes(token)
}

const closes = (a: string, b: string): boolean => {
  if (a === "[" && b === "]") {
    return true
  } else if (a === "{" && b === "}") {
    return true
  } else if (a === "(" && b === ")") {
    return true
  } else if (a === "<" && b === ">") {
    return true
  } else {
    return false
  }
}

const closingBraceFor = (openingBrace: OpeningBrace): ClosingBrace => {
  if (openingBrace === "(") {
    return ")"
  } else if (openingBrace === "[") {
    return "]"
  } else if (openingBrace === "<") {
    return ">"
  } else if (openingBrace === "{") {
    return "}"
  } else {
    throw new Error("Huh?")
  }
}

const validateLine = (line: string): ValidationResult => {
  let tokens = line.split("")

  let stack: OpeningBrace[] = []

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]

    if (isOpeningBrace(token)) {
      stack.push(token as OpeningBrace)
    } else if (isClosingBrace(token)) {
      if (closes(stack[stack.length - 1], token)) {
        stack.pop()
      } else {
        return { valid: false, firstInvalidCharacter: token as ClosingBrace }
      }
    } else {
      throw new Error("huh?")
    }
  }

  return { valid: true }
}

const completionScoreFor = (completionString: string): number => {
  return completionString.split("").reduce((acc, brace) => {
    let valueForBrace

    if (brace === ")") {
      valueForBrace = 1
    } else if (brace === "]") {
      valueForBrace = 2
    } else if (brace === "}") {
      valueForBrace = 3
    } else if (brace === ">") {
      valueForBrace = 4
    } else {
      throw new Error("Huh?")
    }

    return acc * 5 + valueForBrace
  }, 0)
}

const completionStringFor = (line: string): string => {
  let tokens = line.split("")

  let stack: OpeningBrace[] = []

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]

    if (isOpeningBrace(token)) {
      stack.push(token as OpeningBrace)
    } else if (isClosingBrace(token)) {
      if (closes(stack[stack.length - 1], token)) {
        stack.pop()
      } else {
        throw new Error("Invalid line")
      }
    } else {
      throw new Error("huh?")
    }
  }

  return stack
    .map((openingBrace) => closingBraceFor(openingBrace))
    .reverse()
    .join("")
}

// star one
{
  let sum = 0

  input.forEach((line) => {
    let result = validateLine(line)

    if (result.valid) {
    } else {
      sum += errorScoreFor(result.firstInvalidCharacter)
    }
  })

  console.log("star one", sum)
}

// star two
{
  let scores: number[] = []

  input.forEach((line) => {
    let result = validateLine(line)

    if (!result.valid) {
      // skip
    } else {
      let completionString = completionStringFor(line)
      scores.push(completionScoreFor(completionString))
    }
  })

  scores.sort((a, b) => a - b)

  console.log("star two", scores[Math.floor(scores.length / 2)])
}
