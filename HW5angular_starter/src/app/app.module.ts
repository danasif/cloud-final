import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import {MaterialModule} from './material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RegisterCourseComponent } from './registerCourse/registerCourse.component';

import { AdminComponent } from './admin/admin.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './_interceptors/jwt.interceptor';
import {ErrorInterceptor} from './_interceptors/error.interceptor';

import { artistPageComponent } from './artistpage/artistpage.component';
import { PicturePageComponent } from './picturePage/picturePage.component';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import {SimpleService } from './_services/simpleService.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CourseComponent,
    RegisterComponent,
    RegisterCourseComponent,
    AdminComponent,
    
    artistPageComponent,
    PicturePageComponent

  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        NgxMaterialTimepickerModule
    ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      SimpleService
    ],
     
  bootstrap: [AppComponent]
})
export class AppModule { }
