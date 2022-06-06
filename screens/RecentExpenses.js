import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import {ExpensesContext} from '../store/expense-context';
import { getDateMinusDays } from '../utils/date'; 

function RecentExpenses({route,navigation}){
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  })

  function addPressed(){
    console.log('Pressed Button');
  }

  return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days"/>
}
export default RecentExpenses;