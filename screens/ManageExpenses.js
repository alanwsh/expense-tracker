import {View, StyleSheet } from 'react-native';
import { useLayoutEffect, useContext, useState } from 'react';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/IconButton';
import { ExpensesContext } from '../store/expense-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense as removeExpense } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageExpenses({route, navigation}){

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const editExpenseID = route.params?.expenseID;
  const isEditing = !!editExpenseID;

  const expensesCtx = useContext(ExpensesContext);

  const selectedExpense = expensesCtx.expenses.find((expense)=>expense.id === editExpenseID);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing? 'Edit Expense': 'Add Expense'
    })
  }, [navigation, isEditing]);

  async function deleteExpense(){
    setIsLoading(true);
    try{
      await removeExpense(editExpenseID);
      expensesCtx.deleteExpense(editExpenseID);
      navigation.goBack();
    }catch(err){
      setError('Could not delete expense!');
      setIsLoading(false);
    }
  }

  function cancelHandler(){
    navigation.goBack();
  }

  function errorHandler(){
    setError(null);
  }

  async function confirmHandler(expenseData){
    setIsLoading(true);
    try{
      if(isEditing){
        await updateExpense(editExpenseID, expenseData);
        expensesCtx.updateExpense(editExpenseID, expenseData);
      }
      else{
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({...expenseData,id:id});
      }
      navigation.goBack();
    }catch(err){
      setError('Could not save data!');
      setIsLoading(false);
    }
  }

  if(error && !isLoading){
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if(isLoading){
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm onCancel={cancelHandler} onSubmit={confirmHandler} submitButtonLabel={ isEditing ? 'Update' : 'Add'} defaultValues={selectedExpense}/>
      { isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpense}/>
        </View>
        )
      }
    </View>
  );
}
export default ManageExpenses;

const styles = StyleSheet.create({
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems:'center'
  },
  container:{
    flex:1,
    padding:24,
    backgroundColor: GlobalStyles.colors.primary800
  }
});