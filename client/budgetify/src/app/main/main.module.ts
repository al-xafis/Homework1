import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { Routes, RouterModule } from '@angular/router';
import { AccountsModule } from '../accounts/accounts.module';
import { FirstComponent } from '../first/first.component';
import { AuthGuard } from '../auth/auth.guard';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoriesModule } from '../categories/categories.module';
import { SubscriptionComponent } from '../subscription/subscription.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'main',
        component: FirstComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'subscriptions',
        component: SubscriptionComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    AccountsModule,
    CategoriesModule,
    RouterModule.forChild(routes),
  ],
  exports: [MainComponent],
})
export class MainModule {}
