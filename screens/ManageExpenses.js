import { NavigationContainer } from '@react-navigation/native';
import {View, StyleSheet } from 'react-native';
import { useLayoutEffect, useContext } from 'react';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/IconButton';
import { ExpensesContext } from '../store/expense-context';
import Button from '../components/UI/Button';
function ManageExpenses({route, navigation}){
  const editExpenseID = route.params?.expenseID;
  const isEditing = !!editExpenseID;

  const expensesCtx = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing? 'Edit Expense': 'Add Expense'
    })
  }, [navigation, isEditing]);

  function deleteExpense(){
    console.log('old ',expensesCtx.expenses);

    expensesCtx.deleteExpense(editExpenseID);
    console.log('new ',expensesCtx.expenses);
    navigation.goBack();
  }

  function cancelHandler(){
    navigation.goBack();
  }

  function confirmHandler(){
    if(isEditing)
      expensesCtx.updateExpense(editExpenseID, {description: 'Test!!', amount: 29.99, date: new Date('2022-06-03')});
    else
      expensesCtx.addExpense({description: 'Test', amount: 19, date: new Date('2022-05-19')});
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.button} onPress={confirmHandler}>{ isEditing ? 'Update' : 'Add'}</Button>
      </View>
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
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    minWidth:120,
    marginHorizontal:8
  }
});