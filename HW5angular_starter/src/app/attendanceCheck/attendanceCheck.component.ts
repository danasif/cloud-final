import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AttendanceService, NotificationService} from '../_services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-attendanceCheck',
  templateUrl: './attendanceCheck.component.html',
  styleUrls: ['./attendanceCheck.component.css']
})
export class AttendanceCheckComponent implements OnInit {
  attendanceTrackForm: FormGroup;
  loading = false;
  submitted = false;
  courseID = '';



  constructor(
      // private patternValidator: PatternValidator,
      private formBuilder: FormBuilder,
      private router: Router,
      private attendanceService: AttendanceService,
      private notification: NotificationService,
      private route: ActivatedRoute
      // private subscription: any
  ) {
    // redirect to home if already logged in

  }

  ngOnInit() {
    const x = Math.floor(1000000 + Math.random() * 9000000);
    console.log("hello");
    this.attendanceTrackForm = this.formBuilder.group({
      // TODO: look at the HTML to understand what goes into 'formBuilder'
    // TODO: complete the form builder.


      accessCode: ['']
      // TODO: restrict the duration input field ot be a number not less than 10 with a default value of 30.
      // TODO: make 'accessCode' a random 7 digit number.
    });

    // TODO: subscribe to route params to get the courseID and assign it to this.courseID.

      }

  // convenience getter for easy access to form fields
  get f() {
    return this.attendanceTrackForm.controls; }

  onTrack() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.attendanceTrackForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    // TODO exctract the hour and minute info from 'this.attendanceTrackForm.value'
    // You need to use hour and minute values to set the exact date.
    // Unfortunately, Angular Material doesn't have a widget for this (yet) so we will have to use a 3rd party one (ngxTimepicker)

   // TODO: do not forget about courseID (this.attendanceTrackForm.value doesn't have it from the HTML). It needs to acquire it 'manually'.
   

    console.log("hi");
    this.attendanceService.trackAttendance(this.attendanceTrackForm.value).pipe(first())
          .subscribe(
              () => {
               this.notification.showNotif('Attendance tracker successfully added', 'confirmation');

              },
              error => {
                console.log('Error:', error);
                this.notification.showNotif(error);
                this.loading = false;
              });

  }

}
