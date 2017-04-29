import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginTop: 10,
    paddingTop: 0,
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    width: Metrics.screenWidth/3 - Metrics.doubleBaseMargin,
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: '#D8BFD8',
    borderRadius: Metrics.smallMargin
  },
  sectionHeader: {
    width: Metrics.screenWidth,
    alignSelf: 'center',
    backgroundColor: 'rgb(62, 37, 63)'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    textAlign: 'left',
    color: 'black',
    fontSize: 10
  },
  price: {
    alignSelf: 'center',
    color: Colors.snow,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  listContent: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  spinner: {
    position: 'absolute',
    top: Metrics.screenHeight / 2 - Metrics.doubleBaseMargin - 65,
    left: Metrics.screenWidth / 2 - Metrics.doubleBaseMargin,
    transform: [{scale: 2.5}]
  },
  spinnerText: {
    color: "white",
    backgroundColor: "transparent",
    fontSize: Fonts.size.h6
  }
})
