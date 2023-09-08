import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  data: any;
  sections: any;
  courseId: any;
  courseName: any;
  pagedCourses: any[] = [];
  pageSize = 10;
  pageIndex: number = 1

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id'] && params['name']) {
        this.courseId = JSON.parse(params['id']);
        this.courseName = params['name'];
        console.log(this.courseName, this.courseId);
        const id = this.courseId
        this.getData(this.pageIndex);
      }
    });
  }
  getData(pageIndex: any) {

    const apiUrl = `https://gadwelooh.ddns.net:3030/sections?pageNo=${this.pageIndex}&limit=${this.pageSize}&q=${this.courseId}`;
    this.dataService.getApiData(apiUrl).subscribe((data) => {

      this.data = data;
      console.log(this.data)
      this.sections = data.results;
    });
  }
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.getData(this.pageIndex)
  }
}
