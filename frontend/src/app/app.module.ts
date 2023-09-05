import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { InputTextModule } from 'primeng/inputtext';
import { FooterComponent } from './footer/footer.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { CarouselModule } from 'primeng/carousel';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MycoursesComponent } from './mycourses/mycourses.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { SingleAssignmentComponent } from './single-assignment/single-assignment.component';
import { InstructorSignupComponent } from './instructor-signup/instructor-signup.component';
import { InstructorSigninComponent } from './instructor-signin/instructor-signin.component';
import { InstructorAssignmentsComponent } from './instructor-assignments/instructor-assignments.component';
import { TabViewModule } from 'primeng/tabview';
import { EditorModule } from 'primeng/editor';
import { DatePipe } from '@angular/common'; 
import {HttpClientModule} from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenubarModule } from 'primeng/menubar';
import { MessageService } from 'primeng/api';
import { InstructorNavbarComponent } from './instructor-navbar/instructor-navbar.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { SkeletonModule } from 'primeng/skeleton';
import { LayoutComponent } from './layout/layout.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InstructorsingleassignComponent } from './instructorsingleassign/instructorsingleassign.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    NavbarComponent,
    FooterComponent,
    AllCoursesComponent,
    AssignmentsComponent,
    MycoursesComponent,
    SingleAssignmentComponent,
    InstructorSignupComponent,
    InstructorSigninComponent,
    InstructorAssignmentsComponent,
    InstructorNavbarComponent,
    InstructorDashboardComponent,
    LayoutComponent,
    InstructorsingleassignComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    InputTextModule,
    CarouselModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    TabViewModule,
    EditorModule,
    HttpClientModule,
    ToastModule,
    AvatarModule,
    AvatarGroupModule,
    MenubarModule,
    SkeletonModule,
    ProgressSpinnerModule,
    ConfirmDialogModule
  ],
  providers: [DatePipe,MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
