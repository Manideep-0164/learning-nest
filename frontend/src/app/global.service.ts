import { Injectable } from '@angular/core';
import { InstructorLogin, StudentLogin } from './Allmodels.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {
    // Initialize is_StudentLogin from local storage or set it to false if not found
    this.is_StudentLogin = localStorage.getItem('is_StudentLogin') === 'true' || false;
    const storedStudentLoginDetails = localStorage.getItem('studentLoginDetails');
    this.studentLoginDetails = storedStudentLoginDetails ? JSON.parse(storedStudentLoginDetails) : null;


    this.is_InstructorLogin = localStorage.getItem('isInstructorLogin') === 'true' || false;
    const storedInstructorLoginDetails = localStorage.getItem('instructorLoginDetails');
    this.instructorLoginDetails = storedInstructorLoginDetails ? JSON.parse(storedInstructorLoginDetails) : null;
  }
  private studentLoginDetails : StudentLogin | null;
  private is_StudentLogin: boolean = false;

  private instructorLoginDetails : InstructorLogin | null;
  public is_InstructorLogin : boolean = false;

  public redirectUrl: string | undefined; 
  private loginStatusSubject = new Subject<void>();

  loginStatus$ = this.loginStatusSubject.asObservable();
  get isStudentLogin(): boolean {
    return this.is_StudentLogin;
  }

  set isStudentLogin(value: boolean) {
    this.is_StudentLogin = value;
    // Update local storage when the property is set
    localStorage.setItem('is_StudentLogin', value.toString());
  }

  


  isStudentLoginSuccess() {
    // Set the property to true and update local storage
    this.isStudentLogin = true;
    this.loginStatusSubject.next();
  }


  getStudentLoginDetails(): StudentLogin | null {
    return this.studentLoginDetails;
  }

  setStudentLoginDetails(details: StudentLogin | null) {
    this.studentLoginDetails = details;
    // Convert the object to a JSON string and update local storage
    localStorage.setItem('studentLoginDetails', JSON.stringify(details));
    this.loginStatusSubject.next();
  }


  logout() {
    // Clear the local storage for is_StudentLogin and studentLoginDetails
    localStorage.removeItem('is_StudentLogin');
    localStorage.removeItem('studentLoginDetails');

    // Set is_StudentLogin to false
    this.isStudentLogin = false;

    // Clear the studentLoginDetails object
    this.setStudentLoginDetails(null);
    this.loginStatusSubject.next();
  }

  get isInstructorLogin(): boolean {
    return this.is_InstructorLogin;
  }

  set isInstructorLogin(value: boolean) {
    this.is_InstructorLogin = value;
    // Update local storage when the property is set
    localStorage.setItem('isInstructorLogin', value.toString());
  }


  getInstructorLoginDetails():InstructorLogin | null{
    return this.instructorLoginDetails;
  }

  setInstructorLoginDetails(detail: InstructorLogin | null) {
    this.instructorLoginDetails= detail ;
    localStorage.setItem('instructorLoginDetails',JSON.stringify(detail));
    this.loginStatusSubject.next()
  }

  isInstructorLoginSuccess() {
    // Set the property to true and update local storage
    this.isInstructorLogin = true;
    this.loginStatusSubject.next();
  }

  instructorlogout() {
    // Clear the local storage for is_StudentLogin and studentLoginDetails
    localStorage.removeItem('isInstructorLogin');
    localStorage.removeItem('instructorLoginDetails');

    // Set is_StudentLogin to false
    this.isInstructorLogin = false;

    // Clear the studentLoginDetails object
    this.setInstructorLoginDetails(null);
    this.loginStatusSubject.next();
  }

}
