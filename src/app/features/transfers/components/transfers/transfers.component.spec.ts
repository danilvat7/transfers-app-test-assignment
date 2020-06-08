import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransfersComponent } from './transfers.component';
import { TransfersService } from './../../transfers.service';
import { MockTransfersService } from './../../../../../test-utils';

describe('TransfersComponent', () => {
  let component: TransfersComponent;
  let fixture: ComponentFixture<TransfersComponent>;
  let transfersService: Partial<TransfersService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersComponent],
      providers: [
        { provide: TransfersService, useValue: new MockTransfersService() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfersComponent);
    component = fixture.componentInstance;
    transfersService = fixture.debugElement.injector.get(TransfersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call transfersService.getAllTransaction', () => {
    spyOn(transfersService, 'getAllTransaction');
    fixture.detectChanges();
    expect(transfersService.getAllTransaction).toHaveBeenCalled();
  });
});
