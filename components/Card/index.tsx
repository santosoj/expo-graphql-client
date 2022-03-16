import {
  Image,
  ImageRequireSource,
  ImageSourcePropType,
  View,
} from 'react-native'
import { createText } from '@shopify/restyle'
import { Card as UIKittenCard } from '@ui-kitten/components'

import { Theme } from '../../theme/restyle-theme'

import Shadow from './shadow.png'
import React, { useCallback } from 'react'
import { Link } from '@react-navigation/native'

const Text = createText<Theme>()

const HEIGHT = 80
const SHADOW_HEIGHT = 5

interface CardProps {
  line1: string
  line2: string
  line3: string
  imageSource: ImageSourcePropType
  linkTo?: any
}

function Card({ line1, line2, line3, imageSource, linkTo }: CardProps) {

  const MaybeLink: ({
    children,
  }: {
    children: React.ReactNode
  }) => JSX.Element = useCallback(
    ({ children }) => {
      return linkTo ? <Link to={linkTo}>{children}</Link> : <>{children}</>
    },
    [linkTo]
  )

  return (
    <View style={{ flexDirection: 'column' }}>
      <UIKittenCard>
        <MaybeLink>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                height: HEIGHT,
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <View style={{ height: HEIGHT, justifyContent: 'space-between' }}>
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
              </View>
            </View>

            <View style={{ height: HEIGHT, justifyContent: 'center' }}>
              <View style={{ height: HEIGHT, justifyContent: 'space-between' }}>
                <View
                  style={{
                    width: HEIGHT,
                    height: HEIGHT,
                  }}
                >
                  <Image
                    source={imageSource}
                    resizeMode='cover'
                    style={{ width: HEIGHT, height: HEIGHT }}
                  />
                </View>
              </View>
            </View>
          </View>
        </MaybeLink>
      </UIKittenCard>

      <View style={{ height: SHADOW_HEIGHT }}>
        <Image source={Shadow} resizeMode='stretch' style={{ flex: 1 }} />
      </View>
    </View>
  )
}

export default Card
