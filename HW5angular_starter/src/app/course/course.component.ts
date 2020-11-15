import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Course} from '../_models/course';
import {User} from '../_models/user';
import {NotificationService, AuthService, SimpleService, CourseService} from '../_services';
import {Role} from '../_models/role';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'course-component',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Input() user: User;
  @Output() deleteEvent = new EventEmitter<string>();
  //TODO: notice the new event emmiters. This will communicate user interactions with this component to the home component.
  @Output() registerEvent = new EventEmitter<string>();
  @Output() createAttendanceEvent = new EventEmitter<string>();
  @Output() courseAttendancesEvent = new EventEmitter<string>();
    @Output() studentAttendancesEvent = new EventEmitter<string>();

     registeredList: string[];
     userRole = '';
     added = false ;
     userId = '';
     favorite =false;
   

   
  get isProf() {
      return this.userRole && this.userRole === Role.professor;
  }

   constructor(private notifService: NotificationService, private authService: AuthService, private simpleService : SimpleService, private courseService: CourseService ) {}
   
  ngOnInit() {
    this.authService.currentUser.subscribe(x => {
        if (x) {
        this.registeredList = x.courses;
       
        this.userRole = x.role;
        this.userId = x._id;
        console.log(this.courseService.getEnrolledStudents(this.course._id));
        
       
        }}

        );
  }

  delete(id) {
    this.deleteEvent.emit(id);
  }
  fav(){
    this.favorite = true;
  }
  unfav(){
    this.favorite = false;
  }

  register(id) {
    console.log("Is this  this?"+ id);
    this.simpleService.id = id;
    this.added = true;
    this.registerEvent.emit(id);
  }

  attendance(id) {
        console.log("hi");
        this.simpleService.id = id;

        this.createAttendanceEvent.emit(id);
  }


    // this is for the prof
    viewCourseAttendances(id: string) {
      console.log("viewing course");
      this.simpleService.id = id;
        this.courseAttendancesEvent.emit(id);
    }

    // this is for the student
    viewStudentAttendances(id: string ) {
      this.simpleService.id = id;
      console.log("The user id is " + this.userId);
      this.simpleService.student = this.userId;
  
        this.studentAttendancesEvent.emit(id);
    }
}

