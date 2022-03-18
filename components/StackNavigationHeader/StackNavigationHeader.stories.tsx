import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import StackNavigationHeader from '.'

export default {
  title: 'StackNavigationHeader',
  component: StackNavigationHeader,
  argTypes: {},
  parameters: {},
} as ComponentMeta<typeof StackNavigationHeader>

const Template: ComponentStory<typeof StackNavigationHeader> = (args) => (
  <StackNavigationHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: '10 Things I Hate About You',
  to: { screen: '' }
}
