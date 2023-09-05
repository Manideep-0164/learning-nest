import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-instructor-signin',
  templateUrl: './instructor-signin.component.html',
  styleUrls: ['./instructor-signin.component.css'],
  providers: [MessageService]
})
export class InstructorSigninComponent {
  email: string = "";
  password: string = "";

  is_loading : boolean = false;

  constructor(private http: HttpClient, private globalservice: GlobalService, private messageService: MessageService,private router: Router) { }
  ngOnInit(): void {
    console.log({ instructor: this.globalservice.isInstructorLogin });

  }

  showWarning(warn:string,summary: string,detail:string) {
    this.messageService.add({ key: 'tc', severity: warn, summary: summary, detail: detail });
  }
  handleLogin() {
    this.is_loading= true;
    if(this.email == "" || this.password == ""){
      this.is_loading= false
      return this.showWarning('info','All Fields are Required','Please Fill All are Fields')
    }


    let credential = {
      email: this.email,
      password: this.password
    }

    console.log(credential);

    this.http.post(`${environment.API_URL}/api/instructor/signin`, credential).subscribe((res: any) => {

      if (res?.message === "Login Success") {
        this.is_loading= false
        this.globalservice.isInstructorLoginSuccess();
        this.globalservice.setInstructorLoginDetails(res);
        // this.globalservice.setStudentLoginDetails(res);


        const redirectUrl = this.globalservice.redirectUrl || '/instructor';
        this.router.navigate([redirectUrl]);

        // Clear the redirectUrl in the GlobalService
        this.globalservice.redirectUrl = undefined;


      } else {
        this.is_loading= false
        this.showWarning('warn','Check Email/Password',res.message);
      }


      console.log(res);

    })

  }
}
