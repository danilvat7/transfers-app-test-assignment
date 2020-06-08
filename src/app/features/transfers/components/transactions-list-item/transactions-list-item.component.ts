import { Component, Input } from '@angular/core';

// Intrefaces
import { ITransaction } from './../../../../interfaces';

/**
 * Transactions List Item Component
 */
@Component({
  selector: 'app-transactions-list-item',
  templateUrl: './transactions-list-item.component.html',
  styleUrls: ['./transactions-list-item.component.scss'],
})
export class TransactionsListItemComponent {
  @Input() transaction: ITransaction;
}
