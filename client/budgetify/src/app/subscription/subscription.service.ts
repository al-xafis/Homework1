import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  openSubscriptionCreate$ = new BehaviorSubject(false);

  openCreateSubscriptionSidebar() {
    this.openSubscriptionCreate$.next(true);
  }

  closeCreateSubscriptionSidebar() {
    this.openSubscriptionCreate$.next(false);
  }

  subscriptionCreateSidebarState() {
    return this.openSubscriptionCreate$.asObservable();
  }

  constructor() {}
}
