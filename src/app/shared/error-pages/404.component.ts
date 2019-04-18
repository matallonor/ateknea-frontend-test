import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: '404.component.html'
})
export class P404Component implements OnInit {

  fromUrl: string;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.fromUrl = params['fromUrl'];
      });
  }
}
