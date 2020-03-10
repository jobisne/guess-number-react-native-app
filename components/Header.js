import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const Header = props => {
  
  return (
    
    <View style={styles.header}>
    
      <Text style={styles.headerTitle}>{props.title}</Text>
      
    </View>
  )

}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 96,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 36
  },
  
  headerTitle: {
  color:'black',
  fontSize: 18,
  fontFamily:'open-sans-bold'
  
  }
 

})

export default Header;
