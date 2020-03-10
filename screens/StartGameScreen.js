import React, { useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from  '../components/TitleText';
import MainButton from '../components/MainButton';


const StartGameScreen = props => {
    
    const [enterValue ,  setEnterValue  ]  = useState('');
    const [confirm, setConfirmed] = useState(false);
    const [selectNumber, setSelectNumber] = useState();
    
  const  numberInputHandler = inputText => {
  
    setEnterValue(inputText.replace(/[^0-9]/g, ''));
  
  }
  
  const keyboardDismissHandler = () => {
    
    Keyboard.dismiss();
  
  }
  
  const resetInputHandler = () => {
  
    setEnterValue('');
    setConfirmed(false);
  }
  
  const confirmInputHandler = () => {
    
    const chooseNumber = parseInt(enterValue)
    
    if(isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
    
        Alert.alert(
            'Invalid Number',
            'Number has to be a number between 1 and 99',
            [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
        
        
        );
        return;
    }
    
    setConfirmed(true);
    setSelectNumber(chooseNumber);
    setEnterValue('');
    Keyboard.dismiss();
    
  }
  
  let confirmedOutput;
  
  if(confirm) {
  
    confirmedOutput = ( 
    <Card style={styles.summaryContainer}>
        <BodyText> You select  </BodyText>
        <NumberContainer>{selectNumber}</NumberContainer>
        <MainButton  onClick={ () => props.onStartGame(selectNumber)}>
          START GAME
        </MainButton>
    </Card>
    )
  }
    
    return (
    <TouchableWithoutFeedback onPress={keyboardDismissHandler} >
      <View style={styles.screen}> 
      
          <TitleText style={styles.title}>Start a New Game!</TitleText>
          
          <Card style={styles.inputContainer}>
          
            <BodyText>Select a Number</BodyText>
            
            <Input 
                  style={styles.input}
                  blurOnSubmit
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="number-pad"
                  maxLength={2}
                  onChangeText={numberInputHandler}
                  value={enterValue}/>
            
              <View style={styles.buttonContainer}>
              
                <View style={styles.button}>
                   <Button title="Reset"  color={Colors.secondary} onPress={resetInputHandler}/>
                </View>
                <View style={styles.button}>
                  <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler}/>
                </View>
                
              </View>
            
          
          </Card>
      {confirmedOutput}
      </View>
      </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({

    screen: {
      flex: 1,
      paddingTop: 10,
      alignItems: 'center'
    },
    
    title: {
      fontSize: 20,
      marginVertical: 10,
      fontFamily: 'open-sans-bold'
    },
    
    inputContainer: {
      width: 300,
      maxWidth: '80%',
      alignItems: 'center'
    },
    
    buttonContainer : {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 15
    },
    button: {
      width: 100
    },
    
    input: {
      width: 50,
      textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 10,
        alignItems: 'center'
    }

});

export default StartGameScreen;
