import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

// Interfaces
import {
  ITransaction,
  ITransactionsFilter,
  ITransfer,
} from './../../interfaces';

// Services
import { TransfersFilterService } from './transfers-filter.service';

// Mock
import { transactionsMock } from './../../../mock/transactions';

export interface State {
  transactions: ITransaction[];
  filteredSortedTransactions: ITransaction[];
  transactionsFilter: ITransactionsFilter;
  accountBalance: number;
}

const initialState: State = {
  transactions: null,
  filteredSortedTransactions: null,
  transactionsFilter: { search: '', sortBy: [] },
  accountBalance: 5824.76,
};

/**
 * Transfers Service
 */
@Injectable({
  providedIn: 'root',
})
export class TransfersService {
  // Store for managing transfers state, in the future can be replaced with ngrx store
  private subject = new BehaviorSubject<State>(initialState);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get storeValue() {
    return this.subject.value;
  }

  constructor(private transfersFilterService: TransfersFilterService) {}

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.storeValue, [name]: state });
  }

  /**
   * Gets transactions and store it in the store
   * Should be replaced with the real api call
   */
  getAllTransaction() {
    const { data } = transactionsMock;
    this.set('transactions', data);
    this.set('filteredSortedTransactions', data);
  }

  /**
   * Saves new transfer and updates store
   * Should be replaced with the real api call
   */
  sendTransfer(transfer: ITransfer) {
    const { transactions, accountBalance } = this.storeValue;
    const newTransaction: ITransaction = {
      amount: transfer.amount,
      categoryCode: '#12a580',
      merchant: transfer.merchant,
      merchantLogo: '',
      transactionDate: Date.now(),
      transactionType: 'Card Payment',
    };
    this.set('transactions', [newTransaction, ...transactions]);
    this.set('accountBalance', accountBalance - +newTransaction.amount);
    this.filterSortTransactions();
  }

  filterSortTransactions() {
    const { transactionsFilter, transactions } = this.storeValue;
    this.set(
      'filteredSortedTransactions',
      this.transfersFilterService.filterSortTransactions(
        transactionsFilter,
        transactions
      )
    );
  }
}
