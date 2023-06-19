import axios from "axios"


export const storeExpense = (expenseData) => {
    axios.post('https://react-native-course-c768a-default-rtdb.firebaseio.com/expenses.json',
        expenseData
    )
}