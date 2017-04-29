#  search_app

## Demo

Take a look how the application works!

[Video](https://youtu.be/tBpKEpuHJb0)

## Description
Search_app is an iOS app built using React Native. The app is intended
to make searching across multiple sale sites easy. Users may search for
any particular item they are looking to buy, and have the option to add
the item to the favorite items list which is available offline.

The Application consists of two parts:
 * A server part which built with Node.js and Express.js. Server part
combines Ebay, Amazon APIs and Craigslist data-scraper, gets requests
from mobile app and responds with a correct data.
* Mobile app build with React Native ( supports both IOS and Android
platforms simultaneously)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `npm install`


## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## Future Improvements
* Implement Notifications for new listed Items
* Unify categories and make the Search Settings more helpful for getting a
desired search result
* Add more search platforms to the application
