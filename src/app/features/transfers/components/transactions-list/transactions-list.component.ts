import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Intrefaces
import { ITransaction } from './../../../../interfaces';

// Services
import { TransfersService } from './../../transfers.service';

/**
 * Transactions List Component
 * Displays transactions list
 */
@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit {
  transactions$: Observable<ITransaction[]>;
  constructor(private transfersService: TransfersService) {}

  ngOnInit() {
    this.transactions$ = this.transfersService.select<ITransaction[]>(
      'filteredSortedTransactions'
    );
  }
}
