import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {LoginComponent} from "../../auth/login/login.component";

@Component({
  selector: 'app-top-header',
  standalone: true,
  imports: [],
  templateUrl: './top-header.component.html',
  styleUrl: './top-header.component.scss'
})
export class TopHeaderComponent {

  router = inject(Router);

  onSignUp() {
    this.router.navigate(['/login']);
  }

}
