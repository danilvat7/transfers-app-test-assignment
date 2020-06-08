import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsComponent } from './transactions.component';
import { TransfersService } from './../../transfers.service';
import { MockTransfersService } from './../../../../../test-utils';
describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let transfersService: Partial<TransfersService>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsComponent],
      providers: [
        { provide: TransfersService, useValue: new MockTransfersService() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    transfersService = fixture.debugElement.injector.get(TransfersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle filterChange event', () => {
    spyOn(transfersService, 'set');
    spyOn(transfersService, 'filterSortTransactions');
    const nativeElement = fixture.nativeElement;
    const transactionsFilter = nativeElement.querySelector(
      'app-transactions-filter'
    );
    transactionsFilter.dispatchEvent(new Event('filterChange'));

    fixture.detectChanges();
    expect(transfersService.set).toHaveBeenCalled();
    expect(transfersService.filterSortTransactions).toHaveBeenCalled();
  });
});
