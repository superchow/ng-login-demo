import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidComponent } from './guid.component';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NzIconModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';


describe('GuidComponent', () => {
  let component: GuidComponent;
  let fixture: ComponentFixture<GuidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidComponent, LoginComponent ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzIconModule,
        NgZorroAntdModule,
      ],
      providers: [
        FormBuilder,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('GuidComponent should be created', () => {
    expect(component).toBeTruthy();
  });
});
