import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/Colors';



export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameStarted, setGameStarted] = useState(false);
  
  const startGameHandler = selectedNumber => {
    if(gameStarted == false)
    {
      setGameStarted(true);
      setUserNumber(selectedNumber);
    }
    else {
      setGameStarted(false);
      setUserNumber(0);
    }
  };

  const  restartGameHandler = () => {
    //setGameStarted(false);
    //setUserNumber(0);
  };

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if (gameStarted == true) {
    content = <GameScreen userChoice={userNumber} onStartGame={startGameHandler}/>;
  }
  return ( 
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});
