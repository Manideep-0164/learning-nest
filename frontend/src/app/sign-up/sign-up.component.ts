import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Student } from '../Allmodels.model';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
interface Major {
  name: string;
  value: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [MessageService]
})


export class SignUpComponent implements OnInit {
  dob: string = "";
  name: string = "";
  major: Major[] | undefined;
  selectedMajor: Major | undefined;
  email: string = "";
  contact_number: string = "";
  password: string = "";
  Confirmpassword: string = "";
  gender!: string;

  is_loading: boolean = false;

  constructor(private datePipe: DatePipe, private http: HttpClient, private messageService: MessageService,private router: Router) { }

  genders: any[] = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'Others', value: 'Others' }
  ];



  ngOnInit(): void {
    this.major = [
      { name: 'Computer Science', value: 'Computer Science' },
      { name: 'Engineering', value: 'Engineering' },
      { name: 'Electronics', value: 'Electronics' },
      { name: 'Biotechnology ', value: 'Biotechnology ' },
      { name: 'Environmental Engineering', value: 'Environmental Engineering' },
      { name: 'Fine Arts', value: 'Fine Arts' },
      { name: 'Applied Sciences', value: 'Applied Sciences' },
    ];


    // this.http.post('https://seqli.vercel.app/').subscribe((res)=>{

    // })
  }

  showTopCenter() {
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Password', detail: 'password and confirmed are not same' });
  }

  showTopALL() {
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'All Feilds are Required', detail: 'Please Fill all Fields' });
  }


  handleCreate() {
    this.is_loading = true;
    if (this.name == '' || this.dob == '' || this.email == "" || this.gender == undefined || this.contact_number == "null" || this.password == "" || this.selectedMajor == undefined) {
      this.is_loading = false;
      return this.showTopALL();
    }


    if (this.password !== this.Confirmpassword) {
      this.is_loading = false;
      return this.showTopCenter()
    }

    let newStudent: Student = {
      name: this.name,
      dob: this.datePipe.transform(this.dob, 'yyyy-MM-dd'),
      major: `${this.selectedMajor?.value}`,
      email: this.email,
      contact_number: `${this.contact_number}`,
      password: this.password,
      gender: this.gender,
    }
    console.log(newStudent);

    this.http.post(`${environment.API_URL}/api/student/signup`, newStudent).subscribe((res) => {
      this.is_loading = false;

      console.log(res);
      this.router.navigate(['/sign-in'])
    })

  }


}
