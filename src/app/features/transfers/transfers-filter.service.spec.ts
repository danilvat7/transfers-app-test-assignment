// tslint:disable: no-string-literal
import { TestBed } from '@angular/core/testing';
import { TransfersFilterService } from './transfers-filter.service';

import { mockTransactionFilter } from './../../../test-utils';
import { transactionsMock } from './../../../mock/transactions';

describe('Service: TransfersFilter', () => {
  let service: TransfersFilterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransfersFilterService],
    });

    service = TestBed.inject(TransfersFilterService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should filter transaction', () => {
    const { data } = transactionsMock;
    const filteredTransactions = service['filterTransactions']('tex', data);

    expect(filteredTransactions[0].merchant).toEqual('Texaco');
  });

  it('should filter and sort transaction', () => {
    mockTransactionFilter.search = '7';
    mockTransactionFilter.sortBy = [{ prop: 'amount', direction: 1 }];
    const { data } = transactionsMock;
    const filteredTransactions = service.filterSortTransactions(
      mockTransactionFilter,
      data
    );
    expect(filteredTransactions[0].merchant).toEqual('H&M Online Store');
  });
});
