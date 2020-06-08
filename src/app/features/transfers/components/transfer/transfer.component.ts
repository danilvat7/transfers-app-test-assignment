import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

// Material
import { MatDialog } from '@angular/material/dialog';

// Interfaces
import { ITransfer } from './../../../../interfaces';

// Services
import { TransfersService } from './../../transfers.service';

// Components
import { ApprovalDialogComponent } from './../../../../shared/components';
import { TransferFormComponent } from './../transfer-form/transfer-form.component';

/**
 * Transfer Component
 * Responsible for creating new transfers
 */
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit, OnDestroy {
  @ViewChild('transferForm') transferForm: TransferFormComponent;
  accountBalance: number;
  subscription: Subscription;
  constructor(
    private transfersService: TransfersService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscribeToAccountBalance();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  /**
   * Subscribes to accountBalance
   */
  private subscribeToAccountBalance() {
    this.subscription = this.transfersService
      .select<number>('accountBalance')
      .subscribe((value) => (this.accountBalance = value));
  }

  /**
   * Handles form submit
   */
  onFormSubmit(value: ITransfer) {
    this.openDialog(value);
  }

  /**
   * Opens approval dialog
   */
  private openDialog(data: ITransfer): void {
    const dialogRef = this.dialog.open(ApprovalDialogComponent, {
      width: '300px',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sendTransfer(result);
      }
    });
  }

  /**
   * Sends new transfer and resets form
   */
  private sendTransfer(transfer: ITransfer) {
    this.transferForm.resetForm();
    this.transfersService.sendTransfer(transfer);
  }
}
