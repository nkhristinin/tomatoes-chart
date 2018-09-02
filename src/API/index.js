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
          totalCallsRemoved: 0,
          segmentSize: getRandomInt(5, 15)
        }
      } else {
        const prevItem = acc[acc.length - 1]

        const newSegmentSize =
          prevItem.segmentSize -
          prevItem.totalCallsAdded -
          prevItem.totalCallsRemoved

        const newCallsAdded = getRandomInt(0, prevItem.segmentSize + range)

        const newCallsRemoved = getRandomInt(
          Math.abs(newSegmentSize - newCallsAdded),
          Math.abs(newSegmentSize - newCallsAdded) + range
        )

        newItem = {
          timestamp: getTime(diff(prevItem.timestamp)),
          totalCallsAdded: newCallsAdded,
          totalCallsRemoved: -newCallsRemoved,
          segmentSize: newSegmentSize
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
export const makeGetTicks = (intitialCount: number = 25) => {
  const dataMinutes: Array<Tick> = getRandomPastTicks(
    new Date(),
    intitialCount,
    time => subMinutes(time, getRandomInt(0, 10))
  )

  const dataDays: Array<Tick> = getRandomPastTicks(
    dataMinutes[0].timestamp,
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
        const newCallsRemoved = getRandomInt(0, 5)
        const newCallsAdded = getRandomInt(newCallsRemoved, 7)

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
