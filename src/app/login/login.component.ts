import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, /*ChangeDetectionStrategy*/ } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EventManager, Title } from '@angular/platform-browser';

/**
 * @input title 入参， 默认 ‘用户登录’
 * @output submit 事件，参数为输入的用户名和密码
 * 在 App 组件引入login组件，并且新建一个按钮 ‘自动填充’ ，点击后@input入login组件，要求使用 ViewChild 功能
 * 新建文本框，用来展示login组件登录后的用户名和密码
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  public validateForm: FormGroup;
  private attEventFn: any; // 如何正确定义类型
  // public isDisable: boolean = true;
  public isLoading: boolean = false;

  @Input() title: string = '用户登录';
  // set SetTitle(title: string) {
  //   /* tslint:disable */
  //   console.info('执行了');
  //   this.titleSercive.setTitle(title);
  // }
  // get GetTitle() {
  //   return this.titleSercive.getTitle()
  // }
  @Output() onsubmit = new EventEmitter<object>();

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private eventManager: EventManager,
  ) {
    window[`loginComponent`] = this;
  }

  submitForm(e?: Event): void {
    // Object.keys(this.validateForm.controls).forEach(k => {
    //   this.validateForm.controls[k].markAsDirty();
    //   this.validateForm.controls[k].updateValueAndValidity();
    // });
    // /* tslint:disable */
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    // }
    if (e) {e.stopPropagation(); }
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i) ) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    console.log(this.validateForm.valid);
    if (this.validateForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        sessionStorage.setItem('loginInfo', JSON.stringify(this.validateForm.value));
        this.isLoading = false;
        this.router.navigate(['']);
      }, 500);
    }
    const {userName, password } = this.validateForm.value;
    this.onsubmit.emit({userName, password});
  }

  validataFn(reg: RegExp): (control: FormControl) => { [x: string]: boolean } | {} {
    return (control: FormControl) => {
      if (!reg.test(control.value)) {
        return { unexpect: true };
      }
      return {};
    };
  }

  ngOnInit(): void {
    // https://angular.cn/api/forms/FormBuilder https://angular.cn/api/forms/FormGroup https://angular.cn/api/forms/FormControl
    // this.validateForm = new FormGroup({
    //   userName: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{4,8}$/)]),
    //   password: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9a-zA-Z]{6,8}$/)]),
    // }, { updateOn: 'blur' });

    // this.validateForm = this.fb.group({
    //   userName: new FormControl(null, {
    //     validators: [Validators.required, Validators.pattern(/^[0-9]{4,8}$/)],
    //     updateOn: 'blur'
    //   }),
    //   password: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9a-zA-Z]{6,8}$/)]),
    // });

    this.validateForm = this.fb.group({
      userName: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(/^[0-9]{4,8}$/)],
        updateOn: 'blur'
      }),
      password: [null, {
        validators: [Validators.required, Validators.pattern(/^[0-9a-zA-Z]{6,8}$/)],
        updateOn: 'submit'
      }],
      provinceCity: [null, Validators.required],
    }, {updateOn: 'submit'});
    // this.validateForm.valueChanges.subscribe({
    //   next: x => {
    //     if (!!x.userName || !!x.password) { this.isDisable = false; }
    //   }
    // });
    this.validateForm.patchValue({});
    console.log(this.validateForm);
    this.attEventFn = this.eventManager.addGlobalEventListener('window', 'keyup.enter', () => {
      this.submitForm();
    });
  }

  ngOnDestroy(): void {
    this.attEventFn();
  }

}
