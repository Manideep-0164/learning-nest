import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAnnouncementComponent } from './single-announcement.component';

describe('SingleAnnouncementComponent', () => {
  let component: SingleAnnouncementComponent;
  let fixture: ComponentFixture<SingleAnnouncementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleAnnouncementComponent]
    });
    fixture = TestBed.createComponent(SingleAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
