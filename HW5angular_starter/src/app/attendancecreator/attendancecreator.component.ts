import { Component, OnInit, wtfStartTimeRange } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AttendanceService, NotificationService, SimpleService} from '../_services';
import {first} from 'rxjs/operators';
import {CourseComponent} from '../course/course.component';
@Component({
  selector: 'app-attendancecreator',
  templateUrl: './attendancecreator.component.html',
  styleUrls: ['./attendancecreator.component.css']
})
export class AttendancecreatorComponent implements OnInit {
  attendanceCreateForm: FormGroup;
  loading = false;
  submitted = false;
//  courseID = '';



  constructor(
      // private patternValidator: PatternValidator,
      private formBuilder: FormBuilder,
      private router: Router,
      private attendanceService: AttendanceService,
      private notification: NotificationService,
      private route: ActivatedRoute,
      private simpleService: SimpleService
      // private subscription: any
  ) {
    // redirect to home if already logged in

  }

  ngOnInit() {
    const x = Math.floor(1000000 + Math.random() * 9000000);
    this.attendanceCreateForm = this.formBuilder.group({
      // TODO: look at the HTML to understand what goes into 'formBuilder'
    // TODO: complete the form builder.

      prof : ['d'],
      course : ['1114'],
      startTime: [''],
      startTimeHourMinute: [''], // change validation later
      duration: ['30', [Validators.required, Validators.min(10)]],
      accessCode: [x],


      // TODO: restrict the duration input field ot be a number not less than 10 with a default value of 30.
      // TODO: make 'accessCode' a random 7 digit number.
    });

    // TODO: subscribe to route params to get the courseID and assign it to this.courseID.

      }

  // convenience getter for easy access to form fields
  get f() {
    return this.attendanceCreateForm.controls; }

  onCreate() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.attendanceCreateForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    // TODO exctract the hour and minute info from 'this.attendanceCreateForm.value'
    // You need to use hour and minute values to set the exact date.
    // Unfortunately, Angular Material doesn't have a widget for this (yet) so we will have to use a 3rd party one (ngxTimepicker)
    console.log('The time is ' + this.attendanceCreateForm.value.startTimeHourMinute);
    const d: Date =  this.attendanceCreateForm.value.startTime;
    const splitted = this.attendanceCreateForm.value.startTimeHourMinute.split(':', 2);
   // console.log(splitted[0]);
    console.log('The date is  ' + d);
    d.setHours(splitted[0], splitted[1]);
    this.attendanceCreateForm.value.startTime = d;
   // TODO: do not forget about courseID (this.attendanceCreateForm.value doesn't have it from the HTML). It needs to acquire it 'manually'.
   // console.log("The course id is " + this.courseID);
    this.attendanceCreateForm.value.course = this.simpleService.id;


    console.log(this.attendanceCreateForm.value);
    this.attendanceService.createAttendance(this.attendanceCreateForm.value).pipe(first())
          .subscribe(
              () => {
               this.notification.showNotif('Attendance tracker successfully added', 'confirmation');

              },
              error => {
                console.log('Error:', error);
                this.notification.showNotif(error);
                this.loading = false;
              });
    this.router.navigate(['/']);

  }

}
