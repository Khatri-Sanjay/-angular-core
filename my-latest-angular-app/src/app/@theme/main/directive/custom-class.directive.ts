import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appCustomClass]',
  standalone: true
})
export class CustomClassDirective {

  // custom class directive

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  @Input() set disable(value: Object) {
    let entries = Object.entries(value);
    console.log(entries);
    for(let item of entries) {

      //array destruction
      const [className, condition] = item;
      this.renderer.addClass(this.element.nativeElement, className);
    }
  }

}
