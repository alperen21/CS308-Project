import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import EspressoScreen from './Products/EspressoScreen';
import FilterCoffeeScreen from './Products/FilterCoffeeScreen';
import TurkishCoffeeScreen from './Products/TurkishCoffeeScreen';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import HotchocolateScreen from './Products/HotchocolateScreen';
import CoffeeMachineScreen from './Products/CoffeeMachineScreen';
import CartScreen from './CartScreen';

import ProductDetailsScreen from './Products/ProductDetailsScreen';


const HomeStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Products"
    activeColor="#fff"
  >
    <Tab.Screen
      name="Products"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Products',
        tabBarColor: '#BFA38F',
        tabBarIcon: ({ color }) => (
          <AntDesign name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Category"
      component={CategoryStackScreen}
      options={{
        tabBarLabel: 'Categories',
        tabBarColor: '#BFA38F',
        tabBarIcon: ({ color }) => (
          <Feather name="shopping-bag" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreStackScreen}
      options={{
        tabBarLabel: 'Search',
        tabBarColor: '#BFA38F',
        tabBarIcon: ({ color }) => (
          <AntDesign name="search1" size={24} color="white" />
        ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#BFA38F',
        tabBarIcon: ({ color }) => (
          <AntDesign name="user" size={24} color="white" />
        ),
      }}
    />


  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#BFA38F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>


    <HomeStack.Screen name="Products" component={HomeScreen} options={{
      title: 'Products',
      headerRight: () => (
        <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('Cart')}></Icon.Button>
      ),
      headerLeft:() => null

    }} />
    <HomeStack.Screen name="Cart" component={CartScreen} options={{
      title: 'Cart',
      // headerRight: () => (
      //     <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('CartScreen')}></Icon.Button>
      // )
      headerLeft:() => null
    }} />
    <HomeStack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{
      title: 'Product Details',
      headerRight: () => (
        <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('Cart')}></Icon.Button>
      ),
      headerLeft:() => null
    }} />


  </HomeStack.Navigator>
);

const CategoryStackScreen = ({ navigation }) => (
  <CategoryStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#BFA38F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <CategoryStack.Screen name="Category" component={CategoryScreen} options={{
      title: 'Categories',
      headerRight: () => (
        <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('Cart')}></Icon.Button>
      ),
      headerLeft:() => null
    }} />
    <CategoryStack.Screen name="Espresso" component={EspressoScreen} options={{
      title: 'Espresso Coffee',
      headerRight: () => (
        <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('Cart')}></Icon.Button>
      ),
      headerLeft:() => null
    }} />
    <CategoryStack.Screen name="FilterCoffee" component={FilterCoffeeScreen} options={{
      title: 'Filter Coffee ',
      headerRight: () => (
        <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('Cart')}></Icon.Button>
      ),
      headerLeft:() => null
    }} />
    <CategoryStack.Screen name="TurkishCoffee" component={TurkishCoffeeScreen} options={{
      title: 'Turkish Coffee ',
      headerRight: () => (
        <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('Cart')}></Icon.Button>
      ),
      headerLeft:() => null
    }} />
    <CategoryStack.Screen name="Hotchocolate" component={HotchocolateScreen} options={{
      title: ' Hot Chocolate ',
      headerRight: () => (
        <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('Cart')}></Icon.Button>
      ),
      headerLeft:() => null
    }} />
    <CategoryStack.Screen name="CoffeeMachine" component={CoffeeMachineScreen} options={{
      title: 'Coffee Machines',
      headerRight: () => (
        <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('Cart')}></Icon.Button>
      ),
      headerLeft:() => null
    }} />
    {/* <CategoryStack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{
      title: 'Product Details',
      headerRight: () => (
        <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('Cart')}></Icon.Button>
      )
    }} /> */}
    {/* <CategoryStack.Screen name="Cart" component={CartScreen} options={{
        title:'Cart',
        // headerRight: () => (
        //     <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('CartScreen')}></Icon.Button>
        // )
        }} /> */}


  </CategoryStack.Navigator>
);


const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#BFA38F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
      title: 'Profile',
      headerRight: () => (
        <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('Cart')}></Icon.Button>
      ),
      headerLeft:() => null
    }} />
    {/* <ProfileStack.Screen name="Cart" component={CartScreen} options={{
        title:'Cart',
        // headerRight: () => (
        //     <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('CartScreen')}></Icon.Button>
        // )
        }} /> */}
  </ProfileStack.Navigator>
);

const ExploreStackScreen = ({ navigation }) => (
  <ExploreStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#BFA38F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <ExploreStack.Screen name="Explore" component={ExploreScreen} options={{
      title: 'Search',
      headerRight: () => (
        <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('Cart')}></Icon.Button>
      ),
      headerLeft:() => null
    }} />
    {/* <ExploreStack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{
      title: 'Product Details',
      headerRight: () => (
        <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('Cart')}></Icon.Button>
      )
    }} /> */}
    {/* <ExploreStack.Screen name="Cart" component={CartScreen} options={{
        title:'Cart',
        // headerRight: () => (
        //     <Icon.Button name="ios-cart" size={25} backgroundColor="#BFA38F" onPress={() => navigation.navigate('CartScreen')}></Icon.Button>
        // )
        }} /> */}

  </ExploreStack.Navigator>
);
