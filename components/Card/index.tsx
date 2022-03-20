import { createBox, createText } from '@shopify/restyle'
import { Card as UIKittenCard } from '@ui-kitten/components'
import React from 'react'
import {
  GestureResponderEvent,
  Image,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native'
import { Theme } from '../../theme/restyle-theme'
import Shadow from './shadow.png'

const Box = createBox<Theme>()
const Text = createText<Theme>()

const HEIGHT = 80
const SHADOW_HEIGHT = 5

interface CardProps {
  line1: string
  line2: string
  line3: string
  imageSource: ImageSourcePropType
  onPress: (event: GestureResponderEvent) => void
}

function Card({ line1, line2, line3, imageSource, onPress }: CardProps) {
  return (
    <Box flexDirection='column' paddingBottom='tiny'>
      <UIKittenCard onPress={onPress}>
        <Box flexDirection='row' justifyContent='space-between'>
          <Box flexGrow={1}>
            <Box style={{ height: HEIGHT, justifyContent: 'space-between' }}>
              <Text
                variant='body'
                numberOfLines={1}
                style={{ fontSize: 18, fontWeight: '600' }}
              >
                {line1}
              </Text>
              <Text variant='body' numberOfLines={1}>
                {line2}
              </Text>
              <Text variant='body' numberOfLines={1}>
                {line3}
              </Text>
            </Box>
          </Box>
          <Box flexGrow={0}>
            <Image
              source={imageSource}
              resizeMode='cover'
              style={{ width: HEIGHT, height: HEIGHT }}
            />
          </Box>
        </Box>
      </UIKittenCard>
      <Box>
        <ImageBackground source={Shadow} style={{ height: SHADOW_HEIGHT }} />
      </Box>
    </Box>
  )
}

export default Card
