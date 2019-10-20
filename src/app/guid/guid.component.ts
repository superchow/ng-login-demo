import { Component, OnInit, ViewChild, /*ChangeDetectionStrategy*/ } from '@angular/core';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-guid',
  templateUrl: './guid.component.html',
  styleUrls: ['./guid.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuidComponent implements OnInit {
  title = '欢迎来到登录测试页';

  @ViewChild('LoginRef', {static: false}) LoginRef: LoginComponent;

  constructor() { }

  ngOnInit(): void { }

  btnClick(): void {
    if (this.LoginRef) {
      this.LoginRef.validateForm.patchValue({
        userName: '123456',
        password: 'abc123'
      });
      this.LoginRef.title = '点击了';
    }
  }
}
