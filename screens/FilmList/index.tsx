import { useCallback, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { createBox } from '@shopify/restyle'

import { Client as GraphQLClient, useQuery } from 'urql'

import allFilms from '../../graphql/getAllFilms.graphql'

import Card from '../../components/Card'
import SortControl from '../../components/SortControl'

import { Theme } from '../../theme/restyle-theme'

import SampleImage from '../../components/Card/sampleImage.jpg'
import { useEffect } from 'react'

const Box = createBox<Theme>()

function FilmList() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [toggleStatus, setToggleStatus] = useState(false)

  const [{ fetching, data, error }] = useQuery({
    query: allFilms,
    variables: {},
  })

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <Card
        line1={item.title}
        line2={item.year}
        line3={item.directorsText}
        imageSource={{ uri: item.image }}
      />
    )
  }, [])

  if (fetching) {
    return <Text>`Loading...`</Text>
  } else if (error) {
    return <Text>`Oh no! Error: ${error}`</Text>
  }

  return (
    <Box flex={1} backgroundColor='white' style={{ paddingTop: 32 }}>
      <SortControl
        options={['Title', 'Year']}
        selectedIndex={selectedIndex}
        toggleStatus={toggleStatus}
        onSelectedIndexChanged={setSelectedIndex}
        onToggleStatusChanged={setToggleStatus}
      />
      <Box style={{ paddingTop: 32, flex: 1 }}>
        <FlatList
          data={data.films}
          renderItem={renderItem}
          style={[
            { minHeight: 'min-content', paddingBottom: 150 },
          ]}
        />
      </Box>
    </Box>
  )
}

export default FilmList
