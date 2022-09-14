import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSubscribeComponent } from './modal-subscribe.component';

describe('ModalSubscribeComponent', () => {
  let component: ModalSubscribeComponent;
  let fixture: ComponentFixture<ModalSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSubscribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
