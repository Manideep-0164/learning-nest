import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlobalService } from '../global.service';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { TabView } from 'primeng/tabview';
import { AIService } from '../ai.service';

@Component({
  selector: 'app-instructor-assignments',
  templateUrl: './instructor-assignments.component.html',
  styleUrls: ['./instructor-assignments.component.css'],
  providers: [MessageService]
})
export class InstructorAssignmentsComponent implements OnInit {
  @ViewChild('tabView') tabView: TabView | undefined;
  apikey: string ="";
  assignments: any = [];
  date: Date | undefined;
  text: string = "<h1>Description here...</h1>";
  name: string | undefined;
  due_date: string | undefined;
  loading: boolean = false;
  course: string = "";
  concept: string = "";
  Levelvalue: string = "";
  loadergenrating : boolean = false;
  empty : boolean = false

  levels: any[] = [
    { name: 'Easy', value: 'Easy' },
    { name: 'Medium', value: 'Medium' },
    { name: 'Hard', value: 'Hard' }
  ];


  constructor(private globalService: GlobalService, private datePipe: DatePipe, private http: HttpClient, private messageService: MessageService, private router: Router, private route: ActivatedRoute, private aiService: AIService) { }


  ngOnInit(): void {

    this.getAllAssigment();
    let payload = {
      course: this.course,
      concept: this.concept,
      level: this.Levelvalue
    }
    const token = this.globalService.getInstructorLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    

    this.http.post(`${environment.API_URL}/api/ai/assignment`,payload,{headers}).subscribe((res:any)=>{
      
      this.apikey = res.key
      
    })


  }


  getAllAssigment() {
    const token = this.globalService.getInstructorLoginDetails()?.token ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.get(`${environment.API_URL}/api/assignment/course/${this.globalService.getInstructorLoginDetails()?.course_id}`, { headers }).subscribe((res:any) => {

      if(res?.message == "No assignments available"){
        this.empty = true
      }

      this.assignments = res;
      console.log(res);

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
      course_id: this.globalService.getInstructorLoginDetails()?.course_id
    }

    this.http.post(`${environment.API_URL}/api/assignment`, newAsssignment, { headers }).subscribe((res) => {
      this.loading = false;
      this.messageService.add({ key: 'tc', severity: 'success', summary: 'Assignment', detail: 'Assignment Added' });
      this.getAllAssigment();
      if (this.tabView) {
        console.log(this.tabView);

        this.tabView.activeIndex = 0;
      }
    })
  }

  async generateAssignment() {
    this.loadergenrating = true;
   
    let prompt = `
        Course: ${this.course}
        Concept: ${this.concept}
        Level: ${this.Levelvalue}

         the provided course, concept, and difficulty level, evaluate whether the concept is relevant to mentioned course. If the concept aligns with mentioned course, create an assignment following the format below. If the concept is unrelated to mentioned course, provide a brief one-line explanation stating that it is not suitable for assignment creation.

        **Format
        genrate content in html format like headings content

        Create assignment within  HTML tags format and use space for br tag if you want to highlight it
        in HTML format 

        example:
       { <h1 class="ql-align-center"><strong style="color: var(--tw-prose-bold);"> Building a Simple Counter App</strong></h1><p class="ql-align-center"><br></p><p><strong style="color: var(--tw-prose-bold);">Objective</strong><span style="color: var(--tw-prose-bold);">:</span> In this assignment, you will create a simple counter application using React and the <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">useState</code> hook.</p><p><br></p><p><strong style="color: var(--tw-prose-bold);">Requirements</strong><span style="color: var(--tw-prose-bold);">:</span></p><ol><li>Create a new React application using Create React App or your preferred setup.</li><li>Create a functional component called <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">Counter</code>.</li><li>Inside the <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">Counter</code> component, use the <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">useState</code> hook to manage a <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">count</code> state variable with an initial value of 0.</li><li>Display the current count on the screen.</li><li>Add two buttons labeled "Increment" and "Decrement" below the count display.</li><li>Implement the following functionality:</li></ol><ul><li class="ql-indent-1">Clicking the "Increment" button should increase the count by 1.</li><li class="ql-indent-1">Clicking the "Decrement" button should decrease the count by 1, but the count should never go below 0.</li></ul><ol><li>Style the counter and buttons to make the application visually appealing.</li><li>Bonus (optional): Add a "Reset" button that sets the count back to 0 when clicked.</li></ol><p><strong style="color: var(--tw-prose-bold);">Hints</strong><span style="color: var(--tw-prose-bold);">:</span></p><ul><li>You can use the <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">useState</code> hook as follows:</li></ul><pre class="ql-syntax" spellcheck="false">const [count, setCount] = useState(0); 
        </pre><ul><li>Use event handlers to handle button clicks and update the state accordingly.</li><li><br></li></ul><p><strong style="color: var(--tw-prose-bold);">Submission</strong><span style="color: var(--tw-prose-bold);">:</span></p><p>Submit your assignment as a GitHub repository or as a code archive file. Include all the necessary files and instructions for running the application.</p><p><br></p><p><strong style="color: var(--tw-prose-bold);">Evaluation Criteria</strong><span style="color: var(--tw-prose-bold);">:</span></p><p>Your assignment will be evaluated based on the following criteria:</p><ul><li>Proper usage of the <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">useState</code> hook.</li><li>Correct functionality of the counter (increment, decrement, and reset).</li><li>Clear and organized code.</li><li>Visual design and styling of the counter application.</li><li>Bonus points for implementing additional features or improvements.</li></ul><p><br></p><p>This assignment will help your students practice using the <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">useState</code> hook, which is a fundamental concept in React for managing state in functional components.</p>}
          
         **note: genreate content relate to the topic not above example and dont genertate in normal format,jsut return the html format nohting else `;
    
      // if(response == "Yes"){
      //   let res = await this.aiService.makeOpenAIRequest(prompt);
      //   this.loadergenrating = false;
      //   this.text= res;
    //   console.log(res);

    // }else{
    //   this.loadergenrating = false;
    //  this.messageService.add({ key: 'tc', severity: 'info', summary: 'Failed to Genrate', detail: 'Course and Concept are Matched' });
    // }

   
    // const token = this.globalService.getInstructorLoginDetails()?.token ?? '';
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': token
    // });
    
    
   let response = await this.aiService.makeOpenAIRequest(this.apikey,prompt);
   console.log(response);
   this.text = response
   
    

    this.loadergenrating = false
  }

}
