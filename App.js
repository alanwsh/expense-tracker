import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import ManageExpenses from './screens/ManageExpenses';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/IconButton';
import { GlobalStyles } from './constants/styles';
import ExpensesContextProvider from './store/expense-context';

const BottomBar = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExpensesOverview(){
  return <BottomBar.Navigator screenOptions={({navigation})=>({
    headerStyle:{ backgroundColor:GlobalStyles.colors.primary500}, 
    headerTintColor:'white', 
    tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500}, 
    tabBarActiveTintColor:'#EFE927',
    headerRight:({tintColor})=>(
      <IconButton icon='add' color={tintColor} size={24} onPress={()=>{ navigation.navigate('ManageExpense',{mode:'add'}) }}/>
    )
  })}
  >
    <BottomBar.Screen name="Recent" component={RecentExpenses} options={{
      tabBarIcon:({color,size}) => <Ionicons color={color} size={size} name="hourglass"/>,
      tabBarItemStyle:{backgroundColor:'#3518b7'},
      tabBarLabel:'Recent',
      title:'Recent Expenses'
    }}/>
    <BottomBar.Screen name="AllExpenses" component={AllExpenses} options={{
      tabBarIcon:({color,size}) => <Ionicons color={color} size={size} name="wallet"/>,
      tabBarItemStyle:{backgroundColor:'#3518b7'},
      title:'All Expenses',
      tabBarLabel:'All Expenses'
    }}/>
  </BottomBar.Navigator>
}

export default function App() {

  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: GlobalStyles.colors.primary700,
    },
  };
  return (
    <>
      <StatusBar style='auto'/>
      <ExpensesContextProvider>
        <NavigationContainer theme={AppTheme}>
          <Stack.Navigator screenOptions={{
            headerStyle:{ backgroundColor: GlobalStyles.colors.primary500}, 
            headerTintColor: 'white'
          }}>
            <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{headerShown:false}} />
            <Stack.Screen name="ManageExpense" component={ManageExpenses} options={{presentation: 'modal'}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
