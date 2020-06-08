import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Interfaces
import { ITransfer } from './../../../interfaces';

/**
 * Approval Dialog
 */
@Component({
  selector: 'app-approval-dialog',
  templateUrl: './approval-dialog.component.html',
  styleUrls: ['./approval-dialog.component.scss'],
})
export class ApprovalDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ApprovalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITransfer
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
