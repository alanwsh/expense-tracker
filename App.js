import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const BottomBar = createBottomTabNavigator();
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
        <BottomBar.Navigator screenOptions={{
          headerStyle:{ backgroundColor:'#3f04c4'}, headerTintColor:'white', tabBarActiveTintColor:'#EFE927', tabBarInactiveTintColor:'white'
        }}>
          <BottomBar.Screen name="Recent" component={RecentExpenses} options={{
            tabBarIcon:({color,size}) => <Ionicons color={color} size={size} name="hourglass-outline"/>,
            tabBarItemStyle:{backgroundColor:'#3518b7'},
          }}/>
          <BottomBar.Screen name="AllExpenses" component={AllExpenses} options={{
            tabBarIcon:({color,size}) => <Ionicons color={color} size={size} name="wallet-outline"/>,
            tabBarItemStyle:{backgroundColor:'#3518b7'},
          }}/>
        </BottomBar.Navigator>
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
