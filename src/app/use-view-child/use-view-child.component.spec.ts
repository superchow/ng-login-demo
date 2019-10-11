import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseViewChildComponent } from './use-view-child.component';

describe('UseViewChildComponent', () => {
  let component: UseViewChildComponent;
  let fixture: ComponentFixture<UseViewChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseViewChildComponent ]
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
