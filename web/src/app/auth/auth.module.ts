import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import { AuthComponent } from './auth.component';
import {YzSubmitButtonModule} from '../../func/yz-submit-button/yz-submit-button.module';
import {AuthRoutingModule} from './auth-routing.module';


@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    YzSubmitButtonModule,
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
  ],
  exports: [
    AuthComponent,
    LoginComponent
  ]
})
export class AuthModule {
}
