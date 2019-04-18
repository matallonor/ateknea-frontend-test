import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'app/shared/models/user';
import { AlertService } from 'app/shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit() { }

}
