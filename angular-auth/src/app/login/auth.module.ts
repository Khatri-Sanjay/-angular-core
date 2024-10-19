import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {SharedModule} from "../shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
    {path: '', component: LoginComponent}
]

@NgModule({
    declarations: [LoginComponent],
    imports: [
        SharedModule,
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    providers: []
})
export class AuthModule {

}
