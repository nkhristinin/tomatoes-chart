import React from "react"
import {
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer
} from "recharts"
import { format } from "date-fns"

const TicksChart = ({ ticks, timeFormat, paddingTime }) => (
  <ResponsiveContainer width="100%" height={500}>
    <ComposedChart
      data={ticks}
      stackOffset="sign"
      margin={{ top: 5, right: 120, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis
        type="number"
        tickFormatter={unixtimestamp => format(unixtimestamp, timeFormat)}
        domain={[
          dataMin => dataMin - paddingTime,
          dataMax => dataMax + paddingTime
        ]}
        scale="time"
        dataKey="timestamp"
      />
      <YAxis />
      <Tooltip
        labelFormatter={unixtimestamp => format(unixtimestamp, timeFormat)}
      />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      <Bar
        name="Added"
        dataKey="totalCallsAdded"
        fill="#6b5ad3"
        stackId="stack"
      />
      <Bar
        name="Removed"
        dataKey="totalCallsRemoved"
        fill="#999ea1"
        stackId="stack"
      />
      <Line
        name="Selection size"
        type="monotone"
        dataKey="segmentSize"
        stroke="#2898f8"
      />
    </ComposedChart>
  </ResponsiveContainer>
)

export default TicksChart
