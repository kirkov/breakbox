import React from 'react'
import { Breakbox } from '../breakbox'

const containerStyles = {
  display: 'flex'
}

function FlexContainer (props, ref) {
  return (
    <Breakbox {...props} ref={ref} containerStyles={containerStyles} />
  )
}

export default React.forwardRef(FlexContainer)