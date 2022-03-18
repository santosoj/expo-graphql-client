import { GestureResponderEvent, Image, useWindowDimensions } from 'react-native'
import { Link, ParamListBase } from '@react-navigation/native'
import { To } from '@react-navigation/native/lib/typescript/src/useLinkTo'
import { createBox, createText, useTheme } from '@shopify/restyle'
import { Theme } from '../../theme/restyle-theme'

import ChevronLeft from '../../graphics/chevron-left.png'
import ChevronLeftHover from '../../graphics/chevron-left-hover.png'
import { StackNavigationProp } from '@react-navigation/stack'
import { useCallback } from 'react'

const Box = createBox<Theme>()
const Text = createText<Theme>()

interface StackNavigationHeaderProps {
  title?: string
  navigation: StackNavigationProp<ParamListBase, string>
}

function StackNavigationHeader({
  title,
  navigation,
}: StackNavigationHeaderProps) {
  const { breakpoints } = useTheme<Theme>()
  const { width } = useWindowDimensions()
  const horizontalPadding = width >= breakpoints.desktopMin ? 0 : 10

  const handleLinkPress = useCallback((ev) => {
    ev.preventDefault()
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }, [])

  return (
    <Box
      flexDirection='row'
      alignItems='center'
      backgroundColor='white'
      paddingVertical='small'
      style={{
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
      }}
    >
      <Link to={{ screen: '' }} onPress={handleLinkPress}>
        <Image source={ChevronLeft} style={{ width: 30, height: 30 }} />
      </Link>
      <Text
        variant='body'
        numberOfLines={1}
        color='secondarySalmon'
        style={{ fontSize: 18, fontWeight: '600', paddingBottom: 3 }}
      >
        {title}
      </Text>
    </Box>
  )
}

export default StackNavigationHeader
