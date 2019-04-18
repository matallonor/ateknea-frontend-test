import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Subject ,  Observable } from 'rxjs';

import { Alert, AlertType } from 'app/shared/models/alert';

@Injectable()
export class AlertService {

  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(
    private router: Router
  ) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success({
    message = '',
    header = '',
    tip = '',
    keepAfterRouteChange = false,
    autodismiss = true
  }) {
    this.alert(AlertType.Success, header, message, tip, keepAfterRouteChange, autodismiss);
  }

  error({
    message = '',
    header = '',
    tip = '',
    keepAfterRouteChange = false,
    autodismiss = true
  }) {
    this.alert(AlertType.Error, header, message, tip, keepAfterRouteChange, autodismiss);
  }

  info({
    message = '',
    header = '',
    tip = '',
    keepAfterRouteChange = false,
    autodismiss = true
  }) {
    this.alert(AlertType.Info, header, message, tip, keepAfterRouteChange, autodismiss);
  }

  warning({
    message = '',
    header = '',
    tip = '',
    keepAfterRouteChange = false,
    autodismiss = true
  }) {
    this.alert(AlertType.Warning, header, message, tip, keepAfterRouteChange, autodismiss);
  }

  private alert(
    type: AlertType,
    header: string,
    message: string,
    tip: string,
    keepAfterRouteChange = false,
    autodismiss = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{ type, header, message, tip, progress: 0, autodismiss});
  }

  clear() {
    // clear alerts
    this.subject.next();
  }

}
