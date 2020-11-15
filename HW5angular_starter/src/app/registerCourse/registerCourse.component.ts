import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NotificationService } from '../_services/notification.service';
import { CourseService } from '../_services/course.service';
import { AuthService } from '../_services/auth.service';

@Component({templateUrl: 'registerCourse.component.html',

  styleUrls: ['registerCourse.component.css']

})
export class RegisterCourseComponent implements OnInit {
  registerCourseForm: FormGroup;
  loading = false;
  submitted = false;


  constructor(
      // private patternValidator: PatternValidator,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private courseService: CourseService,
      private notification: NotificationService
  ) {
    // redirect to home if already logged in

  }

  ngOnInit() {
    this.registerCourseForm = this.formBuilder.group({
      pieceName: [''],
      tags: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      createdDate: [''],
      imageLink: [''],
      artistName: [''],
      favorited: false,
      medium: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      pieceInfo: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]]

    });


  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerCourseForm.controls; }

  onSubmit() {
    console.log('Within on sumbit');
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerCourseForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    this.loading = true;
    this.courseService.createCourse(this.registerCourseForm.value)
        .pipe(first())
        .subscribe(
            data => {
              //  this.alertService.success('Registration successful', true);
              this.notification.showNotif('Registration successful', 'confirmation');
              this.router.navigate(['/home']);
            },
            error => {
              console.log('Error:', error);
              this.notification.showNotif(error);
              this.loading = false;
            });
    this.router.navigate(['/home']);
  }
}
