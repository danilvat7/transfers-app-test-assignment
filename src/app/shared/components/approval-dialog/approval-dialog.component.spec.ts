import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

import { ApprovalDialogComponent } from './approval-dialog.component';

describe('ApprovalDialogComponent', () => {
  let component: ApprovalDialogComponent;
  let fixture: ComponentFixture<ApprovalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ApprovalDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: () => {} } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog window', () => {
    spyOn(component.dialogRef, 'close');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelectorAll('button')[1];
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.dialogRef.close).toHaveBeenCalled();

    component.onNoClick();

    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
