import { readFileSync } from "fs"

let connections: [string, string][] = readFileSync("./day-12/input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split("-"))
  .map(([a, b]) => [a, b])

type Caves = Record<string, Set<string>>
let caves: Caves = {}

connections.forEach(([a, b]) => {
  if (!caves[a]) {
    caves[a] = new Set()
  }

  caves[a].add(b)

  if (!caves[b]) {
    caves[b] = new Set()
  }

  caves[b].add(a)
})

const isSmallCave = (name: string): boolean => name.toLowerCase() === name

// star one
{
  const explore = (
    caves: Caves,
    startingPointName: string,
    path: string[]
  ): string[][] => {
    if (startingPointName === "end") {
      return [path]
    }

    let ret: string[][] = []

    caves[startingPointName].forEach((neighbor) => {
      let pathClone = path.slice()
      if (isSmallCave(neighbor) && path.includes(neighbor)) {
        // skip
      } else {
        pathClone.push(neighbor)
        ret = ret.concat(explore(caves, neighbor, pathClone))
      }
    })

    return ret
  }
  let paths = explore(caves, "start", ["start"])

  console.log("star one", paths.length)
}

// star two
{
  const validPath = (path: string[]): boolean => {
    let freq: Record<string, number> = {}

    path
      .filter((cave) => isSmallCave(cave))
      .forEach((cave) => {
        if (!freq[cave]) {
          freq[cave] = 0
        }

        freq[cave] += 1
      })

    let exceededOneVisitCount = Object.keys(freq).filter(
      (key) => freq[key] > 1
    ).length

    if (exceededOneVisitCount > 1) {
      return false
    }

    return !Object.keys(freq).some((key) => freq[key] > 2)
  }

  const explore = (
    caves: Caves,
    startingPointName: string,
    path: string[]
  ): string[][] => {
    if (startingPointName === "end") {
      return [path]
    }

    let ret: string[][] = []

    caves[startingPointName].forEach((neighbor) => {
      if (neighbor === "start") {
        return
      }
      let pathClone = path.slice()
      pathClone.push(neighbor)

      if (validPath(pathClone)) {
        let newPaths = explore(caves, neighbor, pathClone)

        ret = ret.concat(newPaths)
      }
    })

    return ret
  }

  let paths = explore(caves, "start", ["start"])

  console.log("star two", paths.length)
}
