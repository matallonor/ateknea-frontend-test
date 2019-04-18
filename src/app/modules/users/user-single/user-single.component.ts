import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import {
  UserService,
  AlertService,
  LoaderService
} from 'app/shared/services';

import { User } from 'app/shared/models/user';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.scss']
})
export class UserSingleComponent implements OnInit {

  user: User;
  isNewUser: boolean;
  submitAction = '';

  userForm: FormGroup;

  name: FormControl;
  lastName: FormControl;
  email: FormControl;
  enabled: FormControl;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const userId = params['userId'];
        this.isNewUser = false;
        if (this.router.url.includes('new')) {
          this.isNewUser = true;
          this.submitAction = this.translateService.instant('Save');
          this.createFormNewUser();
        } else if (userId) {
          this.submitAction = this.translateService.instant('Update');
          this.createFormEditUser(userId);
        }
      });
  }

  createFormNewUser() {
    this.user = new User();
    this.createFormControls();
    this.createForm();
  }

  createFormEditUser(userId: string) {
    this.getUser(userId);
  }

  getUser(userId: string) {
    this.loaderService.show('Loading user...');
    const subscription = this.userService.getUser(+userId);

    subscription.subscribe(
      (user) => {
        this.user = user;
        this.createFormControls();
        this.createForm();
      }, () => {
        this.router.navigate(['/not-found'],
          {
            queryParams: { fromUrl: this.router.url },
            skipLocationChange: true
          },
        );
      }, () => { // Finally
        this.loaderService.hide();
      });
  }

  createFormControls() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]);
    this.lastName = new FormControl('', [
      Validators.required,
      Validators.maxLength(40)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]);
    this.enabled = new FormControl('', []);
  }

  createForm() {
    this.userForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      enabled: this.enabled,
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(
      field => {
        const control = formGroup.get(field);

        if (control instanceof FormControl) {
          control.markAsDirty({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
  }

  getAllFormErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(
      () => {
        // const controlErrors: ValidationErrors = formGroup.get(field).errors;
        /* if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log(
              `Key control: ${field}, keyError: ${keyError}, err value: ${controlErrors[keyError]}`);
          });
        } */
      });
  }

  displayFieldCss(field: FormControl) {
    if (!field) {
      return;
    }
    return {
      'is-invalid': this.isFieldInvalid(field),
      'is-valid': this.isFieldValid(field)
    };
  }

  isFieldValid(field: FormControl) {
    if (!field) {
      return;
    }
    return field.valid && field.dirty;
  }

  isFieldInvalid(field: FormControl) {
    if (!field) {
      return;
    }
    return field.invalid && field.dirty;
  }

  confirmRemoveUser() {
    const confirmed = confirm(
      this.translateService.instant('The following action will delete the user permanently, are you sure?')
    );
    if (confirmed) {
      this.removeUser(this.user);
    }
  }

  removeUser(user) {
    this.userService.removeUser(user).subscribe(
      () => {
        this.router.navigate(['/users']).then(() => {
          const alertMessage = {
            message: this.translateService.instant('User deleted!'),
            header: 'Success',
          };
          this.alertService.success(alertMessage);
        });
      }, (error) => this.handleError(error)
    );
  }

  onSubmit() {
    this.validateAllFormFields(this.userForm);

    if (this.userForm.valid) {
      this.loaderService.show();

      if (this.isNewUser) {
        this.userService.createUser(this.user).subscribe(
          user => {
            this.router.navigate(['/users', user.id]).then(() => {
              const alertMessage = {
                message: this.translateService.instant('User created!'),
                header: 'Success',
              };
              this.alertService.success(alertMessage);
            });
          },
          error => this.handleError(error),
          () => this.loaderService.hide());
      } else {
        this.userService.updateUser(this.user).subscribe(
          () => {
            const alertMessage = {
              message: this.translateService.instant('User updated!'),
              header: 'Success',
            };
            this.alertService.success(alertMessage);
          }, (error) => {
            this.handleError(error);
          }, () => this.loaderService.hide());
      }
      this.loaderService.hide();
    } else {
      this.getAllFormErrors(this.userForm);
    }
  }

  handleError(response) {
    const alertMessage = {
      message: '',
      header: 'HTTP Error',
      autodismiss: false
    };

    if (response.name === 'HttpErrorResponse') {
      const error = response.error || response.error.error;
      alertMessage.message = error.description || error.message;
    } else {
      alertMessage.message = response;
    }

    this.loaderService.hide();
    this.alertService.error(alertMessage);
  }

}
