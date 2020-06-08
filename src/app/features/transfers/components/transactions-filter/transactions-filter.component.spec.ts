// tslint:disable: no-string-literal
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subscriber, of } from 'rxjs';

import { TransactionsFilterComponent } from './transactions-filter.component';
import { TransfersService } from './../../transfers.service';
import { MockTransfersService } from './../../../../../test-utils';

describe('TransactionsFilterComponent', () => {
  let component: TransactionsFilterComponent;
  let fixture: ComponentFixture<TransactionsFilterComponent>;
  let transfersService: Partial<TransfersService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsFilterComponent],
      providers: [
        { provide: TransfersService, useValue: new MockTransfersService() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsFilterComponent);
    component = fixture.componentInstance;
    transfersService = fixture.debugElement.injector.get(TransfersService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to filterDebouncer', () => {
    fixture.detectChanges();
    expect(component['subscription'] instanceof Subscriber).toBeTrue();
  });

  it('should unsubscribe from filterDebouncer', () => {
    spyOn(component['subscription'], 'unsubscribe');
    fixture.detectChanges();

    component.ngOnDestroy();
    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should handle search changes and call onFilterUpdate', () => {
    spyOn<any>(component, 'onFilterUpdate');

    const nativeElement = fixture.nativeElement;
    const input = nativeElement.querySelector('input');
    input.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    expect(component['onFilterUpdate']).toHaveBeenCalled();
  });

  it('should handle search changes and call toggleSorting, updateSortBy, onFilterUpdate', () => {
    spyOn<any>(component, 'onFilterUpdate');
    spyOn<any>(component, 'updateSortBy');
    spyOn<any>(component, 'toggleSorting');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('mat-button-toggle');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component['onFilterUpdate']).toHaveBeenCalled();
    expect(component['updateSortBy']).toHaveBeenCalled();
    expect(component['toggleSorting']).toHaveBeenCalled();
  });

  it('should clear search string and call onFilterUpdate', () => {
    spyOn<any>(component, 'onFilterUpdate');

    const nativeElement = fixture.nativeElement;
    const input = nativeElement.querySelector('input');
    input.value = 'str';

    fixture.detectChanges();

    const clearIcon = nativeElement.querySelector('.searh-field--clear-icon');
    clearIcon.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component['onFilterUpdate']).toHaveBeenCalled();
    expect(input.value).toBeFalsy();
  });

  it('should toggle sorting direction', () => {
    expect(component['toggleSorting'](1)).toEqual(-1);
    expect(component['toggleSorting'](-1)).toEqual(1);
    expect(component['toggleSorting']()).toEqual(1);
  });

  it('should update sortBy in the filter', () => {
    const sortItem = { prop: 'transactionDate', direction: 1 };
    component['updateSortBy'](sortItem);
    expect(component['filter'].sortBy[0]).toEqual(sortItem);
    sortItem.direction = -1;
    component['updateSortBy'](sortItem);
    expect(component['filter'].sortBy[0]).toEqual(sortItem);
  });

  it('should update filterDebouncer Subject', () => {
    spyOn<any>(component['filterDebouncer'], 'next');
    component['onFilterUpdate']();
    expect(component['filterDebouncer'].next).toHaveBeenCalled();
  });
});
