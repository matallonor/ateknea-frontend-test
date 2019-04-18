import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  UsersListComponent
} from 'app/modules/users/users-list/users-list.component';
import {
  UserSingleComponent
} from 'app/modules/users/user-single/user-single.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users'
    },
    children: [
      // { path: '', redirectTo: 'index', pathMatch: 'full'},
      {
        path: '',
        component: UsersListComponent,
        data: { title: '' }
      },
      {
        path: 'new',
        component: UserSingleComponent,
        data: { title: 'New User' }
      },
      {
        path: ':userId',
        component: UserSingleComponent,
        data: { title: 'User' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
