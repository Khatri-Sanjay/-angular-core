import {Component, inject, OnInit} from '@angular/core';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/Services/course.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit{
  courseService = inject(CourseService)
  popularCourses: Course[] = [];

  router: Router = inject(Router);
  activateRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(){
    this.popularCourses = this.courseService.courses.filter(c => c.rating >= 4.5);
  }

  onNavigate() {
    // this.router.navigate(['Courses']); // this route is absolute route
    // this.router.navigate(['Courses'], {relativeTo: this.activateRoute}); // this is relative route
    this.router.navigateByUrl('Courses');
  }
}
