import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { getQueryName } from '../../graphql/util'

import SortControl from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SortControl',
  component: SortControl,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  parameters: {},
} as ComponentMeta<typeof SortControl>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SortControl> = (args) => (
  <SortControl {...args} />
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'SortControl',
}
