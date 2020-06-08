import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

// Utils
import { customValidators } from './../../../../utils';

/**
 * Transfer Form Component
 */
@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnInit, OnChanges {
  @Input() accountBalance: number;
  @Output() formSubmit = new EventEmitter();
  @ViewChild('formRef') formRef: NgForm;

  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    this.updateBalance();
  }

  /**
   * Inits form
   */
  initForm(): void {
    this.form = this.fb.group({
      account: ['', Validators.required],
      merchant: ['', Validators.required],
      amount: [
        null,
        [
          Validators.required,
          customValidators.checkBalance(this.accountBalance),
        ],
      ],
    });
    this.updateBalance();
  }

  /**
   * Updates balance in the ammount form field and resets validation rules
   */
  private updateBalance() {
    this.form
      ?.get('account')
      .patchValue(`Free Checking(4692) - $${this.accountBalance}`);

    this.form
      ?.get('amount')
      .setValidators([
        Validators.required,
        customValidators.checkBalance(this.accountBalance),
      ]);
  }

  /**
   * Handles form submit event
   */
  onSubmit() {
    this.formSubmit.emit(this.form.value);
  }

  /**
   * Resets form
   */
  resetForm() {
    this.formRef.resetForm();
    this.updateBalance();
  }
}
