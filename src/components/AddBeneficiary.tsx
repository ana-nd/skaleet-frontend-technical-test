import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { BeneficiaryData, RootStackParamList } from '../utils/types';
import React, { useState } from 'react';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { isEmpty } from '../utils/utils';
import { useTransactions } from '../TransactionContext';
import { validateIban } from '../api/iban-validator';

// Define types for component props
type AddBeneficiaryNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

interface AddBeneficiaryProps {
  navigation: AddBeneficiaryNavigationProp;
}

const AddBeneficiary: React.FC<AddBeneficiaryProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [iban, setIban] = useState<string>('');
  const { addBeneficiary } = useTransactions();

  /**
   * @description Handles the process of adding a new beneficiary.
   * If all checks pass, adds the beneficiary and navigates back.
   */
  const onAddBeneficiary = async () => {
    if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(iban)) {
      return Alert.alert(
        'Details Missing!',
        'Please enter all the details in fields.',
      );
    }

    const isValid = await validateIban(iban);
    if (!isValid) {
      return Alert.alert('Invalid IBAN!', 'The provided IBAN is not valid.');
    }

    const obj: BeneficiaryData = {
      firstName,
      lastName,
      iban,
    };
    addBeneficiary(obj);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.inputContainer}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="Enter First Name"
      />
      <TextInput
        style={styles.inputContainer}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Enter Last Name"
      />
      <TextInput
        style={styles.inputContainer}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <Button title="Add Beneficiary" onPress={onAddBeneficiary} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
});

export default AddBeneficiary;
