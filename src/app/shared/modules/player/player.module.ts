import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';



@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }
