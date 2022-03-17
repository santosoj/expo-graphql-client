import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import DirectorDetail from '.'

export default {
  title: 'Screens/DirectorDetail',
  component: DirectorDetail,
  argTypes: {
  },
  parameters: {},
} as ComponentMeta<typeof DirectorDetail>

const Template: ComponentStory<typeof DirectorDetail> = (args) => (
  <DirectorDetail {...args} />
)

export const Default = Template.bind({})
Default.args = {
  route: {
    params: {
      id: 23
    },
    key: 'hehehe',
    name: 'Director'
  },
  // @ts-ignore
  navigation: {
    setOptions: () => {},
  }
}
