import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { RankComponent } from 'src/app/rank/rank.component';
import { RecomandComponent } from './recomand/recomand.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'recomand',
        component: RecomandComponent,
      },{
        path: 'rank',
        component: RankComponent
      },{
        path: '',
        redirectTo: 'recomand',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
