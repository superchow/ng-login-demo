import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { City3Component } from './city3.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgZorroAntdModule],
  declarations: [City3Component],
  exports: [City3Component],
})
export class City3Module {}
