import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidComponent } from './guid.component';
import { Component } from '@angular/core';

@Component({selector: 'app-login', template: ''})
class LoginComponent {}

describe('GuidComponent', () => {
  let component: GuidComponent;
  let fixture: ComponentFixture<GuidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidComponent, LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
