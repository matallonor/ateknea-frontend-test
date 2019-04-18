import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from 'app/shared/shared.module';

import { UsersListComponent } from './users-list.component';

import { UserService, LoaderService, AlertService } from 'app/shared/services';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersListComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        SharedModule
      ],
      providers: [ UserService, LoaderService, AlertService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the user list component', () => {
    expect(component).toBeTruthy();
  });

  it('getUsers is called when the component inits', () => {
    spyOn(component, 'getUsers');
    component.ngOnInit();
    expect(component.getUsers).toHaveBeenCalled();
  });

  it('unsubscribe subscription when the component is destroyed', () => {
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
