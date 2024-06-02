import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RouterOutlet } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
