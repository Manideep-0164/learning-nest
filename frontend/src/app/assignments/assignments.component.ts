import { Component,OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CourseForDrop } from '../Allmodels.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
  providers :[ MessageService]
})


export class AssignmentsComponent implements OnInit {
  courses: CourseForDrop[] = [];
  assignments:any = [];
  selectedCourses: CourseForDrop | undefined;
  loading : boolean = true;
  array = new Array(9)
  empty : boolean = false;
  searchvalue : string = "";
  NoAssignmnetbool : boolean = false;

  constructor(private globalService : GlobalService,private datePipe: DatePipe,private http : HttpClient,private messageService: MessageService,private router : Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAllAssigment()
    this.http.get(`https://seqli.vercel.app/api/course`).subscribe((res:any) => {
      this.courses = res;
      console.log(res);
      
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

      // console.log(res); 
      return this.assignments = res;
      
    })
  }

  handleSearch(){

    const token = this.globalService.getStudentLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    console.log(`${environment.API_URL}/api/assignment/student/${this.globalService.getStudentLoginDetails()?.id}?${this.searchvalue}`,{headers});
    
    this.http.get(`${environment.API_URL}/api/assignment/student/${this.globalService.getStudentLoginDetails()?.id}?assignment=${this.searchvalue}`,{headers}).subscribe((res:any)=>{
      console.log(res);
      if(res.message == "No assignments found with given assignment's title!"){
         return this.NoAssignmnetbool =true;

       }
       this.NoAssignmnetbool = false;
       return this.assignments = res
    })
    
  }


  handleFilter(){
    const token = this.globalService.getStudentLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    
    
    this.http.get(`${environment.API_URL}/api/assignment/student/${this.globalService.getStudentLoginDetails()?.id}?course=${this.selectedCourses?.name}`,{headers}).subscribe((res:any)=>{
      console.log(res);
      this.NoAssignmnetbool =false;
      if(res.message == 'No assignments found with given course!'){
         return this.NoAssignmnetbool =true;

       }
       
       return this.assignments = res
    })
    
  }

  clearFilter(){
    this.NoAssignmnetbool = false;
    this.getAllAssigment()
  }
  
  
}
