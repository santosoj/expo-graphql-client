import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { createBox } from '@shopify/restyle'

import { StackScreenProps } from '@react-navigation/stack'
import { StackParamList } from '../types'

import { useQuery } from 'urql'

import allDirectors from '../../graphql/getAllDirectors.graphql'

import Card from '../../components/Card'
import SortControl from '../../components/SortControl'
import {
  SortOption,
  toggleSortDirections,
} from '../../components/SortControl/sorting'

import { Theme } from '../../theme/restyle-theme'

import { DirectorImages } from '../../assets/content-images'

const MAXINT32 = 0x7fffffff

const Box = createBox<Theme>()

export const DirectorListSortOptions: SortOption[] = [
  {
    displayName: 'Name',
    args: { order: ['asc'], fields: ['lexKey'] },
  },
  {
    displayName: 'Year of birth',
    args: { order: ['asc', 'asc'], fields: ['birthYear', 'lexKey'] },
  },
  {
    displayName: 'Year of death',
    args: {
      order: ['asc', 'asc', 'asc'],
      fields: ['deathYear', 'birthYear', 'lexKey'],
    },
  },
]

function DirectorList({
  navigation,
}: StackScreenProps<StackParamList, 'Directors'>) {
  const [selectedIndex, setSelectedIndex] = useState(2)
  const [toggleStatus, setToggleStatus] = useState(false)

  const [{ fetching, data, error }] = useQuery({
    query: allDirectors,
    variables: toggleSortDirections(
      DirectorListSortOptions[selectedIndex],
      toggleStatus
    ).args,
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
        imageSource={DirectorImages[Number(item._id)]}
        onPress={handleCardPress}
      />
    )
  }, [])

  return (
    <Box flex={1} backgroundColor='white' style={{ paddingTop: 32 }}>
      <SortControl
        options={DirectorListSortOptions}
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
            contentContainerStyle={{ paddingBottom: 150 }}
          />
        )}
      </Box>
    </Box>
  )
}

export default DirectorList
