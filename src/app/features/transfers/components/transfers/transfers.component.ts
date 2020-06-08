import { Component, OnInit } from '@angular/core';

// Services
import { TransfersService } from './../../transfers.service';

/**
 * Transfers Component
 * Main transfers container
 */
@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
})
export class TransfersComponent implements OnInit {
  constructor(private transfersService: TransfersService) {}

  ngOnInit() {
    this.transfersService.getAllTransaction();
  }
}
