import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ITransactionsFilter, ISortByItem } from './../../../../interfaces';

interface ISortBtn {
  field: string;
  label: string;
  sort: 1 | -1;
}
/**
 * Transactions Filter Component
 * Responsible for filtering and sorting for transactions history
 */
@Component({
  selector: 'app-transactions-filter',
  templateUrl: './transactions-filter.component.html',
  styleUrls: ['./transactions-filter.component.scss'],
})
export class TransactionsFilterComponent implements OnInit, OnDestroy {
  @Output() filterChange = new EventEmitter<ITransactionsFilter>();
  private filterDebouncer: Subject<any> = new Subject<ITransactionsFilter>();
  private subscription: Subscription;

  sortBtns: ISortBtn[] = [
    {
      field: 'transactionDate',
      label: 'DATE',
      sort: null,
    },
    {
      field: 'merchant',
      label: 'BENEFICIARY',
      sort: null,
    },
    {
      field: 'amount',
      label: 'AMOUNT',
      sort: null,
    },
  ];
  private filter: ITransactionsFilter = {
    search: '',
    sortBy: [],
  };

  ngOnInit() {
    this.subscribeFilterToFilterDebouncer();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  /**
   * Subscribes to debounce subject for emitting filter changes with timeout
   */
  private subscribeFilterToFilterDebouncer(): void {
    this.subscription = this.filterDebouncer
      .pipe(debounceTime(300))
      .subscribe((value) => this.filterChange.emit(value));
  }

  /**
   * Handles search input changes
   */
  onSearchChange(search: string): void {
    this.onFilterUpdate({ search });
  }

  /**
   * Handles sort buttons clicks
   */
  onSortChange(field: string): void {
    this.sortBtns.forEach((sortItem) => {
      if (sortItem.field === field) {
        sortItem.sort = this.toggleSorting(sortItem.sort);
        this.updateSortBy({ prop: field, direction: sortItem.sort });
        this.onFilterUpdate();
      }
    });
  }

  /**
   * Clears search input
   */
  onClearSearch() {
    this.onFilterUpdate({ search: '' });
  }

  /**
   * Toggles sort direction
   */
  private toggleSorting(curr?: 1 | -1): 1 | -1 {
    return (!curr && 1) || (curr === 1 ? -1 : 1);
  }

  /**
   * Updates sortBy array in the filter
   */
  private updateSortBy(sortByItem: ISortByItem): void {
    const { sortBy } = this.filter;
    const sortByItemIndex = sortBy.findIndex(
      (item) => item.prop === sortByItem.prop
    );
    if (sortByItemIndex > -1) {
      sortBy[sortByItemIndex] = sortByItem;
    } else {
      sortBy.push(sortByItem);
    }
  }

  /**
   * Updates filter
   */
  private onFilterUpdate(filterItem?: { [field: string]: any }): void {
    this.filter = { ...this.filter, ...filterItem };
    this.filterDebouncer.next(this.filter);
  }
}
