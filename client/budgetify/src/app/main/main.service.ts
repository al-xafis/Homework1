import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  openCreate$ = new BehaviorSubject(false);
  openAccountCreate$ = new BehaviorSubject(false);
  openAccountRead$ = new BehaviorSubject(false);
  openAccountEdit$ = new BehaviorSubject(false);
  openTransactionRead$ = new BehaviorSubject(false);
  OpenTransactionEdit$ = new BehaviorSubject(false);

  sidebarOpen() {
    this.openCreate$.next(!this.openCreate$.value);
  }

  accountCreateSidebarOpen() {
    this.openAccountCreate$.next(!this.openAccountCreate$.value);
  }

  openReadAccountSidebar() {
    this.openAccountRead$.next(!this.openAccountRead$.value);
  }

  openEditAccountSidebar() {
    this.openAccountEdit$.next(true);
  }

  openTransactionReadSidebar() {
    this.openTransactionRead$.next(!this.openTransactionRead$.value);
  }

  openTransactionEditSidebar() {
    this.OpenTransactionEdit$.next(!this.OpenTransactionEdit$.value);
  }

  sidebarClose() {
    this.openCreate$.next(false);
  }

  accountCreateSidebarClose() {
    this.openAccountCreate$.next(false);
  }

  closeReadAccountSidebar() {
    this.openAccountRead$.next(false);
  }

  closeEditAccountSidebar() {
    this.openAccountEdit$.next(false);
  }

  closeTransactionReadSidebar() {
    this.openTransactionRead$.next(false);
  }

  closeTransactionEditSidebar() {
    this.OpenTransactionEdit$.next(false);
  }

  sidebarState() {
    return this.openCreate$.asObservable();
  }

  accountCreateSidebarState() {
    return this.openAccountCreate$.asObservable();
  }

  accountReadSidebarState() {
    return this.openAccountRead$.asObservable();
  }

  accountEditSidebarState() {
    return this.openAccountEdit$.asObservable();
  }

  transactionReadSidebarState() {
    return this.openTransactionRead$.asObservable();
  }

  transactionEditSidebarState() {
    return this.OpenTransactionEdit$.asObservable();
  }

  constructor() {}
}
