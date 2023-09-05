import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAssignmentComponent } from './single-assignment.component';

describe('SingleAssignmentComponent', () => {
  let component: SingleAssignmentComponent;
  let fixture: ComponentFixture<SingleAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleAssignmentComponent]
    });
    fixture = TestBed.createComponent(SingleAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
