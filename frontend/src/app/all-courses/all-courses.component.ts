import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { AllDepartment, MyCourses } from '../Allmodels.model';
import { GlobalService } from '../global.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { StudentService } from '../student.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  responsiveOptions: any[] | undefined;
  departments : any = []
  courses : any = []
  is_loading : boolean = true;
  constructor(private http: HttpClient,private globalServices : GlobalService,private datePipe: DatePipe,private studenCourses : StudentService,private messageService: MessageService) {}

  array = new Array(2).fill(0)

  ngOnInit(): void {
    this.http.get(`https://seqli.vercel.app/api/department/courses`).subscribe((res)=>{
      this.departments = res
      this.is_loading=false;
      console.log(res);
      
    })


     this.studenCourses.getEnrolledCourses().subscribe((res:any)=>{

        if(res?.message == "You did not enrolled any courses, Please enroll!"){
          return  this.courses = []
        }

        console.log(res); 
        return this.courses = res;
        
     })
      


    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  showEnrolledInfo() {
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Course Already Enrolled', detail: 'Please Select Another Course' });
  }
  LogginToEnrolle() {
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Please Login', detail: 'To Enroll Courses' });
  }

  showEnrolledSuccess() {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Course Enrolled', detail: 'Course Enrolled Succesfull' });
  }


  enrollCourses(id:number){

    if(!this.globalServices.isStudentLogin){
       this.LogginToEnrolle();
    }


      const existed = this.courses?.find((el : MyCourses)=> el.id == id);

      if(existed){
        return this.showEnrolledInfo()
      }
      


      let enrolledCourse = {
        enroll_date: this.datePipe.transform(new Date, 'yyyy-MM-dd'),
         student_id: this.globalServices.getStudentLoginDetails()?.id,
          course_id : id,

      }
      const token = this.globalServices.getStudentLoginDetails()?.token ?? '';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      });


      
      this.http.post(`${environment.API_URL}/api/enrollment`,enrolledCourse,{headers}).subscribe(()=>{
        this.showEnrolledSuccess()
      })


      console.log(enrolledCourse);
      
  }




}
