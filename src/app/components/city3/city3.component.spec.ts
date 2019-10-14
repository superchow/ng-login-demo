import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { City3Component } from './city3.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('City3Component', () => {
  let component: City3Component;
  let fixture: ComponentFixture<City3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ City3Component ],
      imports: [BrowserAnimationsModule, CommonModule, FormsModule, ReactiveFormsModule, NgZorroAntdModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(City3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('value can set and get', () => {
    component.value = '130102';
    expect(component.value).toEqual('130102');
  });
});
