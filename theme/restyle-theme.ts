import { createTheme } from '@shopify/restyle'

import colors from '../tokens/colors'
import fontFamilies from '../tokens/fontFamilies'
import fontSizes from '../tokens/fontSizes'
import fontWeights from '../tokens/fontWeights'
import letterSpacings from '../tokens/letterSpacings'
import lineHeights from '../tokens/lineHeights'
import mediaQueries from '../tokens/mediaQueries'
import radii from '../tokens/radii'
import shadows from '../tokens/shadows'
import spacing from '../tokens/spacing'

type Breakpoints =
  | 'zero'
  | 'mobileMax'
  | 'tabletMin'
  | 'tabletMax'
  | 'desktopMin'

type Radii = 'hard' | 'rounded' | 'soft' | 'circle'

const theme = createTheme({
  colors,
  spacing,
  breakpoints: Object.entries(mediaQueries).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: Number(value.slice(0, -2)),
    }),
    {}
  ) as { [key in Breakpoints]: number },
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii: Object.entries(radii).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: Number(value.slice(0, -2)),
    }),
    {}
  ) as { [key in Radii]: number },
  shadows,
  textVariants: {
    header: {
      fontFamily: 'Barlow',
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'black',
    },
    subheader: {
      fontFamily: 'Barlow',
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'black',
    },
    body: {
      fontFamily: 'Barlow Semi Condensed',
      fontSize: 16,
      lineHeight: 24,
      color: 'black',
    },
  }  
})

export type Theme = typeof theme
export default theme
