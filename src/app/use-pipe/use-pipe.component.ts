import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-use-pipe',
  templateUrl: './use-pipe.component.html',
  styleUrls: ['./use-pipe.component.less']
})
export class UsePipeComponent implements OnInit {

  time = new Observable<Date>((observer: Observer<Date>) => {
    setInterval(() => {
      observer.next(new Date());
    }, 1000);
  });
  constructor() { }

  ngOnInit() {
  }

}
