import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";
import {CreateTaskComponent} from "./create-task/create-task.component";
import {TaskDetailsComponent} from "./task-details/task-details.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared.module";
import { OverviewComponent } from './overview/overview.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import { StatsComponent } from './stats/stats.component';
import {DashboardRouteModule} from "./dashboard-route.module";

@NgModule({
    declarations: [
        DashboardComponent,
        CreateTaskComponent,
        TaskDetailsComponent,
        OverviewComponent,
        StatsComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    exports: [
        SharedModule,
        DashboardRouteModule
    ],
    providers: []
})
export class DashboardModule {

}
