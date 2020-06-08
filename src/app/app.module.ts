import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Shared
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';
import {
  AppLayoutComponent,
  NotFoundComponent,
  HeaderComponent,
} from './core/components';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    NotFoundComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
