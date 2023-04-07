
import cxs from './vendor/cxs'
cxs.prefix('_bbx_')

export function getCss (styles) {
  cxs.prefix('_bbx_')
  const stylesClassName = cxs(styles)

  return [
    stylesClassName,
    cxs.css(),
  ]
}
