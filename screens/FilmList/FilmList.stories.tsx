import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { urqlMock } from '../../graphql/util'

import FilmList from '.'

export default {
  title: 'Screens/FilmList',
  component: FilmList,
  argTypes: {
  },
  parameters: {},
} as ComponentMeta<typeof FilmList>

const Template: ComponentStory<typeof FilmList> = (args) => (
  <FilmList />
)

export const Default = Template.bind({})
Default.args = {
}
