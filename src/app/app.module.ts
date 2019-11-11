import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { API_URL, ApiService } from './core/api.service';
import { RankComponent } from './rank/rank.component';
import { environment } from '../environments/environment';
import { MusicStoreModule } from './music-store';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    RankComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    MusicStoreModule,
    RoutesModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    ApiService,
    { provide: API_URL, useValue: environment.baseUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
