import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const Input = props => {
    return <TextInput {...props}style = {{...styles.input, ...props.style}} placeholder={props.placeholder}/>
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;