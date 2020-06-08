// tslint:disable: no-string-literal
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of, Subscriber, BehaviorSubject } from 'rxjs';

import { TransferComponent } from './transfer.component';
import { TransfersService } from './../../transfers.service';
import { ITransfer } from './../../../../interfaces';

import {
  MockTransfersService,
  MockMatDialog,
} from './../../../../../test-utils';

@Component({
  selector: 'app-transfer-form',
  template: '',
})
class MockTransferFormComponent {
  resetForm(): void {}
}

const mockBalance = 1000;
const newTransfer: ITransfer = {
  account: '',
  merchant: 'Test merchant',
  amount: '100',
};

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;
  let transfersService: Partial<TransfersService>;
  let dialog: Partial<MatDialog>;

  let selectSpyOn: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransferComponent, MockTransferFormComponent],
      providers: [
        { provide: TransfersService, useValue: new MockTransfersService() },
        { provide: MatDialog, useValue: new MockMatDialog() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    transfersService = fixture.debugElement.injector.get(TransfersService);
    dialog = fixture.debugElement.injector.get(MatDialog);

    selectSpyOn = spyOn(transfersService, 'select').and.returnValue(
      of(mockBalance)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to accountBalance', () => {
    fixture.detectChanges();
    expect(component['subscription'] instanceof Subscriber).toBeTrue();
  });

  it('should unsubscribe from accountBalance', () => {
    spyOn(component['subscription'], 'unsubscribe');
    fixture.detectChanges();

    component.ngOnDestroy();
    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should initialized accountBalance in the component', () => {
    expect(component.accountBalance).toEqual(mockBalance);
  });

  it('should handle form submit and call openDialog', () => {
    spyOn<any>(component, 'openDialog');

    const nativeElement = fixture.nativeElement;
    const form = nativeElement.querySelector('app-transfer-form');
    form.dispatchEvent(new Event('formSubmit'));

    expect(component['openDialog']).toHaveBeenCalled();
  });

  it('should call dialog.open and call sendTransfer', () => {
    const mockAfterClosed = new BehaviorSubject({});
    spyOn<any>(dialog, 'open').and.returnValue({
      afterClosed() {
        return mockAfterClosed;
      },
    });
    spyOn<any>(component, 'sendTransfer');

    component['openDialog'](newTransfer);

    expect(dialog.open).toHaveBeenCalled();
    expect(component['sendTransfer']).toHaveBeenCalled();
  });

  it('should reset the form and call transfersService.sendTransfer', () => {
    spyOn(transfersService, 'sendTransfer');
    spyOn(component.transferForm, 'resetForm');

    component['sendTransfer'](newTransfer);

    expect(transfersService.sendTransfer).toHaveBeenCalled();
    expect(component.transferForm.resetForm).toHaveBeenCalled();
  });
});
