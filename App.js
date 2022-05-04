import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import ManageExpenses from './screens/ManageExpenses';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from './constants/styles';

const BottomBar = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExpensesOverview(){
  return <BottomBar.Navigator screenOptions={{
    headerStyle:{ backgroundColor:GlobalStyles.colors.primary500}, headerTintColor:'white', tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500}, tabBarActiveTintColor:'#EFE927'
  }}>
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
      background: '#21058a',
      primary: 'white'
    },
  };
  return (
    <>
      <StatusBar style='light'/>
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator >
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{headerShown:false}} />
          <Stack.Screen name="ManageExpense" component={ManageExpenses}/>
        </Stack.Navigator>
      </NavigationContainer>
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
