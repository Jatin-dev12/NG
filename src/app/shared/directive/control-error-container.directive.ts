import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[controlErrorContainer]',
    standalone: true
})
export class ControlErrorContainerDirective {
  //vcr: ViewContainerRef;

  constructor(public vcr: ViewContainerRef) { }

}
