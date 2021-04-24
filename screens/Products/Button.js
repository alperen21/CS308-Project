import React from 'react';
import {StyleSheet, TouchableHighlight, Text} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000000bf',
    borderRadius: 20,
    paddingHorizontal:13,
    paddingVertical: 12,
    marginTop:20
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
});

const Button = ({title, onPress}) => {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
      underlayColor="#404040">
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};

Button.propTypes = {
  /**
   * button title
   */
  title: PropTypes.string.isRequired,
  /**
   * on press function
   */
  onPress: PropTypes.func.isRequired,
};

export {Button};