import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState} from 'react';
import {ExpensesContext} from '../store/expense-context';
import { formatDate, getDateMinusDays } from '../utils/date'; 
import { getExpenses } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';

function RecentExpenses(){
  const [isFetching, setIsFetching] = useState(false);

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    
    async function fetchExpenses(){
      setIsFetching(true);
      const expenses = await getExpenses();
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
    }

    fetchExpenses();
  },[]);

  if(isFetching){
    return <LoadingOverlay />
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  })

  return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No Expenses for last 7 days"/>
}

export default RecentExpenses;