export interface AccountDetails {
  name: string;
  iban: string;
}

export interface Transaction {
  id: number;
  amount: number;
  account: AccountDetails;
}

export interface BeneficiaryData {
  firstName: string;
  lastName: string;
  iban: string;
}

export interface Beneficiary {
  id: number;
  beneficiariesData: BeneficiaryData;
}

export interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (amount: string, account: AccountDetails) => void;
  balance: number;
  beneficiaries: Beneficiary[];
  addBeneficiary: (beneficiariesData: BeneficiaryData) => void;
}

export type RootStackParamList = {
  Home: undefined;
  AddTransaction: undefined;
  AddBeneficiary: undefined;
};
