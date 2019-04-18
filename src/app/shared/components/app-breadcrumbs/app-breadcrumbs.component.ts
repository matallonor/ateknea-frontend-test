import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './app-breadcrumbs.component.html'
})
export class AppBreadcrumbsComponent {
  breadcrumbs: Array<Object>;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    filter.call(
      this.router.events.subscribe(() => {
        this.breadcrumbs = [];
        let currentRoute = this.route.root,
          url = '';
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          // tslint:disable-next-line:no-shadowed-variable
          childrenRoutes.forEach(route => {
            if (route.outlet === 'primary') {
              const routeSnapshot = route.snapshot;
              url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
              this.breadcrumbs.push({
                label: route.snapshot.data,
                url:   url
              });
              currentRoute = route;
            }
          });
        } while (currentRoute);
      })
    );
  }
}
