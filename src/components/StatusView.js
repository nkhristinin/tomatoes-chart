import React from "react"
import { format } from "date-fns"

const StatusView = ({
  selectionSize,
  lastUpdateTime,
  lastUpdateAdded,
  lastUpdateRemoved
}) => (
  <div>
    <p>Your current size of segment is {selectionSize}</p>
    <p>
      Last upadte was <b>{format(lastUpdateTime, "D MMM, HH:mm")}</b>. Added:{" "}
      <b>{lastUpdateAdded}</b> calls. Removed:{" "}
      <b>{Math.abs(lastUpdateRemoved)}</b> calls.
    </p>
  </div>
)

export default StatusView
