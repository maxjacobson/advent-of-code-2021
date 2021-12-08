import { readFileSync } from "fs"

let input = readFileSync("./day-08/input.txt").toString().trim()

let starOne = () => {
  let digits = input.split("\n").map((line) => {
    return line.split(" | ")[1].split(" ")
  })

  let count = 0
  digits.forEach((lineOfDigits) => {
    lineOfDigits.forEach((digit) => {
      if (
        digit.length === 2 ||
        digit.length === 4 ||
        digit.length === 3 ||
        digit.length === 7
      ) {
        count += 1
      }
    })
  })

  return count
}

type Display = {
  uniqueDigits: string[] // length 10
  displayValues: string[] // length 4
}

type Signal = "a" | "b" | "c" | "d" | "e" | "f" | "g"
type SignalMap = Record<Signal, Signal> // from incorrect to correct signal

let correctWireMappingsFor = (uniqueDigits: string[]): SignalMap => {
  // c and f
  let one = (
    uniqueDigits.find((signals) => signals.length === 2) as string
  ).split("")

  // b, c, d, f
  let four = (
    uniqueDigits.find((signals) => signals.length === 4) as string
  ).split("")

  // a, c, f
  let seven = (
    uniqueDigits.find((signals) => signals.length === 3) as string
  ).split("")

  let a = seven.find((letter) => !one.includes(letter)) as Signal

  // a, b, c, d, f
  let three = (
    uniqueDigits.find((signals) => {
      return (
        signals.length === 5 && one.every((letter) => signals.includes(letter))
      )
    }) as string
  ).split("")

  // d: in three and four, but not one
  let d = three.find((letter) => {
    return !one.includes(letter) && four.includes(letter)
  }) as Signal

  // g: in three and not a, d, c, or f
  let g = three.find((letter) => {
    return !one.includes(letter) && letter !== a && letter !== d
  }) as Signal

  let six = (
    uniqueDigits.find((signals) => {
      return (
        signals.length === 6 && !one.every((cOrF) => signals.includes(cOrF))
      )
    }) as string
  ).split("")

  let f = one.find((cOrF) => six.includes(cOrF)) as Signal
  let c = one.find((cOrF) => !six.includes(cOrF)) as Signal

  // a, d, f, g, but not c and length 5
  let five = (
    uniqueDigits.find((signals) => {
      return (
        signals.length === 5 &&
        signals.includes(a) &&
        signals.includes(d) &&
        signals.includes(f) &&
        signals.includes(g) &&
        !signals.includes(c)
      )
    }) as string
  ).split("")

  let b = five.find((letter) => {
    return ![a, d, f, g].includes(letter as Signal)
  }) as Signal

  // a, c, d, g but not f && length 5
  let two = (
    uniqueDigits.find((signals) => {
      return (
        signals.length === 5 &&
        signals.includes(a) &&
        signals.includes(c) &&
        signals.includes(d) &&
        signals.includes(g) &&
        !signals.includes(f)
      )
    }) as string
  ).split("")

  let e = two.find((letter) => {
    return ![a, c, d, g].includes(letter as Signal)
  }) as Signal

  let ret = {} as SignalMap

  ret[a] = "a"
  ret[b] = "b"
  ret[c] = "c"
  ret[d] = "d"
  ret[e] = "e"
  ret[f] = "f"
  ret[g] = "g"

  return ret as SignalMap
}

let includes = (signals: Signal[], ...letters: Signal[]): boolean => {
  return (
    letters.length === signals.length &&
    letters.every((letter) => signals.includes(letter))
  )
}

let signalsToNumber = (signals: Signal[]): number => {
  if (includes(signals, "a", "b", "c", "e", "f", "g")) {
    return 0
  } else if (includes(signals, "c", "f")) {
    return 1
  } else if (includes(signals, "a", "c", "d", "e", "g")) {
    return 2
  } else if (includes(signals, "a", "c", "d", "f", "g")) {
    return 3
  } else if (includes(signals, "b", "c", "d", "f")) {
    return 4
  } else if (includes(signals, "a", "b", "d", "f", "g")) {
    return 5
  } else if (includes(signals, "a", "b", "d", "e", "f", "g")) {
    return 6
  } else if (includes(signals, "a", "c", "f")) {
    return 7
  } else if (includes(signals, "a", "b", "c", "d", "e", "f", "g")) {
    return 8
  } else if (includes(signals, "a", "b", "c", "d", "f", "g")) {
    return 9
  } else {
    throw new Error("no bueno")
  }
}

let toSignal = (letter: string): Signal => {
  if (
    letter !== "a" &&
    letter !== "b" &&
    letter !== "c" &&
    letter !== "d" &&
    letter !== "e" &&
    letter !== "f" &&
    letter !== "g"
  ) {
    throw new Error("not good!")
  }

  return letter
}

let valueOnDisplay = (display: Display, mappings: SignalMap): number => {
  let digits: number[] = []
  display.displayValues.forEach((value) => {
    let correctedSignals: Signal[] = value
      .split("")
      .map((signal) => mappings[toSignal(signal)])
    let asNumber = signalsToNumber(correctedSignals)
    digits.push(asNumber)
  })

  return parseInt(digits.join(""))
}

let starTwo = () => {
  let displays: Display[] = input.split("\n").map((line) => {
    let [uniqueDigits, displayValues] = line.split(" | ")

    let display = {
      uniqueDigits: uniqueDigits.split(" "),
      displayValues: displayValues.split(" "),
    }

    return display
  })

  let sum = 0
  displays.forEach((display) => {
    let mappings: SignalMap = correctWireMappingsFor(display.uniqueDigits)
    let numericValue = valueOnDisplay(display, mappings)
    sum += numericValue
  })

  return sum
}

console.log("star one", starOne())
console.log("star two", starTwo())
