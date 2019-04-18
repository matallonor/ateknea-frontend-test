import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Subject ,  Observable } from 'rxjs';
import { LoaderState } from 'app/shared/interfaces/loader-state';

@Injectable()
export class LoaderService {

  private subject = new Subject<LoaderState>();

  constructor(
    private router: Router,
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.hide();
      }
    });
  }

  getState(): Observable<any> {
    return this.subject.asObservable();
  }

  show(message: string = '') {
    this.subject.next(<LoaderState>{ show: true, message });
  }

  hide() {
    this.subject.next(<LoaderState>{ show: false });
  }

}
