import { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { useQuery } from 'urql'

import {
  Button,
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Toggle,
} from '@ui-kitten/components'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../theme/restyle-theme'

import arrowUpDown from '../../graphics/arrowupdown.svg'

interface SortControlProps {}

function SortControl({}: SortControlProps) {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0))
  const [checked, setChecked] = useState(false)
  const { spacing } = useTheme<Theme>()

  return (
    <View style={{flexDirection: 'row'}}>
      <Select
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          if (!Array.isArray(index)) return setSelectedIndex(index)
        }}
        style={{marginRight: spacing.small, width: 150}}
      >
        <SelectItem title='Option 1' />
        <SelectItem title='Option 2' />
        <SelectItem title='Option 3' />
      </Select>
      <Image source={arrowUpDown} />
      <Toggle checked={checked} onChange={setChecked} style={{marginLeft: spacing.small}} />
    </View>
  )
}

export default SortControl
