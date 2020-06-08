import { ITransactionsFilter } from './../../../../interfaces/transactions-filter';
import { Component } from '@angular/core';

// Services
import { TransfersService } from './../../transfers.service';

/**
 * Transactions Component
 * Displays transactions filter and history
 */
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  filter: ITransactionsFilter;
  constructor(private transfersService: TransfersService) {}

  /**
   * Handles filter on change
   */
  onFilterChange(filter: ITransactionsFilter) {
    this.transfersService.set('transactionsFilter', filter);
    this.transfersService.filterSortTransactions();
  }
}
