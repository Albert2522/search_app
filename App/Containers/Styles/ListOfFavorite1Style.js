import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: 'rgb(62, 37, 63)'
  },
  row: {
    flexDirection: "row",
    justifyContent: 'space-between',
    borderRadius: 15,
    padding: 0,
    paddingLeft: 5,
    paddingBottom: 5,
    backgroundColor: '#B0C4DE',
    marginVertical: 10
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: "red"
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  titleAndPrice: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingRight: 10,
    width: 200,
    marginTop: 15,
    marginBottom: 10
  }
})
