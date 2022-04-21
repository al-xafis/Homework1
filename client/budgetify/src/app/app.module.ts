import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { MainModule } from './main/main.module';
import { AccountsModule } from './accounts/accounts.module';
import { FirstComponent } from './first/first.component';
import { TransactionsModule } from './transactions/transactions.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CategoriesModule } from './categories/categories.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionListComponent } from './subscription/subscription-list/subscription-list.component';
import { SubscriptionItemComponent } from './subscription/subscription-item/subscription-item.component';

@NgModule({
  declarations: [AppComponent, FirstComponent, SubscriptionComponent, SubscriptionListComponent, SubscriptionItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    BrowserAnimationsModule,

    LayoutModule,
    MainModule,
    AccountsModule,
    TransactionsModule,
    CategoriesModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
