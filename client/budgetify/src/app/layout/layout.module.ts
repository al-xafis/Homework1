import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { AddCardButtonComponent } from './components/add-card-button/add-card-button.component';

@NgModule({
  declarations: [HeaderComponent, AddCardButtonComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, AddCardButtonComponent],
})
export class LayoutModule {}
