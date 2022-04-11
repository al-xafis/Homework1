import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  openCreate$ = new BehaviorSubject(false);
  openAccountCreate$ = new BehaviorSubject(false);
  openAccountRead$ = new BehaviorSubject(false);

  sidebarOpen() {
    this.openCreate$.next(!this.openCreate$.value);
  }

  accountCreateSidebarOpen() {
    this.openAccountCreate$.next(!this.openAccountCreate$.value);
  }

  openReadAccountSidebar() {
    this.openAccountRead$.next(!this.openAccountRead$.value);
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

  sidebarState() {
    return this.openCreate$.asObservable();
  }

  accountCreateSidebarState() {
    return this.openAccountCreate$.asObservable();
  }

  accountReadSidebarState() {
    return this.openAccountRead$.asObservable();
  }

  constructor() {}
}
