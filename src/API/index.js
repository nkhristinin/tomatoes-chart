// @flow

import { getTime, subMinutes, subHours } from "date-fns"

const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min

/**
 * Ger random array of ticks from some date
 */
const getRandomPastTicks = (
  fromDate: number,
  count: number,
  diff: number => number,
  range: number = 10
): Array<Tick> => {
  return Array(count)
    .fill(undefined)
    .reduce(acc => {
      let newItem = null
      if (acc.length === 0) {
        newItem = {
          timestamp: getTime(fromDate),
          totalCallsAdded: getRandomInt(0, 5),
          totalCallsRemoved: -getRandomInt(0, 5),
          segmentSize: getRandomInt(0, 5)
        }
      } else {
        const prevItem = acc[acc.length - 1]
        const newCallsAdded = getRandomInt(0, range)
        const newCallsRemoved = getRandomInt(0, range)
        newItem = {
          timestamp: getTime(diff(prevItem.timestamp)),
          totalCallsAdded: newCallsAdded,
          totalCallsRemoved: -newCallsRemoved,
          segmentSize:
            prevItem.segmentSize -
            prevItem.totalCallsAdded -
            prevItem.totalCallsRemoved
        }
      }

      acc.push(newItem)
      return acc
    }, [])
    .reverse()
}

/**
 * Factory for creating function which return list of ticks
 * Has a clouse, and after some time add ticks
 * @example
 * const getTicks = makeGetTicks(5)
 * getTicks() // return 5 ticks
 * getTicks() // return 6 ticks after 3 seconds
 */
export const makeGetTicks = (intitialCount: number = 100) => {
  const dataMinutes: Array<Tick> = getRandomPastTicks(
    new Date(),
    intitialCount,
    time => subMinutes(time, getRandomInt(0, 10))
  )

  const dataDays: Array<Tick> = getRandomPastTicks(
    dataMinutes[dataMinutes.length - 1].timestamp,
    40,
    time => subHours(time, getRandomInt(12, 48)),
    100
  )

  let data: Array<Tick> = dataDays.concat(dataMinutes)

  let isLoad = false

  const getTicks = (): Promise<Array<Tick>> => {
    const addTicks = () => {
      if (isLoad) return
      isLoad = true

      setTimeout(() => {
        const prevItem = data[data.length - 1]
        const newCallsAdded = getRandomInt(0, 5)
        const newCallsRemoved = getRandomInt(0, 5)

        data.push({
          timestamp: getTime(new Date()),
          totalCallsAdded: newCallsAdded,
          totalCallsRemoved: -newCallsRemoved,
          segmentSize: prevItem.segmentSize + newCallsAdded - newCallsRemoved
        })

        isLoad = false
        addTicks()
      }, 10000)
    }

    addTicks()
    return new Promise(res => res(data))
  }

  return getTicks
}
