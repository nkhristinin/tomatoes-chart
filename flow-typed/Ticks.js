declare type DateMs = number

declare type Tick = {
  timestamp: DateMs,
  totalCallsAdded: number,
  totalCallsRemoved: number,
  segmentSize: number
}
