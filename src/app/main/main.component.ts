import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  loginInfo = {};
  loginInfoStr = '';
  constructor(
    public router: Router,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    const data = sessionStorage.getItem('loginInfo');
    if (!data) {
      this.router.navigate(['login']);
    } else {
      try {
        this.loginInfo = JSON.parse(data);
        this.loginInfoStr = this.beautifyJson(this.loginInfo);
      } catch (error) {
        this.message.error('存储的账号格式错误');
      }
    }
  }
  beautifyJson(value: {}): string {
    return JSON.stringify(value, null, 2);
  }

}
