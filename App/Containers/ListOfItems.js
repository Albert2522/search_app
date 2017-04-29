import React from 'react'
import {View, AsyncStorage, ListView, Text, Image, TouchableOpacity, TouchableHighlight, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../Themes'
import BusyIndicator from 'react-native-busy-indicator'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './Styles/ListOfItemsStyle'

export default class ListviewSectionsExample extends React.Component {

  constructor (props) {
    super(props)
    const dataObjects = this.props.items
    const rowHasChanged = (r1, r2) => (r1 !== r2 || r1.favorite !== r2.favorite)
    const sectionHeaderHasChanged = (s1, s2) => s1 !== s2
    const ds = new ListView.DataSource({rowHasChanged, sectionHeaderHasChanged})
    this.state = {
      dataSource: ds.cloneWithRowsAndSections({}), results: {}, requestCounter: 0,
      currentRequests: [],
      favoriteIds: []
    }
    this.makeRequest = this.makeRequest.bind(this);
    this.renderRow = this.renderRow.bind(this)
    this.favoriteButton = this.favoriteButton.bind(this)
    this.renderFavoriteIcon = this.renderFavoriteIcon.bind(this)
    this.allRequests = this.allRequests.bind(this)
  }

  componentDidMount() {
    this.allRequests();
    let favoriteIds = [ ]
    AsyncStorage.getAllKeys((err, keys) => {
      keys.map( key => {
        if (key.includes("@SearchAppFavorite:")) {
          let url = key
          url = url.replace("@SearchAppFavorite:", "")
          favoriteIds.push(url)
        }
      })
      this.setState({favoriteIds: favoriteIds})
    })
  }

  componentDidUpdate(props, state) {
    if (state.requestCounter < 3) {
      let counter = state.requestCounter;
      let requests_array = this.state.currentRequests;
      while (counter <= 3 && requests_array.length != 0) {
        let xhr = requests_array.shift();
        xhr.open('GET', xhr.special_url)
        xhr.send();
        counter++;
      }
      if (counter != this.state.requestCounter || requests_array != this.state.currentRequests) {
        this.setState({currentRequests: requests_array, requestCounter: this.state.requestCounter + counter - state.requestCounter});
      }
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.deleteStars.length != 0) {
      this.props.deleteStars.forEach( (item) => {
        this.favoriteButton(item, item.source)
      })
    } else {
      if (this.props.search_key !== props.search_key || this.props.sources.length !== 3) {
        this.allRequests(props)
      }
    }
  }

  allRequests(props={search_key: ""}) {
    let requests_array = [];
    this.props.sources.forEach((source) =>
      requests_array.push(this.makeRequest(source, props.search_key))
    )
    this.setState({currentRequests: requests_array});
  }

  makeRequest(source, word) {
    let search = word;
    if (!search) {
      search = 'travel';
    }
    let url = 'https://craigslist-simple-search.herokuapp.com/' + source + '?search=' + search;
    var xhr = new XMLHttpRequest();
    xhr.special_url = url;
    xhr.responseType = 'json';
    let that = this;
    xhr.onload = function() {
      if (xhr.response !== null) {
        let tmp_results = that.state.results;
        xhr.response.forEach((item) => {
          if (that.state.favoriteIds.includes(item.url)) {
            item.favorite = true
          } else {
            item.favorite = false
          }
          item.source = source
        })
        tmp_results[source] = xhr.response
        const rowHasChanged = (r1, r2) => r1 !== r2
        const sectionHeaderHasChanged = (s1, s2) => s1 !== s2
        const ds = new ListView.DataSource({rowHasChanged, sectionHeaderHasChanged})
        Object.keys(tmp_results).forEach((key) => {
          if (!that.props.sources.includes(key)) {
            delete tmp_results[key]
          }
        })
        that.setState({results: tmp_results, dataSource: ds.cloneWithRowsAndSections(tmp_results),
          requestCounter: that.state.requestCounter - 1
        });
      }
    };
    xhr.onerror = function() {
      console.log(`Error with ${source}`);
    };
    return (xhr);
  }

  favoriteButton(item, sectionID) {
    let tmp_results = this.state.results
    let arr = tmp_results[sectionID]
    let index = -1
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].url == item.url) {
        index = i;
        break;
      }
    }
    let key = "@SearchAppFavorite:" + item.url
    let array_ids = this.state.favoriteIds;
    if (array_ids.includes(item.url)) {
      AsyncStorage.removeItem(key, (err) => console.log(err))
      let index1 = array_ids.indexOf(item.url)
      if (index1 > -1) { array_ids.splice(index1, 1)}
      this.setState({favoriteIds: array_ids})
      this.props.removeFromdDelStart(item)
      item.favorite = false
    } else {
      array_ids.push(item.url)
      this.setState({favoriteIds: array_ids})
      item.favorite = true
      AsyncStorage.setItem(key, JSON.stringify(item), (err) => console.log(err))
    }
    tmp_results[sectionID][index] = item
    const rowHasChanged = (r1, r2) => r1 !== r2
    const sectionHeaderHasChanged = (s1, s2) => s1 !== s2
    const ds = new ListView.DataSource({rowHasChanged, sectionHeaderHasChanged})
    this.setState({results: tmp_results, dataSource: ds.cloneWithRowsAndSections(tmp_results)})
  }

  renderFavoriteIcon(item, sectionID) {
    if (item.favorite) {
      return (
        <View style={{position: "absolute", top: 6, left: 75}}>
          <Icon.Button onPress={() => this.favoriteButton(item, sectionID)} name="star" size={25} color="red" backgroundColor="transparent" style={{padding: 0}} />
        </View>
      )
    } else {
      return (
        <View style={{position: "absolute", top: 6, left: 75}}>
          <Icon.Button onPress={() => this.favoriteButton(item, sectionID)} name="star-o" size={25} color="black" backgroundColor="transparent" style={{padding: 0, opacity: 0.4}} />
        </View>
      )
    }
  }

  renderRow (rowData, sectionID) {
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
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.props.showItem(rowData)}>
            <View>
              <Image style={{width: 100, height: 100, marginTop:0}}
                source={{url: rowData.image_url}}
                />
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>{price}</Text>
          </View>

            {this.renderFavoriteIcon(rowData, sectionID)}

        </TouchableOpacity>
        </View>
    )
  }

  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  renderHeader (data, sectionID) {
    return <View style={styles.sectionHeader}>
      <Text style={styles.boldLabel}>{sectionID}</Text>
      </View>
  }

  render () {
    if (this.props.sources.length !== 0) {
      return (
        <View style={styles.container}>
          <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
          <ListView
            renderSectionHeader={this.renderHeader}
            contentContainerStyle={styles.listContent}
            dataSource={this.state.dataSource}
            onLayout={this.onLayout}
            renderRow={this.renderRow}
            enableEmptySections
          />
        <ActivityIndicator animating={Object.keys(this.state.results).length === 0 || this.state.requestCounter !== 0} color="#D8BFD8" style={styles.spinner}  size="large"/>
        </View>
      )
    } else {
      return (
      <View style={styles.container}>
        <View>
          <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        </View>
        <View style={{position: "absolute", backgroundColor: "transparent", top : 250, left: 130}}>
          <Text style={{color: "white"}}>Nothing to show</Text>
        </View>
      </View>
      )
    }
  }
}
