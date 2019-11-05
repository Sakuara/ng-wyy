import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RecomandComponent } from './recomand/recomand.component';
import { LoginBoxComponent } from './components/login-box/login-box.component';


@NgModule({
  declarations: [HomeComponent, CarouselComponent, RecomandComponent, LoginBoxComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
