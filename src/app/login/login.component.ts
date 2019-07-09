import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  isLoading = false;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm)
    if(this.validateForm.status === 'VALID'){
      this.isLoading = true;
      setTimeout(() => {
        sessionStorage.setItem('loginInfo', JSON.stringify(this.validateForm.value));
        this.isLoading = false;
        this.router.navigate([''])
      }, 500);
    }
  }
  constructor(private fb: FormBuilder, public router: Router) { }

  ngOnInit():void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

}
