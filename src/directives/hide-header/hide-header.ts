import { Directive,Input,ElementRef,Renderer, OnInit } from '@angular/core';

/**
 * Generated class for the HideHeaderDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[hide-header]',
  host:{
    '(ionScroll)':'onContentScroll($event)'
  } // Attribute selector
})
export class HideHeaderDirective {
  headerHeight:any;
  scrollContent:any;

  @Input("header") header:HTMLElement
  constructor(public element:ElementRef,public renderer:Renderer) {
    console.log('Hello HideHeaderDirective Directive');
  }

  ngOnInit(): void {
    this.headerHeight = this.header.clientHeight;
    this.renderer.setElementStyle(this.header,"webkitTransition","top 700ms");
    this.scrollContent=this.element.nativeElement.getElementsByClassName("scroll-content")[0];
    this.renderer.setElementStyle(this.header,"webkitTransition","margin-top 700ms");
  }
  onContentScroll(event){
    if(event.scrollTop>56){
      this.renderer.setElementStyle(this.header,"top","-56px");
      this.renderer.setElementStyle(this.scrollContent,"margin-top","0px")

    }else{
      this.renderer.setElementStyle(this.header,"top","0px");
      this.renderer.setElementStyle(this.scrollContent,"margin-top","56px")
    }

  }
}
