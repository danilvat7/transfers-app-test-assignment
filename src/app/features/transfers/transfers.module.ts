import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { TransfersRoutingModule } from './transfers-routing.module';

// Shared
import { SharedModule } from './../../shared/shared.module';

// Components
import {
  TransfersComponent,
  TransactionsComponent,
  TransactionsFilterComponent,
  TransactionsListComponent,
  TransferFormComponent,
  TransferComponent,
  TransactionsListItemComponent,
} from './components';

@NgModule({
  imports: [CommonModule, TransfersRoutingModule, SharedModule],
  declarations: [
    TransfersComponent,
    TransactionsComponent,
    TransactionsFilterComponent,
    TransactionsListComponent,
    TransferFormComponent,
    TransferComponent,
    TransactionsListItemComponent,
  ],
})
export class TransfersModule {}
