import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { NotFoundComponent } from './core/components';

const routes: Routes = [
  {
    path: 'transfers',
    loadChildren: () =>
      import('./features/transfers/transfers.module').then(
        (m) => m.TransfersModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'transfers' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
