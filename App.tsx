import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet, Text, View } from 'react-native'

import { createClient, Provider, useQuery } from 'urql'

import Slider from '@react-native-community/slider'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import Carousel from 'react-native-snap-carousel'

import { Link, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import theme, { Theme } from './theme'

const client = createClient({
  url: 'http://shoopshoop.au.ngrok.io/graphql',
})

const FilmsQuery = `
query {
  films {
    _id
    title
    year
    image
    directors {
      name
      lexKey
      birthYear
      deathYear
    }
  }
}`

const FilmQuery = `
query film($id: ID!) {
  film(_id: $id) {
    _id
    title
    year
    directors {
      name
      lexKey
      birthYear
      deathYear
    }
    originalTitle
    image
    plot
    directorsText
    writers
    stars
    wikipedia {
      plotShort {
        plainText
        html
      }
      plotFull {
        plainText
        html
      }
    }
  }
}
`

type Film = {
  _id: number
  title: string
  directors: number[] | object[]
  year: number
  imdbID: string
  originalTitle: string
  image: string
  plot: string
  directorsText: string
  writers: string
  stars: string
  wikipedia: {
    plotShort: object
    plotFull: object
  }
}

type FilmsResult = {
  films: Film[]
}

type FilmResult = {
  film: Film
}

interface FilmProps {
  id: number
}

interface FilmCarouselContainerProps {
  sliderWidth: number
  itemWidth: number
}

function FilmCarouselContainer({
  sliderWidth,
  itemWidth,
}: FilmCarouselContainerProps) {
  const [result, reexecuteQuery] = useQuery<FilmsResult>({
    query: FilmsQuery,
  })

  const { data, fetching, error } = result

  if (fetching) return <Text>Loading...</Text>
  if (error) return <Text>Oh no... {error.message}</Text>

  if (data) {
    return (
      <FilmCarousel
        entries={data.films}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    )
  }
  return null
}

interface FilmCarouselProps {
  entries: Film[]
  sliderWidth: number
  itemWidth: number
}

function FilmCarousel({ entries, sliderWidth, itemWidth }: FilmCarouselProps) {
  const _renderItem = useCallback(
    ({ item, index }: { item: Film; index: number }) => {
      return (
        <View>
          <Link style={{}} to={{ screen: 'Detail', params: { id: item._id } }}>
            <View style={{ width: 280, height: 280 }}>
              <Image
                source={{ uri: item.image }}
                style={{ flex: 1, resizeMode: 'contain' }}
              />
            </View>
          </Link>

          <Text>{item.title}</Text>
        </View>
      )
    },
    []
  )

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Carousel
        layout='default'
        ref={(c) => {
          // @ts-ignore
          if (this) this._carousel = c
        }}
        data={entries}
        renderItem={_renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        containerCustomStyle={{ backgroundColor: '#ccc', flex: 1 }}
        slideStyle={{ backgroundColor: '#f0d0e0', flex: 1 }}
      />
    </View>
  )
}


function FilmCarouselScreen() {
  return (
    <View style={styles.container}>
      {/* <Text>{currentIndex}</Text> */}
      {/* <Film id={currentIndex} />
  <Slider
    style={{ width: 300, height: 40 }}
    minimumValue={1}
    maximumValue={60}
    step={1}
    minimumTrackTintColor="#777777"
    maximumTrackTintColor="#000000"
    onSlidingComplete={(v) => {
      setCurrentIndex(v);
    }}
  /> */}
      <FilmCarouselContainer sliderWidth={300} itemWidth={280} />
    </View>
  )
}

function DetailsScreen({ route }: { route: any }) {
  const { id } = route.params

  console.log(`id=${id}`)

  const [result, reexecuteQuery] = useQuery<FilmResult>({
    query: FilmQuery,
    variables: {
      id: String(id),
    },
  })

  const { data, fetching, error } = result

  if (fetching) return <Text>Loading...</Text>
  if (error) return <Text>Oh no... {error.message}</Text>

  if (data) {
    const film = data.film
    return (
      <View>
        <Text>{JSON.stringify(film)}</Text>
      </View>
    )
  }
  return null

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  )
}

const Stack = createStackNavigator()

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(1)

  return (
    <NavigationContainer>
      <Provider value={client}>
        <Stack.Navigator>
          <Stack.Screen name='Carousel' component={FilmCarouselScreen} />
          <Stack.Screen name='Detail' component={DetailsScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
