import { addDecorator } from '@storybook/react'
import { urqlDecorator } from '@urql/storybook-addon'

import { urqlMock } from '../graphql/util'

import { ApplicationProvider, Layout, Text } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'

import { ThemeProvider } from '@shopify/restyle'
import theme from '../theme/restyle-theme'
import { default as kittenTheme } from '../theme/ui-kitten-theme.json'
import { default as kittenMapping } from '../theme/ui-kitten-mapping.json'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  urql: urqlMock,
}

addDecorator(urqlDecorator)

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...kittenTheme }}
        customMapping={kittenMapping}
      >
        <Story />
      </ApplicationProvider>
    </ThemeProvider>
  ),
]
