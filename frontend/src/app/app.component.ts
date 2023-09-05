import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  isStudent: boolean = false;
  isInstructor: boolean = false;

  constructor(private router: Router,private route: ActivatedRoute) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
       this.updateNavbar(event.url)
      }
    });

      
  }
  ngOnInit(): void {
   
   
    
  }

  updateNavbar(url: string) {
    // Check the current route segment to determine which navbar to display
  
      if (url.split("/")[1] === 'instructor') {
        // Display the instructor navbar
        this.isStudent = false;
        this.isInstructor = true;
      } else {
        // Display the student navbar for other routes
        this.isStudent = true;
        this.isInstructor = false;
      }
   console.log(url.split("/")[1]);
   
    
    // console.log(this.isStudent,'studen');
    // console.log(this.isInstructor,'instruct');
    
  }
}