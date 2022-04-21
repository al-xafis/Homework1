import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  constructor(private categoriesService: CategoriesService) {}

  open!: boolean;
  openSub!: Subscription;

  ngOnInit(): void {
    this.categoriesService.categoryCreateSidebarState().subscribe((open) => {
      this.open = open;
    });
  }

  openSidebar() {
    this.categoriesService.openCreateCategorySidebar();
  }

  closeSidebar() {
    this.categoriesService.closeCreateCategorySidebar();
  }

  filterIncome() {
    this.categoriesService.filterIncome();
  }

  filterExpense() {
    this.categoriesService.filterExpense();
  }

  ngOnDestroy(): void {
    if (this.openSub) {
      this.openSub.unsubscribe();
    }
  }
}
