import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { SharedModule } from 'app/shared/shared.module';

import { UserService } from 'app/shared/services';

import { UsersListComponent } from 'app/modules/users/users-list/users-list.component';
import { UserSingleComponent } from 'app/modules/users/user-single/user-single.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  providers: [
    UserService
  ],
  declarations: [
    UserSingleComponent,
    UsersListComponent
  ]
})
export class UsersModule { }
