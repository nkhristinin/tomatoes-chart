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

const TicksChart = ({ ticks }) => (
  <ResponsiveContainer width="95%" height={500}>
    <ComposedChart
      data={ticks}
      stackOffset="sign"
      margin={{ top: 5, right: 120, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis
        type="number"
        tickFormatter={unixtimestamp => format(unixtimestamp, "HH:mm")}
        domain={["dataMin - 500000", "dataMax + 500000"]}
        scale="time"
        dataKey="timestamp"
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="totalCallsAdded" fill="#8884d8" stackId="stack" />
      <Bar dataKey="totalCallsRemoved" fill="#82ca9d" stackId="stack" />
      <Line type="monotone" dataKey="segmentSize" stroke="#ff7300" />
    </ComposedChart>
  </ResponsiveContainer>
)

export default TicksChart
