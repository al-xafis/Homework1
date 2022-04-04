import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { Routes, RouterModule } from '@angular/router';
import { AccountsModule } from '../accounts/accounts.module';
import { FirstComponent } from '../first/first.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: FirstComponent,
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
    RouterModule.forChild(routes),
  ],
  exports: [MainComponent],
})
export class MainModule {}
