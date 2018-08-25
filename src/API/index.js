// @flow

import { getTime, subMinutes } from "date-fns"

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

/**
 * Ger random array of ticks from some sdate
 */
const getRandomPastTicks = (fromDate: number, count: number): Array<Tick> => {
  return Array(count)
    .fill(undefined)
    .reduce(acc => {
      let newItem = null
      if (acc.length === 0) {
        newItem = {
          timestamp: getTime(fromDate),
          totalCallsAdded: getRandomInt(20, 50),
          totalCallsRemoved: -getRandomInt(0, 30),
          segmentSize: getRandomInt(0, 5)
        }
      } else {
        const prevItem = acc[acc.length - 1]
        const newCallsAdded = getRandomInt(0, 50)
        const newCallsRemoved = getRandomInt(0, 50)
        newItem = {
          timestamp: getTime(
            subMinutes(prevItem.timestamp, getRandomInt(0, 10))
          ),
          totalCallsAdded: newCallsAdded,
          totalCallsRemoved: -newCallsRemoved,
          segmentSize: prevItem.segmentSize - newCallsAdded + newCallsRemoved
        }
      }

      acc.push(newItem)
      return acc
    }, [])
    .reverse()
}

export const makeGetTicks = () => {
  let data: Array<Tick> = getRandomPastTicks(new Date(), 100)

  const getTicks = () => {
    const loadData = () =>
      setTimeout(() => {
        const prevItem = data[data.length - 1]
        const newCallsAdded = getRandomInt(0, 3)
        const newCallsRemoved = getRandomInt(0, 3)

        data.push({
          timestamp: getTime(new Date()),
          totalCallsAdded: newCallsAdded,
          totalCallsRemoved: -newCallsRemoved,
          segmentSize: prevItem.segmentSize + newCallsAdded - newCallsRemoved
        })

        loadData()
      }, 3000)

    loadData()
    return data
  }

  return getTicks
}
