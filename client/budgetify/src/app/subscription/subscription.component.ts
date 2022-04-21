import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  subscriptionCreateOpen!: boolean;
  sidebarSubsCreateSub!: Subscription;

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.sidebarSubsCreateSub = this.subscriptionService
      .subscriptionCreateSidebarState()
      .subscribe((open) => {
        this.subscriptionCreateOpen = open;
      });
  }

  openSubsCreateSidebar() {
    this.subscriptionService.openCreateSubscriptionSidebar();
  }

  closeSubsCreateSidebar() {
    this.subscriptionService.closeCreateSubscriptionSidebar();
  }
}
