import {
  AccountDetails,
  Beneficiary,
  BeneficiaryData,
  Transaction,
  TransactionContextType,
} from './utils/types';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty } from './utils/utils';

// Create the context with the proper types
const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      'useTransactions must be used within a TransactionProvider',
    );
  }
  return context;
};

// Define the type for the TransactionProvider's props
interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(1000);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  useEffect(() => {
    /**
     * @description It will load the initial data if available
     */
    const loadInitialData = async () => {
      AsyncStorage.getItem('transactionHistory').then(data => {
        if (!isEmpty(data)) setTransactions(JSON.parse(data!));
      });
      AsyncStorage.getItem('balanceHistory').then(data => {
        if (!isEmpty(data)) setBalance(JSON.parse(data!));
      });
      AsyncStorage.getItem('BeneficiariesList').then(data => {
        if (!isEmpty(data)) setBeneficiaries(JSON.parse(data!));
      });
    };
    loadInitialData();
  }, []);

  /**
   * @param amount - The amount of the transaction
   * @param account - The account details of the recipient
   * @description Adds a new transaction
   */
  const addTransaction = (amount: string, account: AccountDetails) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      account,
    };
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    const newBalance = balance - parseFloat(amount);
    setBalance(newBalance);
    AsyncStorage.setItem(
      'transactionHistory',
      JSON.stringify([...transactions, newTransaction]),
    );
    AsyncStorage.setItem('balanceHistory', JSON.stringify(newBalance));
  };

  /**
   * @param beneficiariesData - The details of the beneficiary
   * @description Adds a new beneficiary
   */
  const addBeneficiary = (beneficiariesData: BeneficiaryData) => {
    const newBeneficiary: Beneficiary = {
      id: Date.now(),
      beneficiariesData,
    };
    const allBeneficiaries = [...beneficiaries, newBeneficiary];
    setBeneficiaries(allBeneficiaries);
    AsyncStorage.setItem('BeneficiariesList', JSON.stringify(allBeneficiaries));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        balance,
        beneficiaries,
        addBeneficiary,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
