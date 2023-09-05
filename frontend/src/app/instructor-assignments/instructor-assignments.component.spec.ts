import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAssignmentsComponent } from './instructor-assignments.component';

describe('InstructorAssignmentsComponent', () => {
  let component: InstructorAssignmentsComponent;
  let fixture: ComponentFixture<InstructorAssignmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorAssignmentsComponent]
    });
    fixture = TestBed.createComponent(InstructorAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
