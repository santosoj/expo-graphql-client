import { Dimensions, StyleSheet, useWindowDimensions, View } from 'react-native'

import { createClient, Provider, useQuery } from 'urql'

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

const Box = createBox<Theme>()
const Text = createText<Theme>()

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
  return (
    <Screen>
      <Text>hehehe</Text>
    </Screen>
  )
}

const Stack = createStackNavigator()

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Provider value={client}>
          <Stack.Navigator>
            <Stack.Screen name='FilmList' component={FilmListScreen} />
            {/* <Stack.Screen name='Detail' component={DetailsScreen} /> */}
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
