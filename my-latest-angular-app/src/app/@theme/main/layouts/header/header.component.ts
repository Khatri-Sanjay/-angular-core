import { Component } from '@angular/core';
import {TopHeaderComponent} from "./top-header/top-header.component";
import {MainHeaderComponent} from "./main-header/main-header.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TopHeaderComponent,
    MainHeaderComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
