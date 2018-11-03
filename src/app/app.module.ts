import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { FormErrorComponent } from './shared/form-error/form-error.component';


// Http Client
import { HttpcallService } from './services/httpcall.service';
import { HttpClientModule } from '@angular/common/http';

import { PagerService } from './services/pager.service';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule, ButtonsModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    FormErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
      progressBar:false,
      closeButton:true,
      preventDuplicates: true
    }),
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpcallService,PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
