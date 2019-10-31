import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from './home/home.module';

const ROUTESMODULES = [
  HomeModule,
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
