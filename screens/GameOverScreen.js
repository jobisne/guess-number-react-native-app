import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';
import MainButton from '../components/MainButton';


const GameOverScreen = props => {

return (
    <View style={styles.screen}>
    
      <TitleText>Game Over</TitleText>
      <View style={styles.imageContainer}>
        <Image 
        source={require('../assets/image/success.png')} 
        // source={{uri: 'http://3.bp.blogspot.com/-2-tnU1KQP1w/VCY2wJM0uJI/AAAAAAAAGY8/KhxsPCheM6k/s1600/25%2Bwalk%2Bon%2Bridge%2Bto%2BMont%2BBlanc%2Bsummit.jpg'}}
        style={styles.image}
        resizeMode="cover" />
      </View>
      <View style={styles.resultContainer}>
      <BodyText style={styles.resultText}>
        Your Phone needed  {' '}
        <Text style={styles.highLight}>{props.numOfRounds}</Text> rounds to guess the Number {' '} <Text style={styles.highLight}>{props.userNum}</Text></BodyText>
      </View>
      <MainButton  onClick={props.onStartNewGame} >
        Start New Game
      </MainButton>    
    </View>
  )

}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    width: 300,
    height:300,
    borderRadius: 150,
    borderWidth:2,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20
  },
  highLight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15
  }


});


export default GameOverScreen;
