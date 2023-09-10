import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  addedCourses: any[] = [];
  schedules: any;
  courseDetails: any;
  pagedCourses: any[] = [];
  pageSize = 10;
  pageIndex: number = 1
  data: any;
  constructor(private http: HttpClient, private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params:any) => {
      if (params['addedCourses']) {

        this.addedCourses = JSON.parse(params['addedCourses']);

        console.log(this.addedCourses);
        this.getData(this.pageIndex)

      }
    });

  }
  getData(pageIndex: any) {

    const url = `https://gadwelooh.ddns.net:3030/schedules?pageNo=${pageIndex}&limit=${this.pageSize}`;


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });


    const body = {
      needed_courses: this.addedCourses,
    };


    this.http.post(url, body, { headers }).subscribe((data) => {
      this.data = data
      this.schedules = (data as any).results;
      console.log(this.schedules);
    });
  }
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.getData(this.pageIndex)
  }

}
