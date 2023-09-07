import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-instructor-announcement',
  templateUrl: './instructor-announcement.component.html',
  styleUrls: ['./instructor-announcement.component.css']
})
export class InstructorAnnouncementComponent implements OnInit {

  title: string = "";
  description: string = "";
  allAnnouncements : any = [];
  empty : boolean = false;


  constructor(private http: HttpClient, private globalservice: GlobalService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllAnnoucements();
  }

  getAllAnnoucements(){
    const token = this.globalservice.getInstructorLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    this.http.get(`${environment.API_URL}/api/announcement/course/${this.globalservice.getInstructorLoginDetails()?.course_id}`, { headers }).subscribe((data:any) => {
      
      if(data.message == 'No announcements found.'){
         return this.empty=true
      }


     return this.allAnnouncements = data
    });
  }

  sendAnnouncement() {
    let newAnnoucement = {
      title: this.title,
      description: this.description,
      course_id: this.globalservice.getInstructorLoginDetails()?.course_id,
      publish_date: this.datePipe.transform(new Date, 'yyyy-MM-dd'),
    }


    const token = this.globalservice.getInstructorLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.post(`${environment.API_URL}/api/announcement`, newAnnoucement, { headers }).subscribe(
      (res)=>{
        this.getAllAnnoucements();
      },
      (err)=>{
        console.log(err);
        
      }
    )

  }


}
