import {Text} from 'react-native';
function ManageExpenses({route}){
  const form_mode = route.params.mode;
  return <Text>Manage Expense - Mode = {form_mode}</Text>
}
export default ManageExpenses;