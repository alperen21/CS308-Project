import React from 'react';
import { View, Text, Button, StyleSheet,useState } from 'react-native';
import { SearchBar } from 'react-native-elements';


const ExploreScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Explore Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );

  //   const [state, setState] = React.useState({
  //     search:'',
   
  // });
   
  
  //   updateSearch = (search) => {
  //     this.setState({ search });
  //   };
  
  //   //render(){
  //     const { search } = this.state;
  
  //     return (
  //       <SearchBar 
  //         placeholder="Type Here..."
  //         onChangeText={this.updateSearch}
  //         value={search}
  //       />
  //     );
  //  // };
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});