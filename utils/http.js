import axios from 'axios';

const BASE_URL = 'https://react-native-expense-tra-30858-default-rtdb.asia-southeast1.firebasedatabase.app/';

const FIREBASE_NODE = 'expenses.json';

const API_URL = BASE_URL + FIREBASE_NODE;

export async function storeExpense(expenseData){
    const response = await axios.post(API_URL, expenseData);
    return response.data.name;
}

export async function getExpenses(){
    const response = await axios.get(API_URL);

    const expenses = [];

    for( const key in response.data){
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expenseObj);
    }

    return expenses;
}