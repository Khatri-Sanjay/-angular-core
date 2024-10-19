import {Component, ViewChild} from '@angular/core';
import {SearchComponent} from "./search/search.component";
import {ProductListComponent} from "./product/product-list.component";
import {ProductViewComponent} from "./product/product-view/product-view.component";
import {FeaturedBrandComponent} from "./featured-brand/featured-brand.component";
import {HeaderComponent} from "../../layouts/header/header.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    SearchComponent,
    ProductListComponent,
    ProductViewComponent,
    FeaturedBrandComponent,
    HeaderComponent
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  searchData: string | undefined;

  @ViewChild(ProductListComponent, {static: false})
  productListComponent: ProductListComponent | undefined;

  onSearchData(value: any) {
    this.searchData = value;
  }

}
