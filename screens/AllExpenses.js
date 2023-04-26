import React from 'react';
import { Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

const AllExpenses = () => {
    return (
        <ExpensesOutput expensePeriod='Total'/>
    );
}

export default AllExpenses;
