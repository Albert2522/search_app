import React from 'react'
import { ScrollView, Text, Linking, Image, View, Button, TouchableOpacity, TouchableHighlight } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import ListOfItems from './ListOfItems';
import Search from 'react-native-search-box';
import Modal from 'react-native-modalbox'
import { Images, Colors } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import SettingsModal from './SettingsModal'
import ListOfFavorite from './ListOfFavorite1'
import CheckBox from 'react-native-checkbox'
import styles from './Styles/LaunchScreenStyles'
import buttonStyles from '../Components/Styles/FullButtonStyles';

export default class LaunchScreen extends React.Component {


  constructor(props) {
    super(props)
    this.state = {showSearchSettings: true, search_key: "",
       openSettings: false, currentItem: {}, listOfFavorite: false, showItem: false,
       sources: ["amazon", "craigslist", "ebay"],
       starToDelete: [], propsPusher: 0
     };
    this.renderSearchSettings = this.renderSearchSettings.bind(this);
    this.renderSettingsModule = this.renderSettingsModule.bind(this);
    this.handleItem = this.handleItem.bind(this)
    this.openWebPage = this.openWebPage.bind(this)
    this.renderLists = this.renderLists.bind(this)
    this.deleteStar = this.deleteStar.bind(this)
    this.manageDeleteStarArr = this.manageDeleteStarArr.bind(this)
    this.addDeleteSources = this.addDeleteSources.bind(this)
  }

  handleItem(item) {
    this.setState({currentItem: item, showItem: true});
  }

  deleteStar(item) {
    let arr = this.state.starToDelete
    arr.push(item)
    this.setState({starToDelete: arr})
    this.setState({propsPusher: this.state.propsPusher - 1})
  }

  addDeleteSources(source) {
    let arr = this.state.sources
    let index = arr.indexOf(source)
    if (index > - 1) {
      arr.splice(index, 1)
    } else {
      arr.push(source)
    }
    this.setState({sources: arr, propsPusher: this.state.propsPusher - 1})
  }

  manageDeleteStarArr(item) {
    let arr = this.state.starToDelete
    let index = arr.indexOf(item)
    if (index > -1) {
      arr.splice(index, 1)
    }
    this.setState({starToDelete: arr})
  }

  openWebPage(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }

  renderSearchSettings() {
    if (this.state.showSearchSettings) {
      return (
        <View style={{position: 'absolute'}}>
          <Icon.Button onPress={() => this.setState({openSettings: !this.state.openSettings})} name="ios-build-outline" size={25} color="black" backgroundColor="transparent" style={{padding: 0, paddingTop: 8, paddingLeft: 7}} />
        </View>
      );
    } else {
      return null;
    }
  }

  renderItemModule() {
    let item = this.state.currentItem
      return (
        <View style={{zIndex: 100}}>
          <Modal style={styles.itemModal}
             isOpen={this.state.showItem}
             isDisabled={false} swipeToClose={true}
             onClosed={() => this.setState({showItem: false})}
             entry="bottom"
             position="top"
             animationDuration={800}
             >
            <View >
              <Image style={{width: 300, height: 300, marginTop:5, backgroundColor: "white"}}
                source={{url: item.image_url}}
                />
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <Button style={styles.buttonGoWeb} title="Direct Link" onPress={() => this.openWebPage(item.url)}/>
            </View>
          </Modal>
        </View>
      );
  }

  renderSettingsModule() {
    return (
      <View style={{zIndex: 100}}>
        <Modal style={styles.searchSettingsModal}
           isOpen={this.state.openSettings}
           isDisabled={false} swipeToClose={true}
           onClosed={() => this.setState({openSettings: !this.state.openSettings})}
           entry="top"
           position="top"
           backdropOpacity = {0}
           animationDuration={800}
           >
          <View >
            <CheckBox
              label = "amazon"
              labelStyle = {styles.settingsLabel}
              checked = {this.state.sources.includes("amazon")}
              onChange = {() => this.addDeleteSources("amazon")}
            />
            <CheckBox
              label = "craigslist"
              labelStyle = {styles.settingsLabel}
              checked = {this.state.sources.includes("craigslist")}
              onChange = {() => this.addDeleteSources("craigslist")}
            />
            <CheckBox
              label = "ebay"
              labelStyle = {styles.settingsLabel}
              checked = {this.state.sources.includes("ebay")}
              onChange = {() => this.addDeleteSources("ebay")}
            />
          </View>
        </Modal>
      </View>
    );
  }

  renderLists() {
    if (this.state.listOfFavorite) {
      return (
        <View style={{position: "absolute", marginTop: 140, marginBottom: 0, padding: 0, height: 527}}>
          <ListOfFavorite showItem={this.handleItem} deleteStar={this.deleteStar}/>
        </View>
          )
    } else {
      return null
    }
  }




  render () {
    let that = this;
    return (
      <View style={styles.mainContainer}>
        {this.renderSettingsModule()}
        {this.renderItemModule()}
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <View style={styles.container}>
          <View style={styles.searchLayout}>
            <View>
              <Search backgroundColor={'black'}
                onCancel={() => this.setState({showSearchSettings: !this.state.showSearchSettings})}
                 placeholder="Search Item" placeholderCollapsedMargin={40} searchIconCollapsedMargin={50}
                 onChangeText={(e) => this.setState({search_key: e})}
                 afterFocus={() => this.setState({showSearchSettings: false})}
                 beforeFocus={() => this.setState({showSearchSettings: true})}
              />
            </View>
            {this.renderSearchSettings()}
        </View>
          <View style={styles.fourButtons}>
            <TouchableOpacity style={buttonStyles.buttonText} >
              <Text style={buttonStyles.textForButton}>Tracking Items</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({listOfFavorite: !this.state.listOfFavorite})} style={buttonStyles.buttonText}>
              <Text style={buttonStyles.textForButton}>{this.state.listOfFavorite? "Back to Search" : "Favorite Items"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttonStyles.buttonText}>
              <Text style={buttonStyles.textForButton}> Notifications </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ListOfItems search_key={this.state.search_key} showItem={this.handleItem}
           deleteStars={this.state.starToDelete}
           sources={this.state.sources}
           removeFromdDelStart = {this.manageDeleteStarArr}
           propsPusher = {this.state.propsPusher}
           />
        {this.renderLists()}
    </View>
    )
  }
}
