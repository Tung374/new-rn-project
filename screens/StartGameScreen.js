import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/Colors';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');

    const [isConfirmed, setIsConfirmed] = useState(false);

    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const inputResetHandler = () => {
        setEnteredValue('')
    };

    const confirmButtonHandler = () => {
        const chosenNumber = parseInt(enteredValue);

        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99 || chosenNumber %1!= 0) {
            Alert.alert(
                'Invalid Number!',
                'Number must be 1-99.',
                [{text: 'Okay', style: 'destructive', onPress: inputResetHandler}],
                { cancelable: true }
            );
            return;
        }

        else {
            setIsConfirmed(true);
            setSelectedNumber(chosenNumber);
            setEnteredValue('');
            Keyboard.dismiss();
        }
    };
    
    let confirmedOutput;
    
    if(isConfirmed == true) {
        confirmedOutput = (
            <Card style = {styles.summaryContainer}>
                <Text>You selected: </Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="Start Game" onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
            <View style={styles.screen}>
                <Text style={styles.title}>New Game</Text>
                <Card style = {styles.inputContainer}>
                    <Text>Enter Your Number:</Text>

                    <Input 
                    style = {styles.input} 
                    placeholder = "Enter here..."
                    blurOnSubmit 
                    AutoCapitalize="none" 
                    AutoCorrect={false} 
                    keyboardType="number-pad" 
                    maxLengthen={2}
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                    />

                    <View style={styles.buttonContainer}>
                        <View style = {styles.button}>
                            <Button color = {Colors.accent} title="Reset" onPress={() => {inputResetHandler();}}/>
                        </View>
                        <View style = {styles.button}>
                            <Button color = {Colors.primary} title="Confirm" onPress={() => {confirmButtonHandler();}}/>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize:20,
        marginVertical: 10
    },
    inputContainer: {
        width:300,
        maxWidth:'80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection:'row',
        width:'100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    button: {
        width:'40%'
    },
    input: {
        width: 100,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;