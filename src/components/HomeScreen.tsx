import { Beneficiary, RootStackParamList, Transaction } from '../utils/types';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTransactions } from '../TransactionContext';

// Define types for component props
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

// Define the main HomeScreen component with typed props
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { transactions, balance, beneficiaries } = useTransactions();

  /**
   * @description renders transactions list
   */
  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Transaction ID: {item.id}</Text>
      <Text style={styles.itemText}>Amount: ${item.amount.toFixed(2)}</Text>
      {item.account && (
        <>
          <Text style={styles.itemText}>To: {item.account.name}</Text>
          <Text style={styles.itemText}>IBAN: {item.account.iban}</Text>
        </>
      )}
    </View>
  );

  /**
   * @description renders beneficiaries list
   */
  const renderBeneficiaryItem = ({ item }: { item: Beneficiary }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Beneficiary ID: {item.id}</Text>
      <Text style={styles.itemText}>
        First Name: {item.beneficiariesData.firstName}
      </Text>
      <Text style={styles.itemText}>
        Last Name: {item.beneficiariesData.lastName}
      </Text>
      <Text style={styles.itemText}>IBAN: {item.beneficiariesData.iban}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        Current Balance: ${balance.toFixed(2)}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Transaction"
          onPress={() => navigation.navigate('AddTransaction')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Beneficiary"
          onPress={() => navigation.navigate('AddBeneficiary')}
        />
      </View>
      {transactions.length > 0 && (
        <View style={styles.flatListContainer}>
          <Text style={styles.listTitle}>Transactions</Text>
          <FlatList
            data={transactions}
            keyExtractor={item => item.id.toString()}
            renderItem={renderTransactionItem}
          />
        </View>
      )}
      {beneficiaries.length > 0 && (
        <View style={styles.flatListContainer}>
          <Text style={styles.listTitle}>Beneficiaries</Text>
          <FlatList
            data={beneficiaries}
            keyExtractor={item => item.id.toString()}
            renderItem={renderBeneficiaryItem}
          />
        </View>
      )}
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 8
  },
  flatListContainer: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  item: {
    minWidth: '90%',
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
});

export default HomeScreen;
