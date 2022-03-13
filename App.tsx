import { Dimensions, StyleSheet, useWindowDimensions, View } from 'react-native'

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

import theme, { Theme } from './theme'

import getAllDirectors from './graphql/getAllDirectors.graphql'
import getDirector from './graphql/getDirector.graphql'

import getAllFilms from './graphql/getAllFilms.graphql'
import getFilm from './graphql/getFilm.graphql'

const Box = createBox<Theme>()
const Text = createText<Theme>()

const client = createClient({
  url: 'http://shoopshoop.au.ngrok.io/graphql',
})

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

  if (fetching) {
    return <Text>`Loading...`</Text>
  } else if (error) {
    return <Text>`Oh no! Error: ${error}`</Text>
  }

  // const data = { films: {} }

  return (
    <Screen>
      <Text>hehehe</Text>
      <Text>{JSON.stringify(data.director)}</Text>
    </Screen>
  )
}

const Stack = createStackNavigator()

export default function App() {
  return (
    <GraphQLProvider value={client}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='FilmList' component={FilmListScreen} />
            {/* <Stack.Screen name='Detail' component={DetailsScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </GraphQLProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
