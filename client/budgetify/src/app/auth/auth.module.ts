import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: 'login', component: AuthLoginComponent }];

@NgModule({
  declarations: [AuthLoginComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [AuthLoginComponent],
})
export class AuthModule {}
