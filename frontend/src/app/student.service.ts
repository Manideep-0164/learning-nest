import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

 private EnrolledCourses = []

  constructor(private http : HttpClient,private globalServices : GlobalService) { }

  getEnrolledCourses(){

    const token = this.globalServices.getStudentLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this.http.get(`${environment.API_URL}/api/course/enrolled/${this.globalServices.getStudentLoginDetails()?.id}`,{headers})


  }

  


}
