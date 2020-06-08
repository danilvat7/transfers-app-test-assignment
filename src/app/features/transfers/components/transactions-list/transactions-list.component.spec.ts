import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsListComponent } from './transactions-list.component';
import { TransfersService } from './../../transfers.service';
import { MockTransfersService } from './../../../../../test-utils';

describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;
  let transfersService: Partial<TransfersService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsListComponent],
      providers: [
        { provide: TransfersService, useValue: new MockTransfersService() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListComponent);
    component = fixture.componentInstance;
    transfersService = fixture.debugElement.injector.get(TransfersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select filteredSortedTransactions from transfersService', () => {
    spyOn(transfersService, 'select');

    fixture.detectChanges();

    expect(transfersService.select).toHaveBeenCalledWith(
      'filteredSortedTransactions'
    );
  });
});
