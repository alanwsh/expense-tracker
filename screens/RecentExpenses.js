import {Text} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { DUMMY_EXPENSES } from '../data/expenses';

function RecentExpenses({route,navigation}){
  function addPressed(){
    console.log('Pressed Button');
  }

  function filterRecentExpenses(){
    const recentExpenses = DUMMY_EXPENSES.filter((expense)=>{
      const today = new Date();
      const diffTime = Math.abs(today - expense.date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  
      return diffDays <= 7;
    }) ;
    return recentExpenses;
  }

  return <ExpensesOutput expenses={filterRecentExpenses()} expensesPeriod="Last 7 Days"/>
}
export default RecentExpenses;