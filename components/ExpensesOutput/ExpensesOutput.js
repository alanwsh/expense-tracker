import {View} from 'react-native';
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2022-04-01')
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-04-05')
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-05-01')
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-05-03')
  },
  {
    id: 'e5',
    description: 'Badminton racket',
    amount: 500.00,
    date: new Date('2022-05-04')
  }
]

function ExpensesOutput({expenses, expensesPeriod}){
  return <View>
    <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
    <ExpensesList expenses={DUMMY_EXPENSES}/>
  </View>
}

export default ExpensesOutput;