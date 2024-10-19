import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Course} from '../Models/course';
import {CourseService} from '../Services/course.service';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
    coursesService = inject(CourseService);
    AllCourses: Course[]

    searchString: string;

    activeRoute: ActivatedRoute = inject(ActivatedRoute);

    paramObs;

    ngOnInit() {
        // this.searchString = this.activeRoute.snapshot.queryParams['search'];
        // this.searchString = this.activeRoute.snapshot.queryParamMap.get('search');

        this.paramObs = this.activeRoute.queryParamMap.subscribe(value => {
            this.searchString = value.get('search');
            console.log('this.searchString', this.searchString);
            if (this.searchString === undefined || this.searchString === '' || this.searchString === null) {
                // this.coursesService.getAllCourses().subscribe((res: Course[]) => {
                //     this.AllCourses = res;
                // });

                this.AllCourses = this.activeRoute.snapshot.data['courses'];
            } else {
                this.AllCourses = this.coursesService.courses.filter(course => course.title.toLowerCase().includes(this.searchString.toLowerCase()))
            }
        });

    }

    ngOnDestroy() {
        this.paramObs.unsubscribe();
    }
}
