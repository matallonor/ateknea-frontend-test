import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'app/shared/shared.module';

import { UserSingleComponent } from './user-single.component';

import {
  UserService,
  LoaderService,
  AlertService,
} from 'app/shared/services';

describe('UserSingleComponent', () => {
  let component: UserSingleComponent;
  let fixture: ComponentFixture<UserSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSingleComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        SharedModule
      ],
      providers: [
        UserService,
        LoaderService,
        AlertService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
