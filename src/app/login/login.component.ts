import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {
  private validateForm: FormGroup;
  private attEventFn: any; // 如何正确定义类型
  // public isDisable: boolean = true;
  public isLoading: boolean = false;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private eventManager: EventManager
  ) { }

  submitForm(): void {
    // Object.keys(this.validateForm.controls).forEach(k => {
    //   this.validateForm.controls[k].markAsDirty();
    //   this.validateForm.controls[k].updateValueAndValidity();
    // });
    // /* tslint:disable */
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    // }
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
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required, this.validataFn(/^[0-9]{4,8}$/)]],
      password: [null, [Validators.required, this.validataFn(/^[0-9a-zA-Z]{6,8}$/)]],
    });
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
