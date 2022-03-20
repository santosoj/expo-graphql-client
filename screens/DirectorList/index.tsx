import { StackScreenProps } from '@react-navigation/stack'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { useQuery } from 'urql'
import { DirectorImages } from '../../assets/content-images'
import Card from '../../components/Card'
import SortControl from '../../components/SortControl'
import {
  SortOption,
  toggleSortDirections,
} from '../../components/SortControl/sorting'
import allDirectors from '../../graphql/getAllDirectors.graphql'
import {
  DirectorListItem,
  DirectorListResponse,
  MAXINT32,
} from '../../graphql/types'
import { Box } from '../../theme/restyle-theme'
import { StackParamList } from '../types'

export const DirectorListSortOptions: SortOption[] = [
  {
    displayName: 'Name',
    args: { fields: ['lexKey'], order: ['asc'] },
  },
  {
    displayName: 'Year of birth',
    args: { fields: ['birthYear', 'lexKey'], order: ['asc', 'asc'] },
  },
  {
    displayName: 'Year of death',
    args: {
      fields: ['deathYear', 'birthYear', 'lexKey'],
      order: ['asc', 'asc', 'asc'],
    },
  },
]

function DirectorList({
  navigation,
}: StackScreenProps<StackParamList, 'Directors'>) {
  const [selectedIndex, setSelectedIndex] = useState(2)
  const [toggleStatus, setToggleStatus] = useState(false)

  const [{ fetching, data, error }] = useQuery<DirectorListResponse>({
    query: allDirectors,
    variables: toggleSortDirections(
      DirectorListSortOptions[selectedIndex],
      toggleStatus
    ).args,
  })

  const renderItem = useCallback(({ item }: { item: DirectorListItem }) => {
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
