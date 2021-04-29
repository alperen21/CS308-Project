import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import MainTabScreen from './MainTabScreen';
import EspressoScreen from './Products/EspressoScreen';
import FilterCoffeeScreen from './Products/FilterCoffeeScreen';
import TurkishCoffeeScreen from './Products/TurkishCoffeeScreen';
import HotchocolateScreen from './Products/HotchocolateScreen';
import CoffeeMachineScreen from './Products/CoffeeMachineScreen';
import CartScreen from './CartScreen';
import ProductDetailsScreen from './Products/ProductDetailsScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none' initialRouteName= 'SplashScreen'>
        <RootStack.Screen name="Home" component={MainTabScreen}/>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="EspressoScreen" component={EspressoScreen}/>
        <RootStack.Screen name="FilterCoffeeScreen" component={FilterCoffeeScreen}/>
        <RootStack.Screen name="TurkishCoffeeScreen" component={TurkishCoffeeScreen}/>
        <RootStack.Screen name="HotchocolateScreen" component={HotchocolateScreen}/>
        <RootStack.Screen name="CoffeeMachineScreen" component={CoffeeMachineScreen}/>
        <RootStack.Screen name="CartScreen" component={CartScreen}/>
        <RootStack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;