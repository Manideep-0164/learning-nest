import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsingleassignComponent } from './instructorsingleassign.component';

describe('InstructorsingleassignComponent', () => {
  let component: InstructorsingleassignComponent;
  let fixture: ComponentFixture<InstructorsingleassignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorsingleassignComponent]
    });
    fixture = TestBed.createComponent(InstructorsingleassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
