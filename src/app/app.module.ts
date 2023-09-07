import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { CoursesComponent } from './courses/courses.component';
import { SectionsComponent } from './sections/sections.component';
import { HttpClientModule } from '@angular/common/http';
import { SchedulesComponent } from './schedules/schedules.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'sections', component: SectionsComponent }, 
  {path: 'schedules', component: SchedulesComponent}
  // { path: '**', component: ErrorPageComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CoursesComponent,
    SectionsComponent,
    SchedulesComponent,
    HomeComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
