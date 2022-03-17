import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Image, StyleSheet } from 'react-native'
import { Link, Route } from '@react-navigation/native'
import { createBox, createText } from '@shopify/restyle'

import ExternalLink from '../../components/ExternalLink'

import { useQuery } from 'urql'
import getDirector from '../../graphql/getDirector.graphql'

import { Theme } from '../../theme/restyle-theme'
import { StackScreenProps } from '@react-navigation/stack'

import ExternalLinkIcon from '../../graphics/external-link.png'
import PersonPlaceholder from '../../graphics/personPlaceholder.png'
import WikipediaIcon from '../../graphics/wikipedia.png'
import { useEffect } from 'react'

const Box = createBox<Theme>()
const Text = createText<Theme>()

const MAXINT32 = 0x7fffffff

type DirectorStackParamList = {
  Directors: undefined
  Director: { id: number }
}

function DirectorDetail({
  route,
  navigation,
}: StackScreenProps<DirectorStackParamList, 'Director'>) {
  const { id } = route.params

  const [{ fetching, data, error }] = useQuery({
    query: getDirector,
    variables: {
      id: String(id),
    },
  })

  const director = data?.director

  useEffect(() => {
    if (director) {
      console.log(JSON.stringify(director))
      navigation.setOptions({ title: director.name })
    }
  }, [director])

  return (
    <Box
      flex={1}
      backgroundColor='white'
      style={{ overflow: 'scroll', paddingBottom: 150 }}
    >
      {!!director && (
        <>
          <Image
            source={director.film.image}
            style={{ height: 240 }}
            resizeMode='cover'
          />
          <Box flexDirection='row' paddingTop='medium'>
            <Box>
              <Image
                source={
                  !!director.thumbnail
                    ? { uri: director.thumbnail.source }
                    : PersonPlaceholder
                }
                style={{ width: 80, height: 80, marginTop: 8, marginRight: 16 }}
              />
            </Box>
            <Box>
              <Text variant='subheader'>
                {director.name}
              </Text>
              <Box flexDirection='row' alignItems='center'>
                <>
                  <Text variant='body'>{`${director.birthYear}${
                    director.deathYear !== MAXINT32
                      ? `\u2000\u2014\u2000${director.deathYear}`
                      : ''
                  }`}</Text>
                </>
              </Box>
            </Box>
          </Box>
          <Box>
            {/* KnownFor */}
            <Text variant='body' paddingTop='medium' paddingRight='small'>
              {director.extract}
            </Text>
            <Box flexDirection='row' paddingTop='medium'>
              {!!director.contentURLs && (
                <ExternalLink href={director.contentURLs.desktop.page}>
                  <Image
                    source={WikipediaIcon}
                    style={{ width: 64, height: 32 }}
                  />
                </ExternalLink>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default DirectorDetail
