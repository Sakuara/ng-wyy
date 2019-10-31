import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


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
]


@NgModule({
  declarations: [],
  imports: [
    ...MODULES,
    ...ThirdLibraryModule,
  ],
  exports: [
    ...MODULES,
    ...ThirdLibraryModule,
  ]
})
export class SharedModule { }
