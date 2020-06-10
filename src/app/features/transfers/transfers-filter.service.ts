import { Injectable } from '@angular/core';

// Lodash
import { orderBy as multipleSort } from 'lodash';

// Interfaces
import {
  ITransaction,
  ITransactionsFilter,
  ISortByItem,
} from './../../interfaces';

const allowedToFilterFields = ['merchant', 'amount', 'transactionType'];

/**
 * Transfers Filter Service
 */
@Injectable({
  providedIn: 'root',
})
export class TransfersFilterService {
  /**
   * Filters and sorts transactions
   */
  filterSortTransactions(
    transactionsFilter: ITransactionsFilter,
    transactions: ITransaction[]
  ): ITransaction[] {
    const { search, sortBy } = transactionsFilter;
    let filteredSortedTransactions = transactions;
    if (search) {
      // Filer
      filteredSortedTransactions = this.filterTransactions(
        search,
        transactions
      );
    }
    // Sort
    filteredSortedTransactions = this.sortTransactions(
      filteredSortedTransactions,
      sortBy
    );

    return filteredSortedTransactions;
  }

  private filterTransactions(
    search: string,
    transactions: ITransaction[]
  ): ITransaction[] {
    return transactions.filter((transaction) => {
      let isExist = false;

      for (const [key, value] of Object.entries(transaction)) {
        if (this.isAllowedToFilter(key)) {
          if (`${value}`?.toLowerCase().includes(search)) {
            isExist = true;
          }
        }
      }
      return isExist && transaction;
    });
  }

  private isAllowedToFilter(field: string): boolean {
    return allowedToFilterFields.includes(field);
  }

  private sortTransactions(
    transactions: ITransaction[],
    sortBy: ISortByItem[]
  ): ITransaction[] {
    const sortFields = sortBy.map((item) => item.prop);
    const sortDirections = sortBy.map((item) => {
      return item.direction === 1 ? 'asc' : 'desc';
    });
    return multipleSort(transactions, sortFields, sortDirections);
  }
}
