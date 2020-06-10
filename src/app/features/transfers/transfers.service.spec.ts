/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';

import { TransfersService } from './transfers.service';
import { TransfersFilterService } from './transfers-filter.service';
import { ITransfer } from './../../interfaces';

import { MockTransfersFilterService } from './../../../test-utils';
import { transactionsMock } from './../../../mock/transactions';

describe('Service: Transfers', () => {
  let service: TransfersService;
  let transfersFilterService: Partial<TransfersFilterService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransfersService,
        {
          provide: TransfersFilterService,
          useValue: new MockTransfersFilterService(),
        },
      ],
    });

    service = TestBed.inject(TransfersService);
    transfersFilterService = TestBed.inject(TransfersFilterService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return store value', () => {
    expect('transactions' in service.storeValue).toBeTrue();
  });

  it('should select property from store', () => {
    expect(service.select('accountBalance')).toBeTruthy();
    service
      .select('accountBalance')
      .subscribe((val) => expect(typeof val).toEqual('number'));
  });

  it('should set property to the store', () => {
    const newBalance = 1000;
    service.set('accountBalance', newBalance);
    service
      .select('accountBalance')
      .subscribe((val) => expect(val).toEqual(newBalance));
  });

  it('should set transaction and filteredSortedTransactions to the store', () => {
    service.getAllTransaction();
    const { transactions, filteredSortedTransactions } = service.storeValue;
    expect(transactions[0].merchant).toEqual(transactionsMock.data[0].merchant);
    expect(filteredSortedTransactions[0].merchant).toEqual(
      transactionsMock.data[0].merchant
    );
  });

  it('should set new transfer to the store and call filterSortTransactions', () => {
    spyOn(service, 'filterSortTransactions');

    const newTransfer: ITransfer = {
      account: '',
      merchant: 'Test merchant',
      amount: 100,
    };
    const { data } = transactionsMock;
    service.set('transactions', data);

    service.sendTransfer(newTransfer);

    const { transactions } = service.storeValue;
    expect(transactions[0].merchant).toEqual(newTransfer.merchant);
    expect(service.filterSortTransactions).toHaveBeenCalled();
  });

  it('should call transfersFilterService.filterSortTransactions and set filteredSortedTransactions to the store', () => {
    const filteredTransactions = [transactionsMock.data[0]];
    spyOn(transfersFilterService, 'filterSortTransactions').and.returnValue(
      filteredTransactions
    );

    service.filterSortTransactions();

    const { filteredSortedTransactions } = service.storeValue;

    expect(filteredSortedTransactions).toEqual(filteredTransactions);
  });
});
