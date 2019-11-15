import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { RankComponent } from 'src/app/rank/rank.component';
import { RecomandComponent } from './recomand/recomand.component';
import { RecomandResolveService } from './services/recomand-resolve.service';
import { SongSheetComponent } from './song-sheet/song-sheet.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'recomand',
        component: RecomandComponent,
        data: {
          title: 'recomand'
        },
        resolve: {
          recomandDatas: RecomandResolveService
        }
      }, {
        path: 'rank',
        component: RankComponent
      }, {
        path: 'sheet',
        component: SongSheetComponent
      },
      {
        path: '',
        redirectTo: 'recomand',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    RecomandResolveService
  ]
})
export class HomeRoutingModule { }
