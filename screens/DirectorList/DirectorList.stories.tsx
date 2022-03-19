import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { urqlMock } from '../../graphql/util'

import DirectorList from '.'

export default {
  title: 'Screens/DirectorList',
  component: DirectorList,
  argTypes: {
  },
  parameters: {},
} as ComponentMeta<typeof DirectorList>

const Template: ComponentStory<typeof DirectorList> = (args) => (
  <DirectorList />
)

export const Default = Template.bind({})
Default.args = {
  // @ts-ignore
  navigation: {
    navigate: () => {}
  }
}
