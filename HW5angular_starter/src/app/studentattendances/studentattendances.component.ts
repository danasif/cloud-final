import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {AttendanceService, CourseService, SimpleService} from '../_services';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-studentattendances',
  templateUrl: './studentattendances.component.html',
  styleUrls: ['./studentattendances.component.css']
})
export class StudentattendancesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private courseService: CourseService,  private simpleService: SimpleService) { }

  color = 'red';
  mode = 'determinate';
  temp = [];
  attendanceRate = 0;
  dataSource;
  courseID;
  artistName;
 attendanceTotal;
 attendCount= 0;
  displayedColumns: string[] = ['startTime', 'missed'];
  public attends: any = [];

  // This is used by the Angular Material Table.
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {


    // TODO: you need to do the following:
    // --fetch the data passed to the component
    // from whereever it is called from (Hint: look at classattendances.component.ts
    // -- produce and array of JSONs with 'startTime', 'missed' and populate the Angular material table
    // -- compute the attendance rate for 'attendanceRate

    //this.courseID = this.simpleService.id;
    this.artistName = this.simpleService.student;
    console.log('The course id is ' + this.courseID);
this.route.params.subscribe(params => {
     // this.courseID = params.courseID;

      this.courseService.getArtist( this.artistName).subscribe((Response: any) => {
        console.log(Response);
        console.log(Response.list);
        this.attendanceTotal =  Response.length;

        for (let i = 0 ; i < Response.length; i++) {
          this.attends.push(Response[i]);
        }
   // tslint:disable-next-line: align
        console.log('The number of attendances is ' + this.attends.length);

     // TODO: your code goes here. Hint: you will have to deal with nested ".subscribe()"s

  

    });





      





     // TODO: your code goes here. Hint: you will have to deal with nested ".subscribe()"s



    });

     // TODO: your code goes here. Hint: you will have to deal with nested ".subscribe()"s



   



  }


  // Hint: create a helper function that will compute how many times the student has attended.
  // getAttended(temp): number {
  //
  // }

}
