import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Notifications,
} from 'exponent';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

export default class RootNavigation extends React.Component {

  render() {
    return (
        <Provider store={store}>
            <TabNavigation
              tabBarHeight={56}
              initialTab="home">
              <TabNavigationItem
                id="home"
                renderIcon={isSelected => this._renderIcon('home', isSelected)}>
                <StackNavigation initialRoute="home" />
              </TabNavigationItem>

              <TabNavigationItem
                id="liked"
                renderIcon={isSelected => this._renderIcon('heart', isSelected)}>
                <StackNavigation initialRoute="liked" />
              </TabNavigationItem>

            </TabNavigation>
        </Provider>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
