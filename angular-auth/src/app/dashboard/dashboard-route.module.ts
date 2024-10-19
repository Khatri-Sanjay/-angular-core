import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {canActivate} from "../route-guards/auth-guard";
import {OverviewComponent} from "./overview/overview.component";
import {StatsComponent} from "./stats/stats.component";

const routes: Routes = [
    {
        path: '', canActivate: [canActivate], children: [
            {path: 'overview', component: OverviewComponent},
            {path: 'stats', component: StatsComponent},
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class DashboardRouteModule {}
