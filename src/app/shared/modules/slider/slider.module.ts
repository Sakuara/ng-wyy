import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { SliderTrackComponent } from './slider-track/slider-track.component';
import { SliderThumbComponent } from './slider-thumb/slider-thumb.component';



@NgModule({
  declarations: [SliderComponent, SliderTrackComponent, SliderThumbComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SliderComponent
  ]
})
export class SliderModule { }
