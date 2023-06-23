import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);
    return (
        <ExpensesOutput fallbackText='No Expenses' expenses={expensesCtx.expenses} expensePeriod='Total'/>
    );
}

export default AllExpenses;
