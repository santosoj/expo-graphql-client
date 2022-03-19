import { useCallback, useRef, useState } from 'react'
import { FlatList, GestureResponderEvent, StyleSheet, Text } from 'react-native'
import { Link } from '@react-navigation/native'
import { createBox } from '@shopify/restyle'

import { useQuery } from 'urql'

import allDirectors from '../../graphql/getAllDirectors.graphql'

import Card from '../../components/Card'
import SortControl, {
  DisplayNameSortOption,
  toggleSortDirections,
} from '../../components/SortControl'

import { Theme } from '../../theme/restyle-theme'

import PersonPlaceholder from '../../graphics/personPlaceholder.png'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamList } from '../types'

const MAXINT32 = 0x7fffffff

const Box = createBox<Theme>()

function DirectorList({ navigation }: StackScreenProps<StackParamList, 'Directors'>) {
  const sortOptions: DisplayNameSortOption[] = [
    {
      displayName: 'Name',
      args: { sortDirections: ['asc'], keys: ['lexKey'] },
    },
    {
      displayName: 'Year of birth',
      args: { sortDirections: ['asc', 'asc'], keys: ['birthYear', 'lexKey'] },
    },
    {
      displayName: 'Year of death',
      args: {
        sortDirections: ['asc', 'asc', 'asc'],
        keys: ['deathYear', 'birthYear', 'lexKey'],
      },
    },
  ]

  const [selectedIndex, setSelectedIndex] = useState(2)
  const [toggleStatus, setToggleStatus] = useState(false)

  const [{ fetching, data, error }] = useQuery({
    query: allDirectors,
    variables: {
      fields: sortOptions[selectedIndex].args.keys,
      order: toggleSortDirections(
        sortOptions[selectedIndex].args.sortDirections,
        toggleStatus
      ),
    },
  })

  const renderItem = useCallback(({ item }: { item: any }) => {
    const handleCardPress = () => {
      navigation.navigate('Director', { id: Number(item._id) })
    }

    return (
      <Card
        line1={item.name}
        line2={`${item.birthYear}${
          item.deathYear !== MAXINT32
            ? `\u2000\u2014\u2000${item.deathYear}`
            : ''
        }`}
        line3={item.film.title}
        imageSource={
          !!item.thumbnail ? { uri: item.thumbnail.source } : PersonPlaceholder
        }
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
      <Box style={{ paddingTop: 32, flex: 1 }}>
        {!!data?.directors && (
          <FlatList
            data={data.directors}
            renderItem={renderItem}
            keyExtractor={(_, index) => String(index)}
            contentContainerStyle={{paddingBottom: 150}}
          />
        )}
      </Box>
    </Box>
  )
}

export default DirectorList
