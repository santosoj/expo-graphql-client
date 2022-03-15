import { Image, useWindowDimensions, View } from 'react-native'

import { IndexPath, Select, SelectItem, Toggle } from '@ui-kitten/components'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../theme/restyle-theme'

import arrowUpDown from '../../graphics/arrowupdown.png'

interface SortControlProps {
  options: string[]
  selectedIndex: number
  toggleStatus: boolean
  onSelectedIndexChanged: (index: number, value: string) => void
  onToggleStatusChanged: (status: boolean) => void
}

function SortControl({
  options,
  selectedIndex,
  toggleStatus,
  onSelectedIndexChanged,
  onToggleStatusChanged,
}: SortControlProps) {
  const { breakpoints, spacing } = useTheme<Theme>()
  const { width } = useWindowDimensions()
  const isDesktop = width >= breakpoints.desktopMin

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Select
        selectedIndex={new IndexPath(selectedIndex)}
        value={options[selectedIndex]}
        onSelect={(index) => {
          if (!Array.isArray(index))
            return onSelectedIndexChanged(index.row, options[index.row])
        }}
        style={{
          marginRight: spacing.small,
          flex: isDesktop ? undefined : 1,
          width: isDesktop ? 320 : undefined,
        }}
      >
        {options.map((value, index) => (
          <SelectItem key={index} title={value} />
        ))}
      </Select>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ width: 20, height: 20 }} source={arrowUpDown} />

        <Toggle checked={toggleStatus} onChange={onToggleStatusChanged} />
      </View>
    </View>
  )
}

export default SortControl
