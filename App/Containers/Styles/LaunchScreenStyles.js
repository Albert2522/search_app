import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingTop: 30,
    paddingBottom: Metrics.baseMargin,
    backgroundColor: 'rgb(62, 37, 63)'
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  fourButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  searchLayout: {
  },
  centered: {
    alignItems: 'center'
  },
  searchSettingsModal: {
    width: 135,
    height: 120,
    margin: 0,
    left: -93,
    backgroundColor: "white",
    opacity: 0.99,
    marginTop: 68,
    borderRadius: 15,
    paddingTop: 15,
    paddingLeft: 10
  },
  itemModal: {
    width: 300,
    height: 300,
    marginTop: 110,
    borderRadius: 15,
    paddingTop: 30
  },
  itemTitle: {
    padding: 10,
    textAlign: "center"
  },
  itemPrice: {
    padding: 10,
    color: Colors.fire,
    fontWeight: "bold",
    textAlign: "center"
  },
  buttonGoWeb: {
    padding: 0,
    textAlign: "left"
  },
  settingsLabel: {
    textAlign: "center",
    color: "black",
    fontSize: Fonts.size.h5
  }
})
