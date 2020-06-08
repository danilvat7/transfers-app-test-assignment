import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { TransfersComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: TransfersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransfersRoutingModule {}
