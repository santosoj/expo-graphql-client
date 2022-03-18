import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Image, StyleSheet } from 'react-native'
import { Link, Route } from '@react-navigation/native'
import { createBox, createText } from '@shopify/restyle'

import ExternalLink from '../../components/ExternalLink'

import { useQuery } from 'urql'
import getFilm from '../../graphql/getFilm.graphql'

import { Theme } from '../../theme/restyle-theme'
import { StackScreenProps } from '@react-navigation/stack'

import ExternalLinkIcon from '../../graphics/external-link.png'
import IMDBIcon from '../../graphics/imdb.png'
import WikipediaIcon from '../../graphics/wikipedia.png'
import { useEffect } from 'react'

const Box = createBox<Theme>()
const Text = createText<Theme>()

type FilmStackParamList = {
  Films: undefined
  Film: { id: number }
}

function FilmDetail({
  route,
  navigation,
}: StackScreenProps<FilmStackParamList, 'Film'>) {
  const { id } = route.params

  const [{ fetching, data, error }] = useQuery({
    query: getFilm,
    variables: {
      id: String(id),
    },
  })

  const film = data?.film

  useEffect(() => {
    if (film) {
      navigation.setOptions({ title: film.title })
    }
  }, [film])

  return (
    <Box
      flex={1}
      backgroundColor='white'
      style={{ overflow: 'scroll', paddingBottom: 150 }}
    >
      {!!film && (
        <>
          <Image
            source={{ uri: film.image }}
            style={{ height: 240 }}
            resizeMode='cover'
          />
          <Box>
            <Text variant='subheader' paddingTop='medium'>
              {film.title}
            </Text>
            <Box flexDirection='row' alignItems='center'>
              <>
                <Text variant='body'>{film.year}</Text>
                {film.directors.map(
                  ({ _id, name }: { _id: string; name: string }) => (
                    <React.Fragment key={_id}>
                      <Text variant='body'>&#x2000;&#x2014;&#x2000;</Text>
                      <Link
                        to={{
                          screen: 'Director',
                          params: { id: _id },
                        }}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Image
                          source={ExternalLinkIcon}
                          style={{ width: 16, height: 16 }}
                        />
                        <Text variant='body'>{name}</Text>
                      </Link>
                    </React.Fragment>
                  )
                )}
              </>
            </Box>
            <Text variant='body' paddingTop='medium' paddingRight='small'>
              {film.wikipedia.plotShort.plainText.replaceAll('\n', '\n\n')}
            </Text>
            <Box flexDirection='row' paddingTop='medium' alignItems='center'>
              <ExternalLink href={`https://www.imdb.com/title/${film.imdbID}/`}>
                <Image source={IMDBIcon} style={{ width: 64, height: 32 }} />
              </ExternalLink>
              <ExternalLink href={film.wikipedia.url}>
                <Image
                  source={WikipediaIcon}
                  style={{ width: 34, height: 34, marginLeft: 16 }}
                />
              </ExternalLink>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default FilmDetail
