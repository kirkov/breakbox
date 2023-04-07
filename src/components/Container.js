import React from 'react'
import { Breakbox } from '../breakbox'

const containerStyles = {}

function Container (props, ref) {
  return (
    <Breakbox {...props} ref={ref} containerStyles={containerStyles} />
  )
}

export default React.forwardRef(Container)
