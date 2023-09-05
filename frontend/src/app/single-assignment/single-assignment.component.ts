import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-assignment',
  templateUrl: './single-assignment.component.html',
  styleUrls: ['./single-assignment.component.css']
})
export class SingleAssignmentComponent implements OnInit {

  isEdit : boolean = false;
  assigment_date : string ="";
  assignment :any = {};
  assignment_id : number | undefined;
  submittedData : string ="";


  constructor(private http: HttpClient, private route: ActivatedRoute, private globalService: GlobalService, private sanitizer: DomSanitizer, private messageService: MessageService, private confirmationService: ConfirmationService,private router: Router,private datePipe: DatePipe) { }


  ngOnInit(): void {

    this.getAssignemnts()
  }

  sanitizeAndTrustHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getAssignemnts(){
    const token = this.globalService.getStudentLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    const assignmentId = this.route.snapshot.params['id'];
    this.assignment_id = assignmentId
    this.http.get(`${environment.API_URL}/api/assignment/${assignmentId}`, { headers }).subscribe((res:any) => {
      
      this.assignment = res[0];
      this.assigment_date = res[0].due_date;
      this.submittedData = res[0].submittedData
      console.log(res);
      
    })
  }


  handleAddSubmission(){
    const token = this.globalService.getStudentLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let submission = {
      submission_date : this.datePipe.transform(new Date, 'yyyy-MM-dd'),
      status: this.getSubmissionStatus(this.assigment_date),
      assignment_id : this.assignment_id,
      student_id: this.globalService.getStudentLoginDetails()?.id,
      submittedData : this.submittedData,
    }
    
    this.http.post(`${environment.API_URL}/api/submission`,submission,{headers}).subscribe((res)=>{
      console.log(res);
      
    })
    
  }

  getSubmissionStatus(dueDateString:string) {
    const dueDate = new Date(dueDateString);
    const submissionDate = new Date();
  
    if (submissionDate > dueDate) {
      return "Late Submitted"; 
    } else if (submissionDate <= dueDate) {
      return "Submitted"; 
    }

    return "Not Submitted";
  }




}
