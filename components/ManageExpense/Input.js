import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../consts/styles';

const Input = ({ label, style, textInputConfig, invalid }) => {

    let inputStyles =  textInputConfig?.multiline ? [styles.input, styles.inputMultiline] : [styles.input];

   
    return (
        <View style={[styles.inputContainer,style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={[inputStyles,invalid && styles.invalidInput]} {...textInputConfig}    placeholderTextColor={GlobalStyles.colors.primary200}/>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,

    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
})

export default Input;
