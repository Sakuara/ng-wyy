import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from './home/home.module';
import { RoutesRoutingModule } from './routes-routing.module';

const ROUTESMODULES = [
  HomeModule,
  RoutesRoutingModule,
]

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ...ROUTESMODULES,
  ],
  exports: [
    ...ROUTESMODULES,
  ]
})
export class RoutesModule { }
