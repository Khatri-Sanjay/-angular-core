import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgClass, NgForOf} from "@angular/common";
import {Product} from "../../../../../../@core/models/product";
import {HighlightDirective} from "../../../../directive/highlight.directive";
import {DisableProductDirective} from "../../../../directive/disable-product.directive";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    NgClass,
    HighlightDirective,
    DisableProductDirective
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input()
  product: Product | any;

  constructor() {
  }

  addToWishlist(data: any) {

  }

  addToCart(data: any) {

  }

}
