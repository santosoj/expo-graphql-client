import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { createBox } from '@shopify/restyle'

import { StackParamList } from '../types'
import { StackScreenProps } from '@react-navigation/stack'

import { useQuery } from 'urql'

import allFilms from '../../graphql/getAllFilms.graphql'

import Card from '../../components/Card'
import SortControl from '../../components/SortControl'
import {
  SortOption,
  toggleSortDirections,
} from '../../components/SortControl/sorting'

import { Theme } from '../../theme/restyle-theme'

import { FilmImages } from '../../assets/content-images'

const Box = createBox<Theme>()

export const FilmListSortOptions: SortOption[] = [
  {
    displayName: 'Title',
    args: { fields: ['title'], order: ['asc'] },
  },
  {
    displayName: 'Year',
    args: { fields: ['year'], order: ['asc'] },
  },
]

function FilmList({ navigation }: StackScreenProps<StackParamList, 'Films'>) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [toggleStatus, setToggleStatus] = useState(false)

  const [{ fetching, data, error }] = useQuery({
    query: allFilms,
    variables: toggleSortDirections(
      FilmListSortOptions[selectedIndex],
      toggleStatus
    ).args,
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
        options={FilmListSortOptions}
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
            contentContainerStyle={{ paddingBottom: 150 }}
          />
        )}
      </Box>
    </Box>
  )
}

export default FilmList
