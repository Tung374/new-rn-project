import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
    return (
    <View style={{...styles.card, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    card: {
        // This is setting Shadow for IOS
        shadowColor:'black',
        shadowOpacity: 0.26,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 2},
        // This is for Android
        elevation: 8,
        backgroundColor:'white',

        padding: 20,
        borderRadius:10
    }
})

export default Card;