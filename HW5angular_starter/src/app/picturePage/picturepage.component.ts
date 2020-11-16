import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {AttendanceService, NotificationService, CourseService, SimpleService} from '../_services';

import {first} from 'rxjs/operators';
import { Course } from '../_models/course';

@Component({
  selector: 'app-picturepage',
  templateUrl: './picturepage.component.html',
  styleUrls: ['./picturepage.component.css']
})


export class PicturePageComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute,      private simpleService: SimpleService,

              private attendanceService: AttendanceService, private courseService: CourseService, private notification: NotificationService, ) {
  }
  test: any;
  report = [];
  courseID  = '';
  public students: any = [];
  public attends: any = [];
  attendanceTotal = -100000000;
  studentTotal ;
  courseAttendances = [];
  public weather: any[] = [];
  attended = 0;
  total = 0;
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'attendanceRate', 'id'];
  dataSource =this.students;
  picture: Course;
  ngOnInit() {
// TODO: here you should do the following:
//  -- get courseID from the route params (already done)
//  -- fetch the 'attendances' associated with this course
//  -- get a list of students enrolled in this course
//  -- populate the 'Angular material' table with data that matches the columns specified by 'displayedColumns'
this.courseID = this.simpleService.id;
console.log('The course id is ' + this.courseID);
this.route.params.subscribe(params => {
     // this.courseID = params.courseID;
      console.log('The course id is ' + this.courseID);

      this.courseService.getPicture(this.courseID).subscribe((Response: any) => {
        console.log(Response);
        this.picture  = Response[0];
        console.log("The picure " + this.picture);
        

        
         
     // TODO: your code goes here. Hint: you will have to deal with nested ".subscribe()"s



    });
    
     // TODO: your code goes here. Hint: you will have to deal with nested ".subscribe()"s

     

    });
  

  }


  // TODO: you need to produce an array of JSON with the following fields: 'username', 'firstName', 'lastName', 'attendanceRate', 'id'. Create a "getter" that will process the 'student' and 'courseAttendances' arrays to produce an array of JSONS suitable for the Angular material table.
  // Hint: a possible way to solve this requires two nested loops + map.
   get producePerPersonaAttendanceReport() {
    const obj = {
       id: 'test'
    };
    return obj;
   }

  // TODO: create a fucntion that will use 'router' to navigate the professor to 'studentattendnaces' component.
  // You must pass courseID and studentID.
  artistProfile(artist: string) {
    console.log("getting artist here");
    this.simpleService.student = artist;
    this.router.navigate(['/artistpage']);
  }
}


