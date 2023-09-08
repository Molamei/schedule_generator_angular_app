import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],

})
export class CoursesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  addedCourses: any[] = [];

  inputValue: string = '';
  value: any;
  courses: any;
  refCourses: any;
  pagedCourses: any[] = [];
  pageSize = 10;
  pageIndex: number = 1
  data: any;
  constructor(private dataService: DataService, private router: Router) { }
  ngOnInit(): void {
    const jsonString = localStorage.getItem('addedCourses') || '[]';
    const retrievedArray = JSON.parse(jsonString);
    this.addedCourses = retrievedArray;
    this.getData(this.pageIndex);
  }
  searchCourses() {
    this.pageIndex = 1;
    const apiUrl = `https://gadwelooh.ddns.net:3030/courses?pageNo=${this.pageIndex}&limit=${this.pageSize}&q=${this.inputValue}`;
    this.dataService.getApiData(apiUrl).subscribe((data) => {
      console.log(data);
      this.courses = data.results;
      this.refCourses = data;
    });
  }
  addCourse(i: any) {
    if (this.courses[i].course_code.trim() !== '' && !this.addedCourses.includes(this.courses[i].course_code)) {
      this.addedCourses.push(this.courses[i].course_code);

    }


    localStorage.setItem('addedCourses', JSON.stringify(this.addedCourses));
  }
  removeCourse(j: any) {
    this.addedCourses.splice(j, 1);
    localStorage.setItem('addedCourses', JSON.stringify(this.addedCourses));

  }
  navigateToSchedules() {

    this.router.navigate(['/schedules'], {
      queryParams: { addedCourses: JSON.stringify(this.addedCourses) }
    });
  }
  navigateToSections(i: any) {

    this.router.navigate(['/sections'], {
      queryParams: { id: JSON.stringify(this.courses[i].course_code), name: JSON.stringify(this.courses[i].course_name) }
    });
  }
  getData(pageIndex: any) {

    const apiUrl = `https://gadwelooh.ddns.net:3030/courses?pageNo=${pageIndex}&limit=${this.pageSize}&q=${this.inputValue}`;
    this.dataService.getApiData(apiUrl).subscribe((data) => {
      console.log(data);
      this.data = data;
      this.courses = data.results;
      this.refCourses = data;
    });
  }
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.getData(this.pageIndex)
  }


}
