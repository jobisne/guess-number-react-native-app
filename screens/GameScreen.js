import React, { useState, useRef, useEffect} from 'react';

import {View, Text, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';

import Card from '../components/Card';
import DefaultStyles from '../constants/default-syles';
import MainButton from '../components/MainButton';
import {Ionicons} from '@expo/vector-icons';
import BodyText from '../components/BodyText';



const generateRandomBetween = (min, max, exclude) => {

  min = Math.ceil(min);
  max = Math.floor(max);

  const rndmNumber = Math.floor(Math.random() * (max - min)) + min;
  
  if(rndmNumber === exclude) {

    return generateRandomBetween(min, max, exclude);

  } else { 

    return rndmNumber;

  }
};
//for scroll view
// const renderListItem = (value, numOfRound) => 
//   (
//     <View key={value} style={styles.listItem}>
//       <BodyText>#{numOfRound}</BodyText>
//       <BodyText>{value}</BodyText>

//     </View>
//   )

//For flatlist
const renderListItem = (listLength, itemData) =>
(
  <View  style={styles.listItem}>
       <BodyText>#{listLength - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>

   </View>
)

const  GameScreen = props => {

  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
   const [currentGuess, setCurrentGuess] = useState(initialGuess);
   const [passGuesses, setPassGuess] = useState([initialGuess.toString()]);
   
   
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  
  const { userChoice, onGameOver} = props;
   
   useEffect(() => { 
    if(currentGuess === props.userChoice) {
      props.onGameOver(passGuesses.length);
    }
   
   }, [currentGuess, userChoice, onGameOver]);
   
   
   const nextGuessHandler = direction => {
   
   if(
    (direction === 'lower' && currentGuess < props.userChoice) ||   ( direction === 'greater' && currentGuess > props.userChoice)) {
    Alert.alert('Don\'t Lie', 'You know that this is wrong ...', [{
    text: 'Sorry  oo', style: 'cancle'
    }]);
    return;
    }
    
     if(direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(currentRound => currentRound + 1);
    setPassGuess(currentPassGuess => [nextNumber.toString(), ...currentPassGuess])
   };
   
   
   
   
   
  return(
  
      <View style={styles.screen}> 
        
            <Text style={DefaultStyles.title}> Opponents Guess </Text>        

            <NumberContainer>{ currentGuess }</NumberContainer>
            
            <Card style={styles.buttonContainer}> 
      
                  <MainButton  onClick = {nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={20} color="white" />
                  </MainButton>
                  <MainButton  onClick = {nextGuessHandler.bind(this, 'greater')} >
                  <Ionicons name="md-add" size={20} color="white" />
                  </MainButton>
  
            </Card>
            <View style={styles.listContainer}>
              {/* <ScrollView contentContainerStyle={styles.list}>
                {passGuesses.map((guess, index) => renderListItem(guess, passGuesses.length - index))}
              </ScrollView> */}
              <FlatList 
                keyExtractor={item => item} 
                data={passGuesses}
                renderItem={renderListItem.bind(this, passGuesses.length)}
                contentContainerStyle={styles.list}
              />
            </View>
         
      </View>

  );

}


const styles = StyleSheet.create({

  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 400,
    marginTop: 10,
    maxWidth: "90%"
  },
  listContainer: {
    flex: 1,
    width: '60%'
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }

});

export default GameScreen;
