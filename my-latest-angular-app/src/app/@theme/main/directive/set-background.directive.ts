import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";

@Directive({
  standalone: true,
  selector: '[setBackground]'
})
export class SetBackgroundDirective implements OnInit{

  // @Input('setBackground')
  backGroundColor: string = 'black';

  @Input()
  textColor: string = 'white';

  @Input()
  title: string = 'set title here';

  @Input('setBackground')
  changeTextAndBackgroundColor : {
    backGround: string;
    textColor: string;
    title: string;
  } | any;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    // this.element.nativeElement.style.backgroundColor = 'skyblue';
    // this.element.nativeElement.style.color = 'black';
    this.setStaticBackGroundColor();

    this.setDynamicBackground();

    this.anotherWay();

  }

  setStaticBackGroundColor() {
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'red');
    this.renderer.setStyle(this.element.nativeElement, 'color', 'black');
    this.renderer.setAttribute(this.element.nativeElement, 'title', 'This is title');
  }

  setDynamicBackground() {
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', this.backGroundColor);
    this.renderer.setStyle(this.element.nativeElement, 'color', this.textColor);
    this.renderer.setAttribute(this.element.nativeElement, 'title', this.title);
  }

  anotherWay() {
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', this.changeTextAndBackgroundColor?.backGround);
    this.renderer.setStyle(this.element.nativeElement, 'color', this.changeTextAndBackgroundColor?.textColor);
    this.renderer.setAttribute(this.element.nativeElement, 'title', <string>this.changeTextAndBackgroundColor?.title);
  }
}
