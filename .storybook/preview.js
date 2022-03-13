import { addDecorator } from '@storybook/react'
import { urqlDecorator } from '@urql/storybook-addon'

import { urqlMock } from '../graphql/util'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  urql: urqlMock,
}

addDecorator(urqlDecorator)

export const decorators = [(Story) => <Story />]
