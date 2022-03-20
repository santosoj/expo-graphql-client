import { Image, View } from 'react-native'
import Logo from '../../graphics/logo.png'

function AppHeader({}) {
  return (
    <View style={{ paddingTop: 32, paddingBottom: 16 }}>
      <Image
        source={Logo}
        style={{ height: 64, width: 'auto' }}
        resizeMode='contain'
      />
    </View>
  )
}

export default AppHeader
