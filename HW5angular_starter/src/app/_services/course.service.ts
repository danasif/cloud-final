
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../_models/course';
import { User } from '../_models/user';



@Injectable({ providedIn: 'root' })
export class CourseService {
    constructor(private http: HttpClient) { }

    getAll() {
        console.log('getAll()');
        return this.http.get<Course[]>(`http://localhost:4000/course/getcourses`);
    }



    //TODO: notice this new function.
    getEnrolledStudents(courseID: string) {
        console.log("The returning values are " +this.http.get<any>(`http://localhost:4000/course/getstudents${courseID}`));
        return this.http.get<any>(`http://localhost:4000/course/getstudents${courseID}`);
    }


    delete(id: string) {
        return this.http.delete(`http://localhost:4000/course/${id}`);

    }
    getPicture(courseID: string) {
      
       
        console.log("We are wanting a picture, the course id is " + courseID);
        return this.http.get<any>(`http://localhost:4000/course/getPicture${courseID}`);
    }
    getArtist(artist: string) {
      
       
        console.log("We are wanting the artists collection " + artist);
        return this.http.get<any>(`http://localhost:4000/course/getArtistPictures${artist}`);
    }
    //TODO-Done?: make a post request that will send the course object to the back end.
    createCourse(course: Course) {
        console.log("hello world");
        course.imageLink = "assets/" + course.imageLink;
        return this.http.post(`http://localhost:4000/course/addCourse`, course);
    }

}
