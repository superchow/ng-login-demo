import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuidComponent } from './guid/guid.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: GuidComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
