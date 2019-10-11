import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuidComponent } from './guid/guid.component';
import { MainComponent } from './main/main.component';
import { UseViewChildComponent } from './use-view-child/use-view-child.component';
import { UsePipeComponent } from './use-pipe/use-pipe.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: GuidComponent},
  {path: 'viewChild', component: UseViewChildComponent },
  {path: 'pipe', component: UsePipeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
