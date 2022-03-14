import { Dimensions, StyleSheet, useWindowDimensions, View } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import { createClient, Provider as GraphQLProvider, useQuery } from 'urql'

import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'

import { Link, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import {
  ThemeProvider,
  createBox,
  createText,
  createRestyleComponent,
  createVariant,
  VariantProps,
  useTheme,
} from '@shopify/restyle'

import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'

import { default as kittenTheme } from './theme/ui-kitten-theme.json'
import { default as kittenMapping } from './theme/ui-kitten-mapping.json'

import theme, { Theme } from './theme/restyle-theme'

import getAllDirectors from './graphql/getAllDirectors.graphql'
import getDirector from './graphql/getDirector.graphql'

import getAllFilms from './graphql/getAllFilms.graphql'
import getFilm from './graphql/getFilm.graphql'
import SortControl from './components/SortControl'

const Box = createBox<Theme>()
const Text = createText<Theme>()

const client = createClient({
  url: 'http://shoopshoop.au.ngrok.io/graphql',
})

const loadFonts = () => {
  return Font.loadAsync({
    'Barlow': require('./assets/font/Barlow-Regular.ttf'),
    'Barlow-bold': require('./assets/font/Barlow-Bold.ttf'),
    'Barlow Semi Condensed': require('./assets/font/BarlowSemiCondensed-Regular.ttf'),
    'Barlow Semi Condensed-bold': require('./assets/font/BarlowSemiCondensed-Bold.ttf'),
    'Barlow Semi Condensed-light': require('./assets/font/BarlowSemiCondensed-Light.ttf'),
    'Barlow Semi Condensed-medium': require('./assets/font/BarlowSemiCondensed-Medium.ttf'),
  })
}

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

function Screen({ children }: { children: React.ReactNode }): JSX.Element {
  const { breakpoints } = useTheme<Theme>()
  const { width } = useWindowDimensions()

  return (
    <Box
      flex={1}
      backgroundColor='white'
      style={{
        paddingHorizontal:
          width >= breakpoints.desktopMin
            ? Math.trunc((width - breakpoints.desktopMin) / 2)
            : 0,
      }}
    >
      {children}
    </Box>
  )
}

function FilmListScreen() {

  const [{ fetching, data, error }] = useQuery({
    query: getDirector,
    variables: {
      id: 23,
    }
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [toggleStatus, setToggleStatus] = useState(false)

  if (fetching) {
    return <Text>`Loading...`</Text>
  } else if (error) {
    return <Text>`Oh no! Error: ${error}`</Text>
  }

  // const data = { films: {} }

  return (
    <Screen>
      <SortControl
        options={['Alif', 'Bat', 'Tak']}
        selectedIndex={selectedIndex}
        toggleStatus={toggleStatus}
        onSelectedIndexChanged={setSelectedIndex}
        onToggleStatusChanged={setToggleStatus}
      />
      {/* <Text>hehehe</Text>
      <Text>{JSON.stringify(data.director)}</Text> */}
    </Screen>
  )
}

const Stack = createStackNavigator()

export default function App() {

  const [fontsLoaded, setFontsLoded] = useState(false)

  if (!fontsLoaded) {
    return <AppLoading startAsync={loadFonts} onFinish={() => setFontsLoded(true)} onError={() => {}} />
  }

  return (
    <GraphQLProvider value={client}>
      <ThemeProvider theme={theme}>

      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...kittenTheme }}
        // @ts-ignore
        customMapping={kittenMapping}
      >


        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='FilmList' component={FilmListScreen} />
            {/* <Stack.Screen name='Detail' component={DetailsScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>

      </ApplicationProvider>

      </ThemeProvider>
    </GraphQLProvider>
  )
}
