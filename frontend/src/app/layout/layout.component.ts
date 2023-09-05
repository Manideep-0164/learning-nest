import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isStudent: boolean = false;
  isInstructor: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Check the current route segment to determine which navbar to display
    this.route.url.subscribe(segments => {
      if (segments.some(segment => segment.path === 'instructor')) {
        // Display the instructor navbar
        this.isStudent = false;
        this.isInstructor = true;
      } else {
        // Display the student navbar for other routes
        this.isStudent = true;
        this.isInstructor = false;
      }
    });
  }
}
