import { createTheme } from '@shopify/restyle'

import colors from './tokens/colors'
import fontFamilies from './tokens/fontFamilies'
import fontSizes from './tokens/fontSizes'
import fontWeights from './tokens/fontWeights'
import letterSpacings from './tokens/letterSpacings'
import lineHeights from './tokens/lineHeights'
import mediaQueries from './tokens/mediaQueries'
import radii from './tokens/radii'
import shadows from './tokens/shadows'
import spacing from './tokens/spacing'

type PxtonumReturnType<ThisType> =
{
  [key in keyof ThisType]: ThisType[key] extends string
    ? ThisType[key] | number
    : ThisType[key]
}

declare global {
  interface Object {
    pxtonum: <ThisType>() => PxtonumReturnType<ThisType>
  }
}

Object.prototype.pxtonum = function <ThisType>(): PxtonumReturnType<ThisType> {
  const clone = Object.assign({}, this) as PxtonumReturnType<ThisType>
  const typedThis = this as ThisType
  for (let key in typedThis) {
    if (this.hasOwnProperty(key)) {
      const value = typedThis[key]
      if (typeof value === 'string' && value.slice(-2) === 'px') {
        // @ts-ignore
        clone[key] = Number(value.slice(0, -2))
      }
    }
  }
  return clone
}

const theme = createTheme({
  colors,
  spacing,
  breakpoints: mediaQueries.pxtonum(),
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii: radii.pxtonum(),
  shadows,
})

export type Theme = typeof theme
export default theme
