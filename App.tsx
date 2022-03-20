import * as eva from '@eva-design/eva'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import {
  createBox,
  createText,
  ThemeProvider,
  useTheme,
} from '@shopify/restyle'
import {
  ApplicationProvider,
  Icon,
  IconRegistry,
  Tab,
  TabBar,
} from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { createClient, Provider as GraphQLProvider } from 'urql'
import AppHeader from './components/AppHeader'
import ResponsiveScreen from './components/ResponsiveScreen'
import { allSortArgs } from './components/SortControl/sorting'
import TabbedStackNavigationHeader from './components/TabbedStackNavigationHeader'
import getAllDirectors from './graphql/getAllDirectors.graphql'
import getAllFilms from './graphql/getAllFilms.graphql'
import getDirector from './graphql/getDirector.graphql'
import getFilm from './graphql/getFilm.graphql'
import DirectorDetail from './screens/DirectorDetail'
import DirectorList, { DirectorListSortOptions } from './screens/DirectorList'
import FilmDetail from './screens/FilmDetail'
import FilmList, { FilmListSortOptions } from './screens/FilmList'
import theme, { Theme } from './theme/restyle-theme'
import { default as kittenMapping } from './theme/ui-kitten-mapping.json'
import { default as kittenTheme } from './theme/ui-kitten-theme.json'

const Box = createBox<Theme>()
const Text = createText<Theme>()

const client = createClient({
  url: 'http://shoopshoop.au.ngrok.io/graphql',
})

const preload = () => {
  return Promise.all([
    Font.loadAsync({
      Barlow: require('./assets/font/Barlow-Regular.ttf'),
      'Barlow-bold': require('./assets/font/Barlow-Bold.ttf'),
      'Barlow Semi Condensed': require('./assets/font/BarlowSemiCondensed-Regular.ttf'),
      'Barlow Semi Condensed-bold': require('./assets/font/BarlowSemiCondensed-Bold.ttf'),
      'Barlow Semi Condensed-light': require('./assets/font/BarlowSemiCondensed-Light.ttf'),
      'Barlow Semi Condensed-medium': require('./assets/font/BarlowSemiCondensed-Medium.ttf'),
    }),
    Promise.all(
      allSortArgs(FilmListSortOptions).map((args) =>
        client.query(getAllFilms, args).toPromise()
      )
    ),
    Promise.all(
      allSortArgs(DirectorListSortOptions).map((args) =>
        client.query(getAllDirectors, args).toPromise()
      )
    ),
    Promise.all(
      [...new Array(61).keys()]
        .slice(1)
        .map((i) => client.query(getFilm, { id: String(i) }).toPromise())
    ),
    Promise.all(
      [...new Array(64).keys()]
        .slice(1)
        .map((i) => client.query(getDirector, { id: String(i) }).toPromise())
    ),
  ]) as unknown as Promise<void>
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
        <TabbedStackNavigationHeader
          title={title}
          navigation={props.navigation}
        />
      )}
    </>
  )
}

export default function App() {
  const [preloaded, setPreloaded] = useState(false)
  const _theme = useTheme<Theme>()

  if (!preloaded) {
    return (
      <AppLoading
        startAsync={preload}
        onFinish={() => {
          setPreloaded(true)
        }}
        onError={() => {}}
      >
        <Text>piselipis</Text>
      </AppLoading>
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
                <Stack.Screen name='Films' component={FilmList} />
                <Stack.Screen
                  name='Film'
                  component={FilmDetail}
                  options={{ title: '' }}
                />
                <Stack.Screen name='Directors' component={DirectorList} />
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
