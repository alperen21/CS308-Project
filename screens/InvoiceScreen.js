import React, { Component } from 'react';
import { View,ScrollView, Text, Button, StyleSheet,TouchableHighlight } from 'react-native';

import PDFReader from 'rn-pdf-reader-js'


const InvoiceScreen = ({ route, navigation }) => {

  
  const { invoice_all } = route.params;
 // console.log("!!!!!!!!DID EVERY COME",invoice_all);
  const invoice=invoice_all.invoice;
 
  const my_uri = "data:application/pdf;base64,"+invoice;


return (
<PDFReader
      source={{
        base64:my_uri ,
      }}
      // props={{
      //   source: Source,
      // }}
    />
   
)
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});