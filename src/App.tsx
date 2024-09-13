import AddBeneficiary from './components/AddBeneficiary';
import AddTransaction from './components/AddTransaction';
import HomeScreen from './components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { TransactionProvider } from './TransactionContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TransactionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: 'Home',
            }}
          />
          <Stack.Screen
            name="AddTransaction"
            component={AddTransaction}
            options={{
              headerTitle: 'Add Transaction',
            }}
          />
          <Stack.Screen
            name="AddBeneficiary"
            component={AddBeneficiary}
            options={{
              headerTitle: 'Add Beneficiary',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
};

export default App;
