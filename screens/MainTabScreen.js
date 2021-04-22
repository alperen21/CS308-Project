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


const HomeStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
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

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#BFA38F',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Products',
        // headerLeft: () => (
        //     <Icon.Button name="ios-menu" size={25} backgroundColor="#BFA38F" onPress={() => navigation.openDrawer()}></Icon.Button>
        // )
        }} />
</HomeStack.Navigator>
);

const CategoryStackScreen = ({navigation}) => (
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
        // headerLeft: () => (
        //     <Icon.Button name="ios-menu" size={25} backgroundColor="#BFA38F" onPress={() => navigation.openDrawer()}></Icon.Button>
        // )
        }} />
         <ExploreStack.Screen name="Espresso" component={EspressoScreen} options={{
              title: 'Espresso Coffee',
            // headerLeft: () => (
            //     <Icon.Button name="ios-menu" size={25} backgroundColor="#BFA38F" onPress={() => navigation.openDrawer()}></Icon.Button>
            // )
            }} />
             <ExploreStack.Screen name="FilterCoffee" component={FilterCoffeeScreen} options={{
              title: 'Filter Coffee ',
            // headerLeft: () => (
            //     <Icon.Button name="ios-menu" size={25} backgroundColor="#BFA38F" onPress={() => navigation.openDrawer()}></Icon.Button>
            // )
            }} />
             <ExploreStack.Screen name="TurkishCoffee" component={TurkishCoffeeScreen} options={{
              title: 'Turkish Coffee ',
            // headerLeft: () => (
            //     <Icon.Button name="ios-menu" size={25} backgroundColor="#BFA38F" onPress={() => navigation.openDrawer()}></Icon.Button>
            // )
            }} />
            <ExploreStack.Screen name="Hotchocolate" component={HotchocolateScreen} options={{
              title: ' Hot Chocolate ',
            // headerLeft: () => (
            //     <Icon.Button name="ios-menu" size={25} backgroundColor="#BFA38F" onPress={() => navigation.openDrawer()}></Icon.Button>
            // )
            }} />
            <ExploreStack.Screen name="CoffeeMachine" component={CoffeeMachineScreen} options={{
              title: 'Coffee Machines',
            // headerLeft: () => (
            //     <Icon.Button name="ios-menu" size={25} backgroundColor="#BFA38F" onPress={() => navigation.openDrawer()}></Icon.Button>
            // )
            }} />
</CategoryStack.Navigator>
);


const ProfileStackScreen = ({navigation}) => (
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
          // headerLeft: () => (
          //     <Icon.Button name="ios-menu" size={25} backgroundColor="#BFA38F" onPress={() => navigation.openDrawer()}></Icon.Button>
          // )
          }} />
  </ProfileStack.Navigator>
  );
  
  const ExploreStackScreen = ({navigation}) => (
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
            // headerLeft: () => (
            //     <Icon.Button name="ios-menu" size={25} backgroundColor="#BFA38F" onPress={() => navigation.openDrawer()}></Icon.Button>
            // )
            }} />
            
    </ExploreStack.Navigator>
    );

  