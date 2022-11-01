import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventsCardComponent } from './my-events-card.component';

describe('MyEventsCardComponent', () => {
  let component: MyEventsCardComponent;
  let fixture: ComponentFixture<MyEventsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEventsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEventsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
