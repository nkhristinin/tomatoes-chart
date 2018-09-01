import {
  mergeTicksCall,
  groupTicksByTime,
  getNearestRoundedTimeBy,
  getTimestampsGroupedBy,
  getTicksForChart
} from "../../ticks/utils"

describe("utils", () => {
  describe("getNearestRoundedTimeBy", () => {
    it("getNearestRoundedTimeBy should work", () => {
      expect(getNearestRoundedTimeBy(16, 5)).toBe(15)
    })
  })

  describe("getTimestampsGroupedBy", () => {
    it("getTimestampsGroupedBy should work", () => {
      expect(getTimestampsGroupedBy(99, 5, 3)).toEqual([85, 90, 95])
    })
  })

  describe("mergeTicks", () => {
    it("should merge ticks", () => {
      expect(
        mergeTicksCall([
          {
            totalCallsRemoved: 1,
            totalCallsAdded: 2,
            timestamp: 3,
            segmentSize: 4
          },
          {
            totalCallsRemoved: 4,
            totalCallsAdded: 3,
            timestamp: 2,
            segmentSize: 1
          }
        ])
      ).toEqual({
        totalCallsRemoved: 5,
        totalCallsAdded: 5,
        segmentSize: 1
      })
    })
  })

  describe("groupTicksByTime", () => {
    it("should group ticks by 5ms", () => {
      expect(
        groupTicksByTime(
          [
            {
              timestamp: 3
            },
            {
              timestamp: 4
            },
            {
              timestamp: 7
            }
          ],
          5
        )
      ).toEqual({
        0: [
          {
            timestamp: 3
          },
          {
            timestamp: 4
          }
        ],
        5: [
          {
            timestamp: 7
          }
        ]
      })
    })
  })

  describe("getTicksForChart", () => {
    it("getTicksForChart should work", () => {
      expect(
        getTicksForChart(
          [
            {
              totalCallsRemoved: -2,
              totalCallsAdded: 1,
              timestamp: 3,
              segmentSize: 4
            },
            {
              totalCallsRemoved: -4,
              totalCallsAdded: 3,
              timestamp: 6,
              segmentSize: 1
            },
            {
              totalCallsRemoved: -6,
              totalCallsAdded: 7,
              timestamp: 8,
              segmentSize: 1
            }
          ],
          9,
          5,
          2
        )
      ).toEqual([
        {
          segmentSize: 4,
          timestamp: 0,
          totalCallsAdded: 1,
          totalCallsRemoved: -2
        },
        {
          segmentSize: 1,
          timestamp: 5,
          totalCallsAdded: 10,
          totalCallsRemoved: -10
        }
      ])
    })
  })
})
