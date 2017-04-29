import React from 'react'
import { AsyncStorage, TouchableOpacity, Image, View, Text, ListView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import styles from './Styles/ListOfFavorite1Style'

export default class ListOfFavorite1 extends React.Component {

  state: {
    dataSource: Object
  }

  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    this.state = {
      dataSource: ds.cloneWithRows({}),
      favoriteItems: []
    }
    this.deleteFromFavorite = this.deleteFromFavorite.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  componentDidMount() {
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    AsyncStorage.getAllKeys((err, keys) => {
      keys.map( key => {
        if (key.includes("@SearchAppFavorite:")) {
          AsyncStorage.getItem(key,(err, result) => {
            let arr = this.state.favoriteItems
            arr.push(JSON.parse(result))
            this.setState({favoriteItems: arr,
              dataSource: ds.cloneWithRows(arr)
            })
          })
        }
      })
    })
  }

  deleteFromFavorite(item) {
    let key = "@SearchAppFavorite:" + item.url
    let arr = this.state.favoriteItems
    this.props.deleteStar(item)
    let index = arr.indexOf(item)
    if (index > -1) {
      arr.splice(index, 1)
    }
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    this.setState({favoriteItems: arr,
      dataSource: ds.cloneWithRows(arr)
    })
  }

  renderRow (rowData) {
    let length = rowData.title.length > 30 ? 30 : rowData.title.length;
    let counter = 0;
    for (let i = 0; i < length; i++) {
      if (rowData.title[i] >= 'A' && rowData.title[i] <= 'Z') {counter++;}
    }
    let title = "";
    if (counter >= 10) {
      title = rowData.title.substring(0, 20);
    } else {
      title = rowData.title.substring(0, 30);
    }
    let price = rowData.price
    if (rowData.title.length <= 21) {title = title + '\n'}
    if (rowData.title.length > 30) { title += '...'}
    return (
        <View>
          <TouchableOpacity onPress={() => this.props.showItem(rowData)}>
            <View style={styles.row}>
              <View>
                <Image style={{width: 170, height: 130, marginTop:5, borderRadius: 15}}
                  source={{url: rowData.image_url}}
                  />
              </View>
              <View style={styles.titleAndPrice}>
                <Text style={styles.boldLabel}>{rowData.title}</Text>
                <Text style={styles.label}>{price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        <View style={{position: "absolute", top: 18, left: 150}}>
          <Icon.Button onPress={() => this.deleteFromFavorite(rowData)} name="star" size={25} color="red" backgroundColor="transparent" style={{padding: 0}} />
        </View>
      </View>
    )
  }

  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  renderFooter = () => {
    return (
      <Text></Text>
    )
  }

  render () {
    if (this.state.favoriteItems.length != 0) {
      return (
        <View style={styles.container}>
          <ListView
            contentContainerStyle={styles.listContent}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderFooter={this.renderFooter}
            enableEmptySections
            pageSize={15}
          />
        </View>
    )
    } else {
      return (
      <View style={[styles.container, {padding: 130}]}>
        <Text style={{color: "white"}}>No favorite items</Text>
      </View>)
    }
  }
}
