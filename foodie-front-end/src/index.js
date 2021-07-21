import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import NativeTachyons from 'react-native-style-tachyons';
import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

NativeTachyons.build(
  {
    rem: screenWidth > 340 ? 18 : 16,
    colors: {
      palette: {
        white: '#FFFFFF',
        lightBlue: '#0099FF',
        darkBlue: '#000C33',
        darkerBlue: '#000a23',
        grey: "#9c9c9c"
      }
    }
  },
  StyleSheet
);

AppRegistry.registerComponent(appName, () => App);