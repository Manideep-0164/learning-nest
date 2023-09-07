import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-announcement',
  templateUrl: './single-announcement.component.html',
  styleUrls: ['./single-announcement.component.css']
})
export class SingleAnnouncementComponent implements OnInit {
  announcement:any = ''

  constructor(private http : HttpClient,private globalService:GlobalService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const token = this.globalService.getStudentLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    const announcementId = this.route.snapshot.params['id'];

    this.http.get(`${environment.API_URL}/api/announcement/${announcementId}`,{headers}).subscribe(
      (res)=>{
        console.log(res);
        this.announcement = res;
        
      },
      (err)=>{
        console.log(err);
        
      }
    )

  }

}
