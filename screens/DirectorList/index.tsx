import { useCallback, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { Link } from '@react-navigation/native'
import { createBox } from '@shopify/restyle'

import { useQuery } from 'urql'

import allDirectors from '../../graphql/getAllDirectors.graphql'

import Card from '../../components/Card'
import SortControl, {
  DisplayNameSortOption,
  sortOptionDisplayName,
  sortOptionKey,
} from '../../components/SortControl'

import { Theme } from '../../theme/restyle-theme'

import PersonPlaceholder from '../../graphics/personPlaceholder.png'

const MAXINT32 = 0x7fffffff

const Box = createBox<Theme>()

function DirectorList() {
  const sortOptions: DisplayNameSortOption[] = [
    { displayName: 'Name', key: 'lexKey' },
    { displayName: 'Year of birth', key: 'birthYear' },
    { displayName: 'Year of death', key: 'deathYear' },
  ]

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [toggleStatus, setToggleStatus] = useState(false)

  const [{ fetching, data, error }] = useQuery({
    query: allDirectors,
    variables: {
      fields: [sortOptions[selectedIndex].key],
      order: [toggleStatus ? 'desc' : 'asc'],
    },
  })

  const renderItem = useCallback(({ item }: { item: any }) => {
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
        linkTo={{ screen: 'Director', params: { id: item._id } }}
      />
    )
  }, [])

  return (
    <Box flex={1} backgroundColor='white' style={{ paddingTop: 32 }}>
      <SortControl
        options={sortOptions.map(sortOptionDisplayName)}
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
            style={[{ minHeight: 'min-content', paddingBottom: 150 }]}
          />
        )}
      </Box>
    </Box>
  )
}

export default DirectorList
