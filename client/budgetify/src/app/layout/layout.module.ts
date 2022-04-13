import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { SearchTransactionComponent } from './components/search-transaction/search-transaction.component';
import { AddControlComponent } from './components/add-control/add-control.component';

import { CreateTransactionSidenavComponent } from './create-transaction-sidenav/create-transaction-sidenav.component';
import { CreateAccountSidenavComponent } from './create-account-sidenav/create-account-sidenav.component';
import { ReadAccountSidenavComponent } from './read-account-sidenav/read-account-sidenav.component';
import { ReadTransactionSidenavComponent } from './read-transaction-sidenav/read-transaction-sidenav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchTransactionComponent,
    AddControlComponent,
    CreateTransactionSidenavComponent,
    CreateAccountSidenavComponent,
    ReadAccountSidenavComponent,
    ReadTransactionSidenavComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    HeaderComponent,
    SearchTransactionComponent,
    AddControlComponent,
    CreateTransactionSidenavComponent,
    CreateAccountSidenavComponent,
    ReadAccountSidenavComponent,
    ReadTransactionSidenavComponent,
  ],
})
export class LayoutModule {}
