import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CategoryScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Categories Screen</Text>
        <Button
          title="go to search Here"
          onPress={() => navigation.navigate('Explore')}
        />
      </View>
    );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});