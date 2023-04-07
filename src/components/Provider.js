import React from 'react'

export const BreakboxContext = React.createContext()

export default function Provider ({ children, config }) {
  return (
    <BreakboxContext.Provider value={config}>
      {children}
    </BreakboxContext.Provider>
  )
}