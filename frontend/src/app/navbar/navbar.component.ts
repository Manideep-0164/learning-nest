import { Component,OnInit,ChangeDetectorRef  } from '@angular/core';
import { GlobalService } from '../global.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    
  isLogin: boolean = false;
  items : any;
  constructor(public globalService: GlobalService,private cd: ChangeDetectorRef,private route: ActivatedRoute,private router : Router) {}

  ngOnInit(): void {
    this.isLogin = this.globalService.isStudentLogin;

    this.items = [
      {
        label: this.globalService.getStudentLoginDetails()?.name,
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
                  this.globalService.logout()
                  this.router.navigate(['/'])
                }
                
            }
        ]
    },
    ]

     this.globalService.loginStatus$.subscribe(()=>{
       this.items = [
         {
           label: this.globalService.getStudentLoginDetails()?.name,
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
                    this.globalService.logout()
                    this.router.navigate(['/'])
                  }
                   
               }
           ]
       },
       ]

     })
    
  }

  getFirstLetter(): string {
    const name = this.globalService.getStudentLoginDetails()?.name || '';
    return name.charAt(0).toUpperCase();
  }

}
