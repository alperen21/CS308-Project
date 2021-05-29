import React, { Component } from 'react';
import { View, Text, Button, StyleSheet,TouchableHighlight } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Print from 'expo-print';

const InvoiceScreen = async({ route, navigation }) => {
  const { invoice} = route.params;
  const my_uri = "data:application/pdf;base64"+invoice
  console.log("DID INVIOCE COMEEE",invoice)
  await   Print.printAsync(
    {uri:my_uri,
      width: 595, height: 842 })
  
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});