import React, { useEffect } from 'react'
import { FlatList, Image, ScrollView, StyleSheet } from 'react-native'
import { Link, Route } from '@react-navigation/native'
import { createBox, createText, useTheme } from '@shopify/restyle'

import ExternalLink from '../../components/ExternalLink'

import { useQuery } from 'urql'
import getFilm from '../../graphql/getFilm.graphql'

import { StackParamList } from '../types'
import { StackScreenProps } from '@react-navigation/stack'

import { Theme } from '../../theme/restyle-theme'

import ExternalLinkIcon from '../../graphics/external-link.png'
import IMDBIcon from '../../graphics/imdb.png'
import WikipediaIcon from '../../graphics/wikipedia.png'

import { FilmImages } from '../../assets/content-images'

const Box = createBox<Theme>()
const Text = createText<Theme>()

function FilmDetail({
  route,
  navigation,
}: StackScreenProps<StackParamList, 'Film'>) {
  const { id } = route.params

  const { colors } = useTheme<Theme>()

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
    <ScrollView style={{backgroundColor: colors.white}}>
      {!!film && (
        <Box paddingBottom='huge'>
          <Image
            source={FilmImages[Number(film._id)]}
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
              {film.wikipedia.plotShort.plainText.split('\n').join('\n\n')}
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
        </Box>
      )}
    </ScrollView>
  )
}

export default FilmDetail
