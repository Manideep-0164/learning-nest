import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-assignments',
  templateUrl: './course-assignments.component.html',
  styleUrls: ['./course-assignments.component.css']
})
export class CourseAssignmentsComponent {


  courses: any = [];
  assignments:any = [];
  selectedCourses: string | undefined;
  loading : boolean = true;
  array = new Array(9)
  empty : boolean = false

  constructor(private globalService : GlobalService,private datePipe: DatePipe,private http : HttpClient,private messageService: MessageService,private router : Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAllAssigment()
    this.http.get(`https://seqli.vercel.app/api/instructor/course/available`).subscribe((res) => {
      this.courses = res
    })

  }

  getAllAssigment(){
    this.loading = false;
    
    const courseId = this.route.snapshot.params['courseid'];
    const token = this.globalService.getStudentLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.get(`${environment.API_URL}/api/assignment/course/${courseId}`,{headers}).subscribe((res:any)=>{
      this.loading = true
      if(res.message ==  "No assignments available"){
       return this.empty =true;
      }

      console.log(res); 
      return this.assignments = res;
      
    })
  }

 

}
