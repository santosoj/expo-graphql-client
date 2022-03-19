import React, { useEffect } from 'react'
import { FlatList, Image, ScrollView, StyleSheet } from 'react-native'
import { Link, Route } from '@react-navigation/native'
import { createBox, createText, useTheme } from '@shopify/restyle'

import { StackScreenProps } from '@react-navigation/stack'

import { useQuery } from 'urql'
import getDirector from '../../graphql/getDirector.graphql'

import ExternalLink from '../../components/ExternalLink'
import KnownFor from '../../components/KnownFor'

import { Theme } from '../../theme/restyle-theme'

import ExternalLinkIcon from '../../graphics/external-link.png'
import PersonPlaceholder from '../../graphics/personPlaceholder.png'
import WikipediaIcon from '../../graphics/wikipedia.png'

import { DirectorImages } from '../../assets/content-images'

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
  const { colors } = useTheme<Theme>()

  const [{ fetching, data, error }] = useQuery({
    query: getDirector,
    variables: {
      id: String(id),
    },
  })

  const director = data?.director

  useEffect(() => {
    if (director) {
      navigation.setOptions({ title: director.name })
    }
  }, [director])

  return (
    <ScrollView style={{backgroundColor: colors.white}}>
      {!!director && (
        <Box paddingBottom='huge'>
          <Image
            source={DirectorImages[Number(director._id)]}
            style={{ height: 240 }}
            resizeMode='cover'
          />
          <Box flexDirection='row' paddingTop='large' paddingBottom='medium'>
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
              <Text variant='subheader'>{director.name}</Text>
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
            <Box paddingRight='tiny'>
              <KnownFor
                title={director.film.title}
                linkTo={{ screen: 'Film', params: { id: director.film._id } }}
              />
            </Box>
            <Text variant='body' paddingTop='small' paddingRight='small'>
              {director.extract}
            </Text>
            <Box flexDirection='row' paddingTop='medium' alignItems='center'>
              {!!director.contentURLs && (
                <ExternalLink href={director.contentURLs.desktop.page}>
                  <Image
                    source={WikipediaIcon}
                    style={{ width: 34, height: 34 }}
                  />
                </ExternalLink>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </ScrollView>
  )
}

export default DirectorDetail
