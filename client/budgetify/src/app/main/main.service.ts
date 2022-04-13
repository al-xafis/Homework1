import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  openCreate$ = new BehaviorSubject(false);
  openAccountCreate$ = new BehaviorSubject(false);
  openAccountRead$ = new BehaviorSubject(false);
  openTransactionRead$ = new BehaviorSubject(true);

  sidebarOpen() {
    this.openCreate$.next(!this.openCreate$.value);
  }

  accountCreateSidebarOpen() {
    this.openAccountCreate$.next(!this.openAccountCreate$.value);
  }

  openReadAccountSidebar() {
    this.openAccountRead$.next(!this.openAccountRead$.value);
  }

  openTransactionReadSidebar() {
    this.openTransactionRead$.next(!this.openTransactionRead$.value);
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

  closeTransactionReadSidebar() {
    this.openTransactionRead$.next(false);
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

  transactionReadSidebarState() {
    return this.openTransactionRead$.asObservable();
  }

  constructor() {}
}
