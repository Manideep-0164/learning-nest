import { Component,OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
  providers :[ MessageService]
})


export class AssignmentsComponent implements OnInit {
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
    const token = this.globalService.getStudentLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.get(`${environment.API_URL}/api/assignment/student/${this.globalService.getStudentLoginDetails()?.id}`,{headers}).subscribe((res:any)=>{
      this.loading = true
      if(res.message == "You did not have any assignments!"){
       return this.empty =true;
      }

      console.log(res); 
      return this.assignments = res;
      
    })
  }

 

  
  
}
