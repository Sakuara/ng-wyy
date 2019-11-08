import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SliderModule } from '../slider/slider.module';



@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SliderModule,
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }
