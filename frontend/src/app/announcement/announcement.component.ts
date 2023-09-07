import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  announcements : any | undefined;
  noAnnouncements : boolean = false;

  constructor (private http : HttpClient,private globalservice : GlobalService){}

  ngOnInit(): void {
    this.getAnnouncements()
    
  }

  getAnnouncements(){

    const token = this.globalservice.getStudentLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    this.http.get(`${environment.API_URL}/api/announcement/student/${this.globalservice.getStudentLoginDetails()?.id}`,{headers}).subscribe((res:any)=>{
      console.log(res);
      
     return  this.announcements = res;
    },
    (err)=>{
       this.noAnnouncements= true
      console.log(err);
      
    })
  }


  
}
