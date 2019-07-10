import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  public isDisable: Boolean = true;
  public isLoading: Boolean = false;
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private eventManager: EventManager
  ) { }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm)
    if(this.validateForm.valid){
      this.isLoading = true;
      setTimeout(() => {
        sessionStorage.setItem('loginInfo', JSON.stringify(this.validateForm.value));
        this.isLoading = false;
        this.router.navigate([''])
      }, 500);
    }
  }

  validataFn (reg: RegExp) {
    return (control: FormControl) => {
      if(!reg.test(control.value)){
        return { unexpect: true }
      }
      return {}
    }
  }
  
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required, this.validataFn(/^[0-9]{4,8}$/)]],
      password: [null, [Validators.required, this.validataFn(/^[0-9a-zA-Z]{6,8}$/)]],
    });
    this.validateForm.valueChanges.subscribe({
      next: x => {
        if(!!x.userName || !!x.password) {console.log(this.validateForm); this.isDisable = false}
      }
    });
    this.validateForm.patchValue({});
    console.log(this.validateForm)
    this.eventManager.addGlobalEventListener('window', 'keyup.enter', ()=>{
      this.submitForm()
    })
  }
  ngOnDestroy(): void {

  }

}
