import { Component,ChangeDetectorRef,OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-navbar',
  templateUrl: './instructor-navbar.component.html',
  styleUrls: ['./instructor-navbar.component.css']
})
export class InstructorNavbarComponent implements OnInit{

  items : any ;
  constructor(public globalService: GlobalService,private cd: ChangeDetectorRef,private router: Router) {}


  ngOnInit(): void {
    this.items = [
      {
        label: this.globalService.getInstructorLoginDetails()?.name,
        icon: '',
        items: [
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user-edit'
            },
            {
                label: 'Assignments',
                icon: 'pi pi-fw pi-book'
            },
            {
                label: 'Annoucements',
                icon: 'pi pi-fw pi-bell'
            },
            {
                label: 'Sign Out',
                icon: 'pi pi-fw pi-sign-out',
                command : ()=>{
                  this.globalService.instructorlogout()
                  this.router.navigate(['/instructor'])
                }
                
            }
        ]
    },
    ]
  
     this.globalService.loginStatus$.subscribe(()=>{
       this.items = [
         {
           label: this.globalService.getInstructorLoginDetails()?.name,
           icon: '',
           items: [
               {
                   label: 'Profile',
                   icon: 'pi pi-fw pi-user-edit'
               },
               {
                   label: 'Assignments',
                   icon: 'pi pi-fw pi-book'
               },
               {
                   label: 'Annoucements',
                   icon: 'pi pi-fw pi-bell'
               },
               {
                   label: 'Sign Out',
                   icon: 'pi pi-fw pi-sign-out',
                   command : ()=>{
                    this.globalService.instructorlogout()
                    this.router.navigate(['/instructor'])
                  }
                   
               }
           ]
       },
       ]
  
     })
    
  }

  getFirstLetter(): string {
    const name = this.globalService.getInstructorLoginDetails()?.name || '';
    return name.charAt(0).toUpperCase();
  }

}
