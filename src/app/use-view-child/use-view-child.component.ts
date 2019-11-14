import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  ViewContainerRef,
  ViewChildren,
  QueryList
} from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-use-view-child',
  templateUrl: './use-view-child.component.html',
  styleUrls: ['./use-view-child.component.less']
})
export class UseViewChildComponent implements OnInit, AfterViewInit {
  @ViewChild('greet', {static: false}) greetP: ElementRef;
  @ViewChild('tpl', {static: false}) tplRef: TemplateRef<any>;
  @ViewChild('tpl', {read: ViewContainerRef, static: false }) tplVcRef: ViewContainerRef;
  @ViewChild(ChildComponent, {static: false}) childCmp: ChildComponent;
  @ViewChildren(ChildComponent) childCmps: QueryList<ChildComponent>;

  constructor() {
    window[`UseViewChildComponent`] = this;
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    console.dir(this.greetP);
    console.log(this.tplRef, this.tplVcRef.element);
    console.dir(this.childCmp);
    console.dir(this.childCmps);
    // this.tplVcRef.createEmbeddedView(this.tplRef);
  }

}
