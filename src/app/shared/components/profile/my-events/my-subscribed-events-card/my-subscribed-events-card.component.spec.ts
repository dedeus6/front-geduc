import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubscribedEventsCardComponent } from './my-subscribed-events-card.component';

describe('MySubscribedEventsCardComponent', () => {
  let component: MySubscribedEventsCardComponent;
  let fixture: ComponentFixture<MySubscribedEventsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySubscribedEventsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySubscribedEventsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
