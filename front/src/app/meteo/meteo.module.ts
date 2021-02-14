import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeteoRoutingModule } from './meteo-routing.module';
import { StationComponent } from './station/station.component';
import { ForecastsComponent } from './forecasts/forecasts.component';
import { StatsComponent } from './stats/stats.component';
import { SharedModule } from '../generic/shared/shared.module';
import { CoreModule } from '../generic/core/core.module';
import { ForecastsCardComponent } from './forecasts/forecasts-card/forecasts-card.component';


@NgModule({
  declarations: [StationComponent, ForecastsComponent, StatsComponent, ForecastsCardComponent],
  imports: [
    CommonModule,
    MeteoRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class MeteoModule { }
