import {NgModule} from "@angular/core";
import {LoaderComponent} from "./utility/loader/loader.component";
import {SnackbarComponent} from "./utility/snackbar/snackbar.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        LoaderComponent,
        SnackbarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        LoaderComponent, FormsModule, SnackbarComponent
    ]
})
export class SharedModule {}
