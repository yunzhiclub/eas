import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module';
import {HttpClientModule} from '@angular/common/http';
import {ApiDemoModule} from '../api/api.demo.module';
import {DashboardModule} from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    DashboardModule,
    BrowserModule,
    HttpClientModule,
    // Demo环境使用ApiDemoModule
    ApiDemoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
