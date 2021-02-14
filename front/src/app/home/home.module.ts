import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../generic/shared/shared.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
