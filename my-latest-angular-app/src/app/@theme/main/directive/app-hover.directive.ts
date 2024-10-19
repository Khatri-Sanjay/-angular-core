import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAppHover]',
  standalone: true
})
export class AppHoverDirective {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostBinding('style.backgroundColor')
  backGroundColor: string = 'white';

  @HostBinding('style.border')
  border: string = 'black 2px solid';

  @HostBinding('style.color')
  textColor: string = 'grey';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.backGroundColor = 'black';
    this.border = 'white';
    this.textColor = 'white';
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.backGroundColor = 'white';
    this.border = 'black 2px solid';
    this.textColor = 'grey';
  }


}
