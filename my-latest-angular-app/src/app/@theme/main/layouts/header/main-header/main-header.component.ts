import { Component } from '@angular/core';
import {TopHeaderComponent} from "../top-header/top-header.component";
import {NgClass} from "@angular/common";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [
    TopHeaderComponent,
    NgClass,
    FaIconComponent
  ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
  faSearch = faSearch;
}
