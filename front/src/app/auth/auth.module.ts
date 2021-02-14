import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { UnauthenticatedComponent } from './unauthenticated/unauthenticated.component';


@NgModule({
  declarations: [LoginComponent, UnauthenticatedComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
