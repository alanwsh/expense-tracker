import { useLayoutEffect } from 'react';
import IconButton from '../components/IconButton';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function RecentExpenses({route,navigation}){
  function addPressed(){
    console.log('Pressed Button');
  }
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight:()=>(
        <IconButton icon='add' color='white' size='40' onPress={addPressed}/>
      )
    })
  },[navigation]);

  return <ExpensesOutput expensesPeriod="Last 7 Days"/>
}
export default RecentExpenses;