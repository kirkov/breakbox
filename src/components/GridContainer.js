import React from 'react'
import { Breakbox } from '../breakbox'

const containerStyles = {
  display: 'grid'
}

function GridContainer (props, ref) {
  return (
    <Breakbox {...props} ref={ref} containerStyles={containerStyles} />
  )
}

export default React.forwardRef(GridContainer)