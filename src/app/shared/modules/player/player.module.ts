import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SliderModule } from '../slider/slider.module';
import { DurationPipe } from './duration.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
   declarations: [
      PlayerComponent,
      DurationPipe
   ],
   imports: [
      CommonModule,
      NgZorroAntdModule,
      SliderModule,
      FormsModule,
   ],
   exports: [
      PlayerComponent
   ]
})
export class PlayerModule { }
