import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalorieComponent } from './calorie/calorie.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from './toast/toast.module';
import { LoginComponent } from './login/login.component';
import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    CalorieComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
