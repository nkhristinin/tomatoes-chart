import React from "react"

const Tab = ({ selected, onClick, children }) => (
  <div className={"tab " + (selected ? "tab--selected" : "")} onClick={onClick}>
    {children}
  </div>
)

export default Tab
