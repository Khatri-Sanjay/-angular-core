import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../Models/course";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  course: any;

  ngOnInit() {
    // this.activeRoute.data.subscribe((data: any) => {
    //   this.course = data;
    // });

    // this.course = this.router?.getCurrentNavigation()?.extras?.state;
    this.course = history.state;
  }

}
