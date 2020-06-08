// tslint:disable: no-string-literal

import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFormComponent } from './transfer-form.component';

describe('TransferFormComponent', () => {
  let component: TransferFormComponent;
  let fixture: ComponentFixture<TransferFormComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TransferFormComponent],
      providers: [{ provide: FormBuilder, useValue: formBuilder }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form', () => {
    fixture.detectChanges();
    expect(component.form).toBeTruthy();
    expect(component.form.get('account')).toBeTruthy();
    expect(component.form.get('merchant')).toBeTruthy();
    expect(component.form.get('amount')).toBeTruthy();
  });

  it('should call updateBalance', () => {
    spyOn<any>(component, 'updateBalance');
    component.ngOnChanges();
    expect(component['updateBalance']).toHaveBeenCalled();
    component.initForm();
    expect(component['updateBalance']).toHaveBeenCalled();
  });

  it('should update balance in the account form field', () => {
    const balance = 1000;
    component.accountBalance = balance;
    component['updateBalance']();
    expect(
      component.form.get('account').value.indexOf(`${balance}`)
    ).toBeGreaterThan(-1);
  });

  it('should emit event on formSubmit', () => {
    spyOn(component.formSubmit, 'emit');

    component.onSubmit();
    expect(component.formSubmit.emit).toHaveBeenCalled();
  });

  it('should reset form and call updateBalance', () => {
    spyOn<any>(component, 'updateBalance');
    component.form.get('amount').setValue(1000);
    component.resetForm();
    expect(component.form.get('amount').value).toBeFalsy();
    expect(component['updateBalance']).toHaveBeenCalled();
  });
});
