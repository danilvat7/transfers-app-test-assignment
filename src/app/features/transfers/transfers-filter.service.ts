import { Injectable } from '@angular/core';

// Interfaces
import { ITransaction, ITransactionsFilter } from './../../interfaces';

// Utils
import { multipleSorting } from './../../utils';

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
    filteredSortedTransactions = filteredSortedTransactions.sort(
      multipleSorting(sortBy)
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
          if (`${value}`?.toLowerCase().indexOf(search) > -1) {
            isExist = true;
          }
        }
      }
      return isExist && transaction;
    });
  }

  private isAllowedToFilter(field: string): boolean {
    return allowedToFilterFields.indexOf(field) > -1;
  }
}
