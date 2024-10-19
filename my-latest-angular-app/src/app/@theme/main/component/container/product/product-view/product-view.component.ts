import {Component, Input} from '@angular/core';
import {Product} from "../../../../../../@core/models/product";
import {CurrencyPipe, NgFor, NgForOf, NgStyle} from "@angular/common";
import {ProductListComponent} from "../product-list.component";
import {AppHoverDirective} from "../../../../directive/app-hover.directive";
import {SetBackgroundDirective} from "../../../../directive/set-background.directive";

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgStyle,
    NgFor,
    SetBackgroundDirective,
    AppHoverDirective
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent {

  @Input()
  selectedProductData: ProductListComponent | undefined;

  product: Product | undefined;

  ngOnInit() {
    this.product = this.selectedProductData?.selectedProductData;
  }

  onClose() {}

}
