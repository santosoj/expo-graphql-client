import React from 'react'
import { View } from 'react-native'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import KnownFor from '.'

export default {
  title: 'KnownFor',
  component: KnownFor,
  argTypes: {},
  parameters: {},
} as ComponentMeta<typeof KnownFor>

const Template: ComponentStory<typeof KnownFor> = (args) => (
  <KnownFor {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: '10 Things I Hate About You',
  linkTo: { screen: 'hehehe' },
}
