import { createContext, useReducer } from "react";

export const DUMMY_EXPENSES = [
    {
      id: 'e1',
      description: 'Badminton racket',
      amount: 500.00,
      date: new Date('2022-05-02')
    },
    {
      id: 'e2',
      description: 'Gucci Bag',
      amount: 3500.00,
      date: new Date('2022-05-03')
    },
    {
      id: 'e3',
      description: 'Keyboard',
      amount: 100.00,
      date: new Date('2022-05-03')
    },
    {
      id: 'e4',
      description: 'SSD Storage 128GB',
      amount: 63.00,
      date: new Date('2022-05-04')
    },
    {
      id: 'e5',
      description: 'Macbook Pro 2020',
      amount: 4388.00,
      date: new Date('2022-06-04')
    }
  ]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action){
    switch (action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id}, ...state];
        case 'UPDATE':
            const updateIndex = state.findIndex((expense) => expense.id === action.payload.id)
            const updatableExpense = state[updateIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updateIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }
}
function ExpensesContextProvider({children}){
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData){
        dispatch({
            type: 'ADD',
            payload: expenseData
        });
    }

    function deleteExpense(id){
        dispatch({
            type: 'DELETE',
            payload: id
        });
    }

    function updateExpense(id, expenseData){
        dispatch({
            type: 'UPDATE',
            payload: {
                id: id,
                data: expenseData
            }
        });
    }
    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };
    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;