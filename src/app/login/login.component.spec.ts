import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({selector: 'app-city3', template: ''})
class City3Component {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const routerSpy = createRouterSpy();
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, City3Component ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        FormBuilder,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function createRouterSpy() {
  return jasmine.createSpyObj('Router', ['navigate']);
}

function createFormBuilderSpy() {
  return jasmine.createSpyObj('FormBuilder', ['group']);
}
