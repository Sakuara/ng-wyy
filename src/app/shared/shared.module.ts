import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CellComponent } from './components/cell/cell.component';
import { PlayCountPipe } from './pipes/play-count.pipe';


const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  HttpClientModule,
  RouterModule,
];
const ThirdLibraryModule = [
  NgZorroAntdModule,
];
const COMPONENTS = [
  CellComponent
];
const PIPES = [
  PlayCountPipe
];


@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [
    ...MODULES,
    ...ThirdLibraryModule,
  ],
  exports: [
    ...MODULES,
    ...ThirdLibraryModule,
    ...COMPONENTS,
    ...PIPES,
  ]
})
export class SharedModule { }
