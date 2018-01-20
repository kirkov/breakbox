import React, {Component} from 'react'
import contextTypes from '../context-types'

export default class Provider extends Component {
  getChildContext () {
    return {
      breakbox: this.props
    }
  }

  render () {
    return React.Children.only(this.props.children)
  }
}

Provider.childContextTypes = contextTypes
