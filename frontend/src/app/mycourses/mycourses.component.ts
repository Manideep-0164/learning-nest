import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { empty, merge } from 'rxjs';
import { GlobalService } from '../global.service';
import { environment } from 'src/environments/environment';
import { MyCourses } from '../Allmodels.model';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MycoursesComponent implements OnInit {


  courses : any = []
  loading : boolean = false;
  empty : boolean = false;

  array = new Array(9)
  constructor (private http : HttpClient,private globalServices : GlobalService){}

  ngOnInit(): void {
    this.loading=true;
    const token = this.globalServices.getStudentLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.get(`${environment.API_URL}/api/course/enrolled/${this.globalServices.getStudentLoginDetails()?.id}`,{headers}).subscribe((res:any)=>{
      this.courses =res;
      this.loading=false;
      if(typeof res == 'object' || res.message == 'You did not enrolled any courses, Please enroll!'){
        this.empty= true 
      }
        this.empty = false;
      console.log(res);
      
      
    })
   

  }

 

}
