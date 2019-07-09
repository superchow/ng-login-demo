import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    const data = sessionStorage.getItem('loginInfo');
    if(!data){
      this.router.navigate(['login'])
    }
  }

}
