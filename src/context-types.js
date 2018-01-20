import PropTypes from 'prop-types'

export default {
  breakbox: PropTypes.shape({
    breakpoints: PropTypes.arrayOf(PropTypes.any),
    spaces: PropTypes.arrayOf(PropTypes.any)
  })
}
