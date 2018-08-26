// @flow

type GroupedTicks = {
  [number]: Array<Tick>
}

// getNearestRoundedTimeBy(17, 5) => 15
export const getNearestRoundedTimeBy = (date: number, time: number): number =>
  date - (date % time)

/* 
    Return map object with ticks grouped by time
    @example
    groupTicksByTime([{timestamps:12},{timestamp: 17},{timestamp: 18}], 5) =>
    {
        10: [{timestamp:12}]
        15: [{timestamp:17},{timestamp:18}]
    }
*/
export const groupTicksByTime = (
  ticks: Array<Tick>,
  time: DateMs
): GroupedTicks => {
  return ticks.reduce((acc, item) => {
    const timestamp = getNearestRoundedTimeBy(item.timestamp, time)
    if (Array.isArray(acc[timestamp])) {
      acc[timestamp].push(item)
    } else {
      acc[timestamp] = [item]
    }
    return acc
  }, {})
}

// Merge ticks call except segmentSize and timestamp
export const mergeTicksCall = (arr: Array<Tick>): $Shape<Tick> =>
  arr.reduce(
    (acc, val) => ({
      totalCallsAdded: acc.totalCallsAdded + val.totalCallsAdded,
      totalCallsRemoved: acc.totalCallsRemoved + val.totalCallsRemoved,
      segmentSize: val.segmentSize
    }),
    { totalCallsRemoved: 0, totalCallsAdded: 0, segmentSize: 0 }
  )

// getTimestampsGroupedBy (99, 5, 3) => [85, 90, 95]
export const getTimestampsGroupedBy = (
  dateFrom: DateMs,
  groupBy: number,
  count: number
): Array<number> => {
  return Array(count)
    .fill(undefined)
    .reduceRight((acc, val) => {
      if (acc.length === 0) {
        acc.push(getNearestRoundedTimeBy(dateFrom, groupBy))
      } else {
        acc.push(acc[acc.length - 1] - groupBy)
      }
      return acc
    }, [])
    .reverse()
}

export const getTicksForChart = (
  ticks: Array<Tick>,
  dateFrom: DateMs,
  groupBy: number,
  maxCountOfTicks: number
): Array<Tick> => {
  let dates = getTimestampsGroupedBy(dateFrom, groupBy, maxCountOfTicks)

  const newDates = groupTicksByTime(ticks, groupBy)

  return dates.reduce((acc: Array<Tick>, timestamp: number, index: number) => {
    let newItem = {}
    if (newDates[timestamp]) {
      newItem = mergeTicksCall(newDates[timestamp])
      newItem.timestamp = timestamp
    } else {
      let prevValue = 0
      if (index !== 0) {
        prevValue = acc[index - 1].segmentSize
      }
      newItem = {
        totalCallsRemoved: 0,
        totalCallsAdded: 0,
        timestamp: timestamp,
        segmentSize: prevValue
      }
    }

    acc.push(newItem)

    return acc
  }, [])
}
