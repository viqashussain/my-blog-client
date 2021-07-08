import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer as homeReducer } from './store/reducers/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './store/effects/home.effects';
import { HttpClientModule } from '@angular/common/http'; 
import { DISQUS_SHORTNAME } from 'ngx-disqus';
import { AppConfig } from './app.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({ home: homeReducer }),
    EffectsModule.forRoot([HomeEffects])
  ],
  providers: [{ provide: DISQUS_SHORTNAME, useValue: AppConfig.disqusShortname }],
  bootstrap: [AppComponent]
})
export class AppModule { }
