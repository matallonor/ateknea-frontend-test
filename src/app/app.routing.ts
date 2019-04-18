import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
} from './shared/containers';
import { P404Component } from 'app/shared/error-pages';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full', },
  {
    path: '',
    component: FullLayoutComponent,
    data: { title: '' },
    children: [
      {
        path: 'users',
        loadChildren: './modules/users/users.module#UsersModule',
      },
    ]
  },
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
