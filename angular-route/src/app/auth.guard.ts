import {inject} from "@angular/core";
import {AuthService} from "./Services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {CourseService} from "./Services/course.service";

export const CanActivate = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.IsAuthenticate()) {
        return true;
    } else {
        router.navigate(['/Login']);
        return false;
    }
}

export const CanActivateChild = () => {
    return CanActivate();
}

export interface CanComponentDeactivate {
    canExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const CanDeactivateGuard = (component: CanComponentDeactivate) => {
    return component.canExit ? component.canExit() : true;
};

export const resolve = () => {
    const courseService = inject(CourseService);
    return courseService.getAllCourses();
}
