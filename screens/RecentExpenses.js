import React, { useContext, useState, useEffect } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpenses = () => {

    const expensesCtx = useContext(ExpensesContext);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const getExpenses = async () => {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            }
            catch (error) {
                setError('Could not fetch expenses! ')
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);


    if (error && !isFetching) {
        return <ErrorOverlay message={error} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

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
