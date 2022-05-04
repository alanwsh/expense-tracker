import { Text } from 'react-native';
import { useLayoutEffect } from 'react';
import IconButton from '../components/IconButton';

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

  return <Text>Recent Expenses</Text>
}
export default RecentExpenses;