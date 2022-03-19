import { useCallback, useRef, useState } from 'react'
import { FlatList, GestureResponderEvent, StyleSheet, Text } from 'react-native'
import { Link } from '@react-navigation/native'
import { createBox } from '@shopify/restyle'

import { StackParamList } from '../types'
import { StackScreenProps } from '@react-navigation/stack'

import { useQuery } from 'urql'

// import allDirectors from '../../graphql/getAllDirectors.graphql'
import getDirector from '../../graphql/getDirector.graphql'
import allFilms from '../../graphql/getAllFilms.graphql'

import Card from '../../components/Card'
import SortControl from '../../components/SortControl'

import { Theme } from '../../theme/restyle-theme'

import { FilmImages } from '../../assets/content-images'

const Box = createBox<Theme>()

function FilmList({ navigation }: StackScreenProps<StackParamList, 'Films'>) {
  const sortOptions = ['Title', 'Year']

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [toggleStatus, setToggleStatus] = useState(false)

  const [{ fetching, data, error }] = useQuery({
    query: allFilms,
    variables: {
      fields: [sortOptions[selectedIndex].toLowerCase()],
      order: [toggleStatus ? 'desc' : 'asc'],
    },
  })

  const renderItem = useCallback(({ item }: { item: any }) => {
    const handleCardPress = () => {
      navigation.navigate('Film', { id: Number(item._id) })
    }

    return (
      <Card
        line1={item.title}
        line2={item.year}
        line3={item.directorsText}
        imageSource={FilmImages[Number(item._id)]}
        onPress={handleCardPress}
      />
    )
  }, [])

  return (
    <Box flex={1} backgroundColor='white' style={{ paddingTop: 32 }}>
      <SortControl
        options={sortOptions}
        selectedIndex={selectedIndex}
        toggleStatus={toggleStatus}
        onSelectedIndexChanged={setSelectedIndex}
        onToggleStatusChanged={setToggleStatus}
      />
      <Box flex={1} style={{ paddingTop: 32 }}>
        {!!data?.films && (
          <FlatList
            data={data.films}
            renderItem={renderItem}
            keyExtractor={(_, index) => String(index)}
            contentContainerStyle={{paddingBottom: 150}}
          />
        )}
      </Box>
    </Box>
  )
}

export default FilmList
