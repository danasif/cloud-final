import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RegisterCourseComponent} from './registerCourse/registerCourse.component';

import {Role} from './_models/role';
import {AuthGuard} from './_guards/auth.guard';
import {AdminComponent} from './admin/admin.component';
import {AttendanceCheckComponent} from './attendanceCheck/attendanceCheck.component';

import {AttendancecreatorComponent} from './attendancecreator/attendancecreator.component';
import {artistPageComponent} from './artistpage/artistpage.component';
import {PicturePageComponent} from './picturePage/picturePage.component';

//TODO: do not forget to register the components here.

const routes: Routes = [{path: '', component: HomeComponent, canActivate: [AuthGuard]}, {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'registerCourse', component: RegisterCourseComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    // The prof route also sets the roles data property to [Role.professor] so only admin users can access it.
    data: { roles: [Role.professor] }
  },

  {
    path: 'createAttendance',
    component: AttendancecreatorComponent,
    canActivate: [AuthGuard],
    // The prof route also sets the roles data property to [Role.Admin] so only admin users can access it.
    data: { roles: [Role.professor] }
  },
  {
    path: 'trackAttendance',
    component: AttendanceCheckComponent,
    canActivate: [AuthGuard],
    // The prof route also sets the roles data property to [Role.Admin] so only admin users can access it.
    data: { roles: [Role.student] }
  },
  {
    path: 'artistpage',
    component: artistPageComponent,
    canActivate: [AuthGuard],
    // The prof route also sets the roles data property to [Role.Admin] so only admin users can access it.
    data: { roles: [Role.professor, Role.student] }
  },
  {
    path: 'getPicture',
    component: PicturePageComponent,
  
    // The prof route also sets the roles data property to [Role.Admin] so only admin users can access it.
   
  },
  {
    path: 'course',
    component: PicturePageComponent,
    canActivate: [AuthGuard],
    // The prof route also sets the roles data property to [Role.Admin] so only admin users can access it.
    data: { roles: [Role.professor] }
  },

  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
