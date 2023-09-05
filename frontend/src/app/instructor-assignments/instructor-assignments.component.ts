import { Component,OnInit,ViewChild  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlobalService } from '../global.service';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { TabView } from 'primeng/tabview';

@Component({
  selector: 'app-instructor-assignments',
  templateUrl: './instructor-assignments.component.html',
  styleUrls: ['./instructor-assignments.component.css'],
  providers: [MessageService]
})
export class InstructorAssignmentsComponent implements OnInit {
  @ViewChild('tabView') tabView: TabView | undefined;

  assignments : any = [];
  date: Date | undefined;
  text: string = "<h1>Description here...</h1>";
  name: string | undefined;
  due_date: string | undefined;
  loading : boolean = false;
  constructor(private globalService : GlobalService,private datePipe: DatePipe,private http : HttpClient,private messageService: MessageService,private router : Router,private route: ActivatedRoute) {}


  ngOnInit(): void {

    this.getAllAssigment()
    
  }

  
  getAllAssigment(){
    const token = this.globalService.getInstructorLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.get(`${environment.API_URL}/api/assignment/course/${this.globalService.getInstructorLoginDetails()?.course_id}`,{headers}).subscribe((res)=>{
      this.assignments = res;
      // console.log(res);
      
    })
  }


  handleAssignment() {
    this.loading = true;
    const token = this.globalService.getInstructorLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let newAsssignment = {
      title: this.name,
      description: this.text,
      due_date: this.datePipe.transform(this.date, 'yyyy-MM-dd'),
      course_id : this.globalService.getInstructorLoginDetails()?.course_id 
    }

      this.http.post(`${environment.API_URL}/api/assignment`,newAsssignment,{headers}).subscribe((res)=>{
        this.loading= false;
        this.messageService.add({ key: 'tc', severity: 'success', summary: 'Assignment', detail: 'Assignment Added' });
        this.getAllAssigment();
        if (this.tabView) {
          console.log(this.tabView);
          
          this.tabView.activeIndex = 0;
        }  
      })
  }

}
