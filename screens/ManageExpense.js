import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../consts/styles';

const ManageExpense = ({ route, navigation }) => {

    const editedExpenseId = route.params?.expenseId;

    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])



    return (
        <View style={styles.container}>
            <Text>ManageExpense Screen {editedExpenseId}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1
    }
})
export default ManageExpense;
