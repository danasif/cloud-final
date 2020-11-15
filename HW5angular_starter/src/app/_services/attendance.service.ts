
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


import {Attendance} from '../_models/attendance';




@Injectable({ providedIn: 'root' })
export class AttendanceService {
    constructor(private http: HttpClient) { }

    // TODO: make a get request to the back end such that it sends two parameters:'courseID' and 'studentID'. 
    //Hint: depending on how you send this data, on the back end you can read it either via 'req.params' or 'req.query'.
    viewStudentAttendances(courseID: string, studentID: string) {
        let obj = 
        {
           "courseid": courseID,
           "studentID ": studentID
        };
        console.log("We made here at least");
        return this.http.get<any>(`http://localhost:4000/attendance/student${courseID}`) //finish this

    }

    //TODO: make a get request to the back end . This is similar to viewStudentAttendances except here you should send only courseID.
    viewCourseAttendances(courseID: string) {
      
        let obj = 
        {
           "courseid": courseID
        };
        return this.http.get<any>(`http://localhost:4000/attendance/prof${courseID}`);
    }


    trackAttendance(accessCode) {
        console.log("hello world, "+ accessCode);
       
        return this.http.post(`http://localhost:4000/attendance/track`, accessCode);
    }

    createAttendance(attendance: Attendance) {
        console.log(attendance);
        return this.http.post(`http://localhost:4000/attendance/add`, attendance);
    }


    //TODO (optional&bonus). Finish the delete request that will delete attendane records.
    delete(id: string) {
        return this.http.delete(`http://localhost:4000/course/${id}`);

    }
}
