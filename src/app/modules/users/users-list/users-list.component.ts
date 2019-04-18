import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { User } from 'app/shared/models/user';
import { UserService, AlertService, LoaderService } from 'app/shared/services';

declare var jQuery: any;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  users: Array<User>;
  subscription: Subscription;
  dtOptions = {
    pagingType: 'simple_numbers',
    iDisplayLength: 25,
    language: { paginate: { previous: '<', next: '>' } },
    dom: `
      <"row"
        <"col-sm-12 col-md-6"l>
        <"col-sm-12 col-md-6"f>
        <"col-sm-12 col-md-4"i>
        <"col-sm-12 col-md-8"p>>
      rt
      <"row"
        <"col-sm-12 col-md-4"i>
        <"col-sm-12 col-md-8"p>>`,
    responsive: { details: false }
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private loaderService: LoaderService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loaderService.show('Loading users from server...');
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUsers() {
    this.subscription = this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
        jQuery('#users-table').dataTable(this.dtOptions);
        this.loaderService.hide();
      }, (error) => {
        this.handleError(error)
      });
  }

  handleError(response) {
    const alertMessage = {
      message: '',
      header: 'HTTP Error',
      autodismiss: false
    };

    const error = response.error.error || response.error;

    if (response.name === 'HttpErrorResponse') {
      alertMessage.message = error.description || error.message;
    } else {
      alertMessage.message = 'An unidentified error has ocurred during the execution of the request.';
    }

    this.loaderService.hide();
    this.alertService.error(alertMessage);
  }
}
