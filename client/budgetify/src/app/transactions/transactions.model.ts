export interface Transaction {
  accountTitle?: string;
  type: string;
  title?: string;
  category: string[];
  description?: string;
  amount: number;
  payee?: string;
  date: any;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
