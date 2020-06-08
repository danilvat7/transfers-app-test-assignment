import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsListItemComponent } from './transactions-list-item.component';
import { transactionsMock } from './../../../../../mock/transactions';

@Component({
  template:
    '<app-transactions-list-item [transaction]="transaction"></app-transactions-list-item>',
})
class TestHostComponent {
  @ViewChild(TransactionsListItemComponent)
  public uploadFileComponent: TransactionsListItemComponent;
  transaction = transactionsMock.data[0];
}

describe('TransactionsListItemComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsListItemComponent, TestHostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent.uploadFileComponent).toBeTruthy();
  });

  it('should be initialized', () => {
    expect(testHostComponent.uploadFileComponent.transaction).toEqual(
      transactionsMock.data[0]
    );
  });
});
