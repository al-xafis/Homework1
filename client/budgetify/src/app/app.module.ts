import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { MainModule } from './main/main.module';
// import { AccountsComponent } from './accounts/accounts.component';
import { AccountsModule } from './accounts/accounts.module';
import { FirstComponent } from './first/first.component';

@NgModule({
  declarations: [AppComponent, FirstComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    BrowserAnimationsModule,
    LayoutModule,
    MainModule,
    AccountsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
