import React from "react"

export const RenderTimer = () => {
  const timer = new Date().toLocaleTimeString()
  return <p>Render time: {timer}</p>
}
