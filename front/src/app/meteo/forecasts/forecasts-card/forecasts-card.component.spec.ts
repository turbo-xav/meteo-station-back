import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastsCardComponent } from './forecasts-card.component';

describe('ForecastsCardComponent', () => {
  let component: ForecastsCardComponent;
  let fixture: ComponentFixture<ForecastsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
