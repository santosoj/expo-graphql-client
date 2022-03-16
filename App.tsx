import { Dimensions, StyleSheet, useWindowDimensions, View } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import { createClient, Provider as GraphQLProvider, useQuery } from 'urql'

import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'

import { HeaderTitleProps } from '@react-navigation/elements'

import {
  Link,
  NavigationContainer,
  StackRouter,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Icon, IconRegistry, TabBar, Tab, Layout } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

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
import ResponsiveScreen from './components/ResponsiveScreen'
import AppHeader from './components/AppHeader'

import FilmDetail from './screens/FilmDetail'
import FilmList from './screens/FilmList'

const Box = createBox<Theme>()
const Text = createText<Theme>()

const client = createClient({
  url: 'http://shoopshoop.au.ngrok.io/graphql',
})

const loadFonts = () => {
  return Font.loadAsync({
    Barlow: require('./assets/font/Barlow-Regular.ttf'),
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

function DirectorsScreen() {
  return <Text>DirectorsScreen</Text>
}

function AboutScreen() {
  return <Text>AboutScreen</Text>
}

function FilmStack() {
  const { colors } = useTheme<Theme>()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.white },
        headerTintColor: colors.black,
        headerTitleStyle: { fontFamily: 'Barlow' },
      }}
    >
      <Stack.Screen
        name='Films'
        component={FilmList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Film'
        component={FilmDetail}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  )
}

const Stack = createStackNavigator()
const { Navigator, Screen: TabScreen } = createMaterialTopTabNavigator()

const FilmIcon = (props: any) => <Icon {...props} name='film-outline' />
const DirectorIcon = (props: any) => <Icon {...props} name='person-outline' />
const AboutIcon = (props: any) => (
  <Icon {...props} name='question-mark-outline' />
)

const TopTabBar = ({ navigation, state }: any) => {
  const { breakpoints } = useTheme<Theme>()
  const { width } = useWindowDimensions()

  let filmTitle, directorTitle, aboutTitle
  if (width >= breakpoints.desktopMin) {
    filmTitle = 'FILMS'
    directorTitle = 'DIRECTORS'
    aboutTitle = 'ABOUT'
  }

  return (
    <TabBar
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <Tab title={filmTitle} icon={FilmIcon} />
      <Tab title={directorTitle} icon={DirectorIcon} />
      <Tab title={aboutTitle} icon={AboutIcon} />
    </TabBar>
  )
}

const TabNavigator = () => (
  <Navigator tabBar={(props: any) => <TopTabBar {...props} />}>
    <TabScreen name='FilmsScreen' component={FilmStack} />
    <TabScreen name='DirectorsScreen' component={DirectorsScreen} />
    <TabScreen name='AboutScreen' component={AboutScreen} />
  </Navigator>
)

export default function App() {
  const [fontsLoaded, setFontsLoded] = useState(false)

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoded(true)}
        onError={() => {}}
      />
    )
  }

  return (
    <GraphQLProvider value={client}>
      <ThemeProvider theme={theme}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{ ...eva.light, ...kittenTheme }}
          // @ts-ignore
          customMapping={kittenMapping}
        >
          <NavigationContainer>
            {/* <Stack.Navigator>
            <Stack.Screen name='FilmList' component={FilmListScreen} />
          </Stack.Navigator> */}
            <ResponsiveScreen>
              <AppHeader />
              <TabNavigator />
            </ResponsiveScreen>
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeProvider>
    </GraphQLProvider>
  )
}
