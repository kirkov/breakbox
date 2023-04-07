import React, { useContext } from 'react'
import defaultConfig from './config'
import { getCss } from './lib/styles'
import { BreakboxContext } from './components/Provider'

const resolveValue = (spaces, value) => {
  if (typeof value !== 'number') return value

  return value <= spaces.length
    ? spaces[value - 1]
    : value + 'px'
}

const getStyles = (props, config) => {
  const { spaces } = config

  // Add '0' value for default value (without a media query)
  const breakpoints = [0, ...config.breakpoints]
  const stylesPerBreakpoint = breakpoints.map(b => [])

  Object.entries(props).forEach(([prop, values]) => {
    if (Array.isArray(values)) {
      for (let i = 0; i < values.length; i++) {
        const value = values[i]
        if (value === null || value === undefined) continue

        const resolvedValue = resolveValue(spaces, value)
        stylesPerBreakpoint[i].push([prop, resolvedValue])
      }
    } else if (values !== null && values !== undefined) {
      stylesPerBreakpoint[0].push([prop, resolveValue(spaces, values)])
    }
  })

  const styles = stylesPerBreakpoint.reduce((result, declarations, index) => {
    // const media = stylesPerBreakpoint.length-1 !== index
    //   ? `@media (min-width: ${breakpoints[(stylesPerBreakpoint.length-1) - index]})`
    //   : null

    const media = index !== 0
      ? `@media (min-width: ${breakpoints[index]})`
      : null

    const declarationsObj = declarations.reduce((res, declaration) => {
      const [property, value] = declaration
      res[property] = value
      return res
    }, {})

    if (media === null) result = { ...result, ...declarationsObj }
    else result[media] = declarationsObj

    return result
  }, {})

  Object.keys(styles).forEach(key => (Object.keys(styles[key]).length === 0) && delete styles[key])

  return styles
}

export const Breakbox = React.forwardRef((props, ref) => {
  const { className, style, children, containerStyles, tag = 'div', ...otherProps } = props
  const context = useContext(BreakboxContext)

  const config = Object.assign({}, defaultConfig, context || {})
  const styles = getStyles(Object.assign(otherProps, containerStyles), config)
  const [stylesClassName, css] = getCss(styles)

  const StyleElement = <style>{css}</style>

  // cxs.reset()

  // used for testing
  let debug = null
  if (process.env.NODE_ENV === 'test') {
    debug = <style key='css'>{css}</style>
  }

  const componentProps = {
    className: [className, stylesClassName].join(' ').trim(),
    ref
  }

  if (style) {
    componentProps.style = style
  }

  return React.createElement(
    tag,
    componentProps,
    [ children, StyleElement, debug ]
  )
})

// export const resetStyles = () => cxs.reset()
