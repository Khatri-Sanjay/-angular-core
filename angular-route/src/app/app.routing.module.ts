import {NgModule} from "@angular/core";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {AboutComponent} from "./about/about.component";
import {CoursesComponent} from "./courses/courses.component";
import {CourseDetailComponent} from "./courses/course-detail/course-detail.component";
import {PopularComponent} from "./home/popular/popular.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./login/login.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {AuthGuardService} from "./Services/auth-guard.service";
import {CanActivate, CanActivateChild, CanDeactivateGuard, resolve} from "./auth.guard";


const routes: Routes = [
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: HomeComponent},

    // for angular version 14 or lower than 14
    // {path: 'Contact', component: ContactComponent, canDeactivate: [AuthGuardService]},

    // for angular version 15 or more than 15
    {path: 'Contact', component: ContactComponent, canDeactivate: [CanDeactivateGuard]},

    {path: 'About', component: AboutComponent},

    // for angular version 14 or lower than 14
    // {path: 'Courses', component: CoursesComponent, resolve: {courses: AuthGuardService}},

    // for angular version 15 or more than 15
    {path: 'Courses', component: CoursesComponent, resolve: {courses: resolve}},

    {
        path: 'Courses', canActivateChild: [CanActivateChild], children: [
            {path: 'Course/:id', component: CourseDetailComponent},
            {path: 'Popular', component: PopularComponent},

            // for angular 14 or lower version
            // {path: 'Checkout', component: CheckoutComponent, canActivate: [AuthGuardService]},

            // for angular version 15 or more than 15
            {path: 'Checkout', component: CheckoutComponent, canActivate: [CanActivate], data: {name: 'sanjay'}},
        ]
    },
    {path: 'Login', component: LoginComponent},
    {path: '**', component: NotFoundComponent},
];
@NgModule({
    imports: [
        RouterOutlet,
        RouterModule.forRoot(routes, {enableTracing: true})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
