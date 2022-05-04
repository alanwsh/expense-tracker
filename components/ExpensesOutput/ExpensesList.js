import { FlatList, Text } from "react-native";

function renderExpenseItem(itemData){
  return <Text>{itemData.item.description}</Text>
}
function ExpensesList({expenses}){
  return <FlatList data={expenses} keyExtractor={(item)=> item.id} renderItem={renderExpenseItem}/>
}
export default ExpensesList;