import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import Landing from '../screens/Landing';
import Liked from '../screens/Liked';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => Landing,
  liked: () => Liked,
  rootNavigation: () => RootNavigation,
}));
