import {Component, OnInit} from '@angular/core';

import {Course} from '../_models/course';
import {NotificationService} from '../_services/notification.service';
import {CourseService} from '../_services/course.service';
import {first} from 'rxjs/operators';
import {Route, Router} from '@angular/router';
import {UserService, AuthService} from '../_services';
import {User} from '../_models/user';
import {Role} from '../_models/role';
import { HttpClient } from '@angular/common/http';

@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {
  currentUser: User;

  courses: Course[] = [];
    constructor(
    private courseService: CourseService,
    private userService: UserService,
    private authService: AuthService,
    private notifService: NotificationService,
    private router: Router,
    private http: HttpClient
  ) {

      // Observing currentUser. We will need it to get user's id.
      this.authService.currentUser.subscribe(x => this.currentUser = x);

    }

  ngOnInit() {
    this.loadAllClasses();
      }


  private loadAllClasses() {

    this.courseService.getAll().subscribe(
      courses => {this.courses = courses; },
        error => {this.notifService.showNotif(error, 'error'); });
  }

  createCourse() {
    // TODO:You need to use a Router instnace to navigate the user to the
    // 'coursecreator' component's route.
    // This will load the 'coursecreator' component
    this.router.navigate(['/registerCourse']);

  }

  // TODO: call this function when student's want to track attendance.
  //  Use Router's route function to navigate to the 'attendancetracker' component.
  trackAttendance() {
    this.router.navigate(['/trackAttendance']);
  }

  //TODO: use this getter in the HTML to hid the buttons that professor's shouldn't see.
  get isProf(){
      return this.currentUser.role === Role.professor;
  }

  deleteCourse(id: string) {
    this.courseService.delete(id).pipe(first()).subscribe(() => {
      this.courses = null;
      this.loadAllClasses();
    });
  }

  //TODO: here you receive the id of the course that the student wants to register. Use userService to complete this request.
  registerCourse(id: string) {
    console.log("testing");
    this.userService.registerCourse(id).pipe(first())
    .subscribe(
        () => {
         this.notifService.showNotif('Student has  added the course', 'confirmation');

        },
        error => {
          console.log('Error:', error);
          this.notifService.showNotif(error);
          //this.loading = false;
        });
        this.router.navigate(['/']);
      //  return this.http.post(`http://localhost:4000/user/registercourse`, id);
      }

  //TODO: here you receive the id of the course for which a professor wants to create a new attendance object.
  // you will 'carry' that course id to the 'attendancecreator' component that will be opened shortly after the button click.
  // use Router's navigate function to pass information to the other component.
  createAttendance(id: string) {
    console.log("hello world, the id is" + id);
    this.router.navigate(['/createAttendance']);
  }


  //TODO: this is very similar to 'createAttendance()' except here you pass two bits of information to 'studentattendances' component: courseID and studentID. Again, use Router's navigate function to pass information to the other component. Hint: you can use 'this.currentUser._id' to get studentID.
  viewStudentAttendances(id: string) {
    this.router.navigate(['/studentAttendances']);
  }

  // TODO:  use Router's navigate function to pass courseID to the 'classattendances' component.
  viewCourseAttendances(id: string) {
    console.log("HIIIIII");

    this.router.navigate(['/getPicture']);
  }
}

