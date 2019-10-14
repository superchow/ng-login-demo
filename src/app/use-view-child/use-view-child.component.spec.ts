import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseViewChildComponent } from './use-view-child.component';
import { Component } from '@angular/core';

@Component({selector: 'exe-child', template: ''})
class ChildComponent {}

describe('UseViewChildComponent', () => {
  let component: UseViewChildComponent;
  let fixture: ComponentFixture<UseViewChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseViewChildComponent, ChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseViewChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
