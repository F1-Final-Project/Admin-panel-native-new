import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import MenuStack from "./MenuNavigator";
import WaiterStack from "./WaiterNavigator";

const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Main: MainTabNavigator,
  // Menu: MenuStack,
  Waiter: WaiterStack,
});
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
