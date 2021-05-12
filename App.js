import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';
import RootStackScreen from './screens/RootStackScreen';
import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './components/context';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

import AsyncStorage from '@react-native-community/async-storage';


//import { LogBox } from 'react-native';

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();


//LogBox.ignoreAllLogs();
const App = ({navigation}) => {
  
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          // userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          // userToken: action.token,
          isLoading: false,
          
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          // userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          // userToken: action.token,
          isLoading: false,
        };
    }
  };


  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
 

  const authContext = React.useMemo(() => ({
    signIn: async(uname,token) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      // const userToken = String(foundUser[0].userToken);
      const userName = uname;
      const token_id = token;
      try {
        // await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userName', userName);
      } catch(e) {
        console.log(e);
      }

      try {
        // await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('token', token_id);
      } catch(e) {
        console.log(e);
      }
      console.log("does token id comes to app js?",token_id);


    //console.log('user tokennn: ', foundUser[0].password);
    //console.log('user passw: ', foundUser[0].password);
      // dispatch({ type: 'LOGIN', id: userName, token: userToken });
      dispatch({ type: 'LOGIN', id: userName});
      // navigation.replace('Home');
    },

    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userName');
      } catch(e) {
        console.log(e);
      }

      try {
        await AsyncStorage.removeItem('token');
      } catch(e) {
        console.log(e);
      }



      dispatch({ type: 'LOGOUT' });
    },

    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      
      //fill out

    },

    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);


  useEffect(() => { 
    setTimeout(async() => {
      // setIsLoading(false);
      let userName;
      userName = null; 

      try {
        userName = await AsyncStorage.getItem('userName');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', userName: userName });
    }, 1000);
  }, []);



  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }


  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
     
     <RootStackScreen/>
    
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;
  


