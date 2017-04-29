import { StackNavigator } from 'react-navigation'
import ListOfFavorite1 from '../Containers/ListOfFavorite1'
import ListOfItems from '../Containers/ListOfItems'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ListOfFavorite1: { screen: ListOfFavorite1 },
  ListOfItems: { screen: ListOfItems },
  LaunchScreen: { screen: LaunchScreen },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: { title: 'Login' }
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    header: {
      style: styles.header
    }
  }
})

export default PrimaryNav
