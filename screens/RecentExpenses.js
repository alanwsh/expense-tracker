import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState} from 'react';
import {ExpensesContext} from '../store/expense-context';
import { formatDate, getDateMinusDays } from '../utils/date'; 
import { getExpenses } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses(){
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    
    async function fetchExpenses(){
      setIsFetching(true);
      try{
        const expenses = await getExpenses();
        expensesCtx.setExpenses(expenses);
      }catch(err){
        setError('Could not fetch expenses');
      }
      setIsFetching(false);
    }

    fetchExpenses();
  },[]);

  function errorHandler(){
    setError(null);
  }

  if(error && !isFetching){
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>;
  }

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