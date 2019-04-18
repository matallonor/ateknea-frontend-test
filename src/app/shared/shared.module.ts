import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

import {
  AlertService,
  LoaderService,
} from 'app/shared/services';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataTablesModule,
    TranslateModule.forChild({
      isolate: true
    }),
    NgSelectModule,
    NgbModule,
    ClipboardModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataTablesModule,
    TranslateModule,
    ChartsModule,
    NgSelectModule,
    NgbModule,
    ClipboardModule,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AlertService,
        LoaderService,
      ]
    };
  }
}
