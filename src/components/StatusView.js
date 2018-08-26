import React from "react"
import { format } from "date-fns"

const StatusView = ({
  selectionSize,
  lastUpdateTime,
  lastUpdateAdded,
  lastUpdateRemoved
}) => (
  <div>
    <div className="status-main ">
      Your current size of segment is <b>{selectionSize}.</b>
    </div>
    <div>
      Last update was <b>{format(lastUpdateTime, "D MMM, HH:mm")}</b>. Added:{" "}
      <b>{lastUpdateAdded}</b> calls. Removed:{" "}
      <b>{Math.abs(lastUpdateRemoved)}</b> calls.
    </div>
  </div>
)

export default StatusView
