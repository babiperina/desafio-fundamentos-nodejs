import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { uuid } from 'uuidv4';

interface Request {
  title: string,
  value: number,
  type: 'income'|'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {

    return this.transactionsRepository.create(title, value, type);
  }
}

export default CreateTransactionService;
