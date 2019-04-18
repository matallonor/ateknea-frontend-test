import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'app/shared/services';
import { Subscription } from 'rxjs';
import { LoaderState } from 'app/shared/interfaces/loader-state';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  show = false;
  message = '';
  private subscription: Subscription;

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.subscription = this.loaderService.getState()
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        this.message = state.message;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
