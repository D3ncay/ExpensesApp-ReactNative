import React, { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {

    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((expenses) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return (expenses.date >= date7DaysAgo) && (expenses.date <= today);
    })
    return (
        <ExpensesOutput fallbackText='No Expenses last 7 days' expenses={recentExpenses} expensePeriod='Last 7 days' />
    );
}

export default RecentExpenses;
