import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import React, { useEffect, useState } from 'react';
import { RootStackParamList, TransactionContextType } from '../utils/types';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { isEmpty } from '../utils/utils';
import { useTransactions } from '../TransactionContext';
import { validateIban } from '../api/iban-validator';

// Define types for component props
type AddTransactionNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

interface AddTransactionProps {
  navigation: AddTransactionNavigationProp;
}

// Define the main AddTransaction component with typed props
const AddTransaction: React.FC<AddTransactionProps> = ({ navigation }) => {
  const [amount, setAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [iban, setIban] = useState<string>('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<string | null>(
    null,
  );
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<ItemType<string>[]>([]);

  const { addTransaction, beneficiaries } =
    useTransactions() as TransactionContextType;

  // Load the beneficiaries into the dropdown on component load
  useEffect(() => {
    if (isEmpty(beneficiaries)) {
      return;
    }
    const data = beneficiaries.map(item => {
      const name = `${item.beneficiariesData.firstName} ${item.beneficiariesData.lastName}`;
      return {
        label: name,
        value: String(item.id),
      };
    });
    setItems(data);
  }, [beneficiaries]);

  /**
   * @description Function to handle adding a new transaction
   */
  const handleTransaction = async () => {
    if (
      isEmpty(amount) ||
      isEmpty(name) ||
      isEmpty(iban) ||
      isEmpty(selectedBeneficiary)
    ) {
      return Alert.alert(
        'Details Missing!',
        'Please enter all the details in fields.',
      );
    }

    const isValid = await validateIban(iban);
    if (!isValid) {
      return Alert.alert('Invalid IBAN!', 'The provided IBAN is not valid.');
    }

    const accountDetails = { name, iban };
    addTransaction(amount, accountDetails);
    navigation.goBack();
  };

  /**
   * @description Function to handle selection of a beneficiary from the dropdown
   * @param item
   */
  const onBeneficiaryChange = (item: ItemType<string>) => {
    const beneficiary = beneficiaries.find(
      b => String(b.id) === item.value,
    )?.beneficiariesData;
    if (beneficiary) {
      setName(`${beneficiary.firstName} ${beneficiary.lastName}`);
      setIban(beneficiary.iban);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.inputStyle}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <TextInput
        style={styles.inputStyle}
        onChangeText={setName}
        value={name}
        placeholder="Recipient Name"
      />
      <TextInput
        style={styles.inputStyle}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <DropDownPicker
        open={open}
        value={selectedBeneficiary}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedBeneficiary}
        onSelectItem={onBeneficiaryChange}
        placeholder="Select beneficiary"
        style={{
          ...styles.inputStyle,
          alignSelf: 'center',
          borderRadius: 0,
        }}
        dropDownContainerStyle={styles.dropDownContainer}
        listMode="FLATLIST"
      />
      <Button title="Submit Transaction" onPress={handleTransaction} />
    </View>
  );
};

// Define styles for the input fields and dropdown container
const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  dropDownContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 0,
  },
});

export default AddTransaction;
