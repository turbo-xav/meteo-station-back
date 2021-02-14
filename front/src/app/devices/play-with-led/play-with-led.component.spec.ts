import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayWithLedComponent } from './play-with-led.component';

describe('PlayWithLedComponent', () => {
  let component: PlayWithLedComponent;
  let fixture: ComponentFixture<PlayWithLedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayWithLedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayWithLedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
