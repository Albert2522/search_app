import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  button: {
    margin: 50,
    paddingTop: 40,
    marginVertical: 500,
    borderTopColor: Colors.fire,
    borderBottomColor: Colors.bloodOrange,
    borderTopWidth: 100,
    borderBottomWidth: 100,
    backgroundColor: Colors.ember
  },
  buttonText: {
    margin: 5,
    marginTop: 15,
    borderColor: '#B0C4DE',
    borderWidth: 2,
    borderRadius: 5,
    padding: 15,
    paddingTop: 3,
    paddingBottom: 5,
    shadowColor: Colors.snow,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 15,
    shadowOpacity: 1.0
  },
  textForButton: {
    color: Colors.snow,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.bold
  }
})
