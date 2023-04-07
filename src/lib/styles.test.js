
import { getCss } from './styles'

describe('styles', () => {
  it('works', () => {

    const styles = {
      fontSize: 32,
      height: '1rem',

      '@media (min-width: 320px)': {
        fontSize: 64,
      }
    }

    expect(getCss(styles)).toBe('xxx')
  })
})