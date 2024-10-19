import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDisableProduct]',
  standalone: true
})
export class DisableProductDirective implements OnInit{

  // conditional attribute directive

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  @Input()
  isDisableProduct: boolean = false;

  ngOnInit() {
    this.disableProduct(this.isDisableProduct);
  }

  disableProduct(disable: boolean) {
    console.log(disable);
    console.log('disable');
    if (disable) {
      this.renderer.addClass(this.element.nativeElement, 'disable-out-of-stock-product');
    }
  }

}
