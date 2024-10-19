import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.addClass(this.element.nativeElement, 'hover');
  }

  @HostListener('mouseout')
  onMouseExit() {
    this.renderer.removeClass(this.element.nativeElement, 'hover');
  }

}
