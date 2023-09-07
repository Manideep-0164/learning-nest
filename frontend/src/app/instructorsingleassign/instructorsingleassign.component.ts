import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-instructorsingleassign',
  templateUrl: './instructorsingleassign.component.html',
  styleUrls: ['./instructorsingleassign.component.css']
})
export class InstructorsingleassignComponent implements OnInit {

  assignment: any = {}
  text : any = "";
  isEdit : boolean= true;
  title: string ="";
  due_date : string =""

  constructor(private http: HttpClient, private route: ActivatedRoute, private globalService: GlobalService, private sanitizer: DomSanitizer, private messageService: MessageService, private confirmationService: ConfirmationService,private router: Router,private datePipe: DatePipe) { }

  ngOnInit(): void {
   
    this.getAllAssignemnts()


  }


  getAllAssignemnts(){
    const token = this.globalService.getInstructorLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    const assignmentId = this.route.snapshot.params['id'];
    this.http.get(`${environment.API_URL}/api/assignment/${assignmentId}`, { headers }).subscribe((res:any) => {
      this.assignment = res;
      this.title = res.title;
      this.due_date = res.due_date
      this.text = res.description
      console.log(res);
      
    })
  }

  sanitizeAndTrustHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  handleEdit(id:number){
    this.isEdit  = !this.isEdit ;
   
  }


  deleteConfirm(id: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Assignment?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(id);

        const token = this.globalService.getInstructorLoginDetails()?.token ?? '';
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token
        });

        this.http.delete(`${environment.API_URL}/api/assignment/${id}`,{headers}).subscribe((res) => {
          console.log(res);
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Assignment deleted' });
          this.router.navigate(['/instructor/assignments'])
  
        })
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });

            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
          default:
            // Handle other cases if needed
            break;
        }
      }
    });
  }

  handleAssignmentUpdate(id:number){
    const token = this.globalService.getInstructorLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let payload = {
      title : this.title,
      due_date : this.datePipe.transform(this.due_date, 'yyyy-MM-dd'),
      description  :this.text
    }
    this.http.patch(`${environment.API_URL}/api/assignment/${id}`,payload,{headers}).subscribe((res:any)=>{
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: res.message });
      this.getAllAssignemnts()
        this.isEdit = true
    })

     
    
    
    
  }



}

