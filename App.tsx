import {
  Dimensions,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
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
import { createStackNavigator, StackHeaderProps, StackNavigationOptions } from '@react-navigation/stack'
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
import TabbedStackNavigationHeader from './components/TabbedStackNavigationHeader'

import FilmDetail from './screens/FilmDetail'
import FilmList from './screens/FilmList'
import DirectorList from './screens/DirectorList'
import DirectorDetail from './screens/DirectorDetail'

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

function AboutScreen() {
  return <Text>AboutScreen</Text>
}

const stackScreenOptions = ({ colors }: Theme) => ({
  headerStyle: { backgroundColor: colors.white },
  headerTintColor: colors.black,
  headerTitleStyle: { fontFamily: 'Barlow' },
})

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

function StackHeader(props: StackHeaderProps) {
  const {
    navigation,
    options: { headerShown, title },
    route: { name: currentRouteName },
  } = props
  const index = {
    Films: 0,
    Film: 0,
    Directors: 1,
    Director: 1,
    About: 2,
  }[currentRouteName]

  const navState = props.navigation.getState()
  const stackHeaderShown = ['Film', 'Director'].includes(currentRouteName)

  return (
    <>
      <TopTabBar
        navigation={navigation}
        state={{ index, routeNames: ['Films', 'Directors', 'About'] }}
      />
      {stackHeaderShown && (
        <TabbedStackNavigationHeader title={title} navigation={props.navigation} />
      )}
    </>
  )
}

export default function App() {
  const [fontsLoaded, setFontsLoded] = useState(false)
  const _theme = useTheme<Theme>()

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
            <ResponsiveScreen>
              <AppHeader />
              <Stack.Navigator screenOptions={{ header: StackHeader }}>
                <Stack.Screen
                  name='Films'
                  component={FilmList}
                />
                <Stack.Screen
                  name='Film'
                  component={FilmDetail}
                  options={{ title: '' }}
                />
                <Stack.Screen
                  name='Directors'
                  component={DirectorList}
                />
                <Stack.Screen
                  name='Director'
                  component={DirectorDetail}
                  options={{ title: '' }}
                />
              </Stack.Navigator>
            </ResponsiveScreen>
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeProvider>
    </GraphQLProvider>
  )
}

type asgkdfg = StackNavigationOptions