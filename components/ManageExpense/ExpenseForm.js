import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../consts/styles';

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {

    const [inputs, setInputs] = useState({
        date: { value: defaultValues ? getFormattedDate(defaultValues.date) : '', isValid: true },
        amount: { value: defaultValues ? defaultValues.amount.toString() : '', isValid: true },
        description: { value: defaultValues ? defaultValues.description : '', isValid: true }
    });

    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputs((prevState) => ({
            ...prevState,
            [inputIdentifier]: { value: enteredValue, isValid: true }
        }))
    }


    const submitHandler = () => {
        const expenseData = {
            date: new Date(inputs.date.value),
            amount: +inputs.amount.value,
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toDateString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;


        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { value: curInputs.description.value, isValid: descriptionIsValid },
                }
            })
            return;
        }
        onSubmit(expenseData)
    }

    const formIsInvalid = 
    !inputs.amount.isValid || 
    !inputs.description.isValid ||
    !inputs.date.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input invalid={!inputs.amount.isValid} style={styles.rowInput} label='Amount' textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: (newText) => inputChangedHandler('amount', newText.replace(/,/, '.')),
                    value: inputs.amount.value
                }} />
                <Input invalid={!inputs.date.isValid} style={styles.rowInput} label='Date' textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    value: inputs.date.value,
                    onChangeText: (newText) => inputChangedHandler('date', newText)
                }} />
            </View>
            <Input invalid={!inputs.description.isValid} label='Description' textInputConfig={{
                multiline: true,
                value: inputs.description.value,
                onChangeText: (newText) => inputChangedHandler('description', newText),
            }} />
            {formIsInvalid && <Text style={styles.errorText}>Something went wrong! Check entered data!</Text>}
            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
})

export default ExpenseForm;
