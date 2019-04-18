import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Alert, AlertType } from 'app/shared/models/alert';
import { AlertService } from 'app/shared/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  alerts: Alert[] = [];
  private subscription: Subscription;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe((alert: Alert) => {
        if (!alert) {
          this.alerts = [];
          return;
        }

        this.alerts.unshift(alert);

        if (alert.autodismiss) {
          setTimeout(() => { alert.progress = 100; } , 10);
          setTimeout(() => { this.removeAlert(alert) } , 5000);
        }
      });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }

  cssIcon(alert: Alert) {
    if (!alert) {
      return;
    }

    switch (alert.type) {
      case AlertType.Success:
        return 'fa fa-check';
      case AlertType.Error:
        return 'fa fa-times-circle';
      case AlertType.Info:
        return 'fa fa-info-circle';
      case AlertType.Warning:
        return 'fa fa-warning';
    }
  }

  cssProgress(alert: Alert) {
    if (!alert) {
      return;
    }

    switch (alert.type) {
      case AlertType.Success:
        return 'progress-bar bg-success';
      case AlertType.Error:
        return 'progress-bar bg-danger';
      case AlertType.Info:
        return 'progress-bar bg-info';
      case AlertType.Warning:
        return 'progress-bar bg-warning';
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
