import React, {useState,useRef} from 'react';
import {View, Button, StyleSheet, Text, Alert} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min) + min);
    //if(rndNum === exclude) {
        //return generateRandomBetween(min, max, exclude);
    //}
    //else {
        return rndNum;
    //}
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    
    const lowerGuess = useRef(1);
    const greaterGuess = useRef(100);
    
    const lowerGreaterHandler = direction => {
        if(direction === 'lower' && currentGuess < props.userChoice || direction === 'higher' && currentGuess > props.userChoice)
        {
            Alert.alert("I think you know what the problem is.", 'Just as much as I do');
            Alert.alert("I'm sorry, Dave.", 'I\'m afraid I can\'t do that', [{text: 'What\'s the problem?', style: 'cancel'}]);
            return;
        }
        else if(direction === 'lower' || greaterGuess.current < currentGuess)
        {
            greaterGuess.current = currentGuess;
            setCurrentGuess(generateRandomBetween(lowerGuess.current, greaterGuess.current, currentGuess));
        }
        else if (direction === 'greater' || lowerGuess.current > currentGuess)
        {
            lowerGuess.current = currentGuess;
            setCurrentGuess(generateRandomBetween(lowerGuess.current, greaterGuess.current, currentGuess));
        }
    }

    return (
        <View style={styles.screen}>
            <Text>You Chose: {props.userChoice}</Text>
            <NumberContainer>Hal Guessed: {currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={lowerGreaterHandler.bind(this, 'lower')}/>
                <Button title="GREATER" onPress={lowerGreaterHandler.bind(this, 'greater')}/>
            </Card>
            <Button title="Reset Game" onPress={() => props.onStartGame(props.userChoice)}/>
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
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})

export default GameScreen;