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

import ExternalLinkIcon from '../../graphics/external-link.png'

const Text = createText<Theme>()

const HEIGHT = 80
const SHADOW_HEIGHT = 5

interface CardProps {
  title: string
  linkTo: any
}

function KnownFor({ title, linkTo }: CardProps) {
  return (
    <View style={{ flexDirection: 'column' }}>
      <UIKittenCard style={{borderRadius: 8}}>
        <View>
          <Text variant='body' numberOfLines={1} style={{ fontWeight: '600' }}>
            Known for
          </Text>
          <Text variant='body' numberOfLines={1}>
            <Link
              to={linkTo}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Image
                source={ExternalLinkIcon}
                style={{ width: 16, height: 16 }}
              />
              <Text variant='body' marginLeft='tiny'>{title}</Text>
            </Link>
          </Text>
        </View>
      </UIKittenCard>

      <View style={{ height: SHADOW_HEIGHT, paddingLeft: 8, borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}>
        <Image source={Shadow} resizeMode='stretch' style={{ flex: 1 }} />
      </View>
    </View>
  )
}

export default KnownFor
