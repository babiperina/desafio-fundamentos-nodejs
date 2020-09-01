import Transaction from '../models/Transaction';
import transactionRouter from '../routes/transaction.routes';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {    
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, transaction) => {
      if(transaction.type == 'income') return total += transaction.value;
      else return total;
    },0);

    const outcome = this.transactions.reduce((total, transaction) => {
      if(transaction.type == 'outcome') return total += transaction.value;
      else return total;
    },0);

    const total = income - outcome;

    if(total < 0) {
      throw Error('An invalid value to balance');
    }

    return {income, outcome, total};
  }

  public create(title:string, value:number, type: 'income' | 'outcome'): Transaction {

    const transaction = new Transaction({
      title, 
      value, 
      type
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
